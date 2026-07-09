import type { Experience } from '../../../experience/types/experience'
import {
  resolveCanvasPreset,
  type CanvasPresetId,
} from '../core/canvas-presets'
import { createScaler } from '../core/scale'
import { stringifyDataSource } from '../core/data'
import type { ExperienceTemplateConfig, LayoutRegion, RenderWarning, TemplateNode } from '../core/types'
import {
  getColor,
  getRegionPadding,
  getThemePalette,
  getSpacing,
  type ColorPalette,
} from '../design-system'
import { renderImageNode } from './imageRenderer'
import { renderShapeNode } from './shapeRenderer'
import { renderTextNode } from './textRenderer'

type AssetMap = Record<string, HTMLImageElement | null>

type RenderTemplateCanvasOptions = {
  scale?: number
  preset?: CanvasPresetId
}

function setupCanvas(context: CanvasRenderingContext2D, width: number, height: number, scale: number) {
  context.setTransform(scale, 0, 0, scale, 0, 0)
  context.clearRect(0, 0, width, height)
  context.imageSmoothingEnabled = true
  context.imageSmoothingQuality = 'high'
}

function drawCanvasBackground(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  palette: ColorPalette,
) {
  const gradient = context.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, getColor('BackgroundStart', palette))
  gradient.addColorStop(1, getColor('BackgroundEnd', palette))
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)
}

function toBox(
  region: LayoutRegion,
  template: ExperienceTemplateConfig,
  targetWidth: number,
  targetHeight: number,
) {
  const scaler = createScaler(targetWidth, targetHeight, template.width, template.height)
  const margin = region.margin ? scaler.scale(getSpacing(region.margin)) : 0
  const padding = scaler.scale(getRegionPadding(region))
  const safeArea = region.safeArea

  const safeTop = safeArea?.top ? scaler.verticalScale(getSpacing(safeArea.top)) : 0
  const safeRight = safeArea?.right ? scaler.horizontalScale(getSpacing(safeArea.right)) : 0
  const safeBottom = safeArea?.bottom ? scaler.verticalScale(getSpacing(safeArea.bottom)) : 0
  const safeLeft = safeArea?.left ? scaler.horizontalScale(getSpacing(safeArea.left)) : 0

  const x = scaler.horizontalScale(region.x * template.width) + margin + padding + safeLeft
  const y = scaler.verticalScale(region.y * template.height) + margin + padding + safeTop
  const width = Math.max(1, scaler.horizontalScale(region.width * template.width) - margin * 2 - padding * 2 - safeLeft - safeRight)
  const height = Math.max(1, scaler.verticalScale(region.height * template.height) - margin * 2 - padding * 2 - safeTop - safeBottom)

  return {
    x,
    y,
    width,
    height,
  }
}

function toNodeBox(regionBox: { x: number; y: number; width: number; height: number }, node: TemplateNode) {
  if (!node.box) {
    return regionBox
  }

  return {
    x: regionBox.x + regionBox.width * node.box.x,
    y: regionBox.y + regionBox.height * node.box.y,
    width: Math.max(1, regionBox.width * node.box.width),
    height: Math.max(1, regionBox.height * node.box.height),
  }
}

export function renderTemplateCanvas(
  canvas: HTMLCanvasElement,
  template: ExperienceTemplateConfig,
  experience: Experience,
  assets: AssetMap,
  options: RenderTemplateCanvasOptions = {},
) {
  const { scale = 1, preset } = options
  const context = canvas.getContext('2d')
  if (!context) {
    throw new Error('canvas-context-unavailable')
  }

  const canvasPreset = resolveCanvasPreset(preset)
  const scaler = createScaler(canvasPreset.width, canvasPreset.height, template.width, template.height)

  canvas.width = Math.round(canvasPreset.width * scale)
  canvas.height = Math.round(canvasPreset.height * scale)

  setupCanvas(context, canvasPreset.width, canvasPreset.height, scale)

  const palette = getThemePalette(template.theme, experience)
  const warnings: RenderWarning[] = []

  drawCanvasBackground(context, canvasPreset.width, canvasPreset.height, palette)

  Object.values(template.regions)
    .filter((regionConfig) => regionConfig.enabled)
    .sort((a, b) => a.order - b.order)
    .forEach((regionConfig) => {
      const regionBox = toBox(regionConfig.layout, template, canvasPreset.width, canvasPreset.height)

      regionConfig.nodes.forEach((node) => {
        const box = toNodeBox(regionBox, node)

        if (node.kind === 'shape') {
          renderShapeNode(context, node, box, palette, scaler)
          return
        }

        if (node.kind === 'image') {
          const image = assets[node.source]
          if (!image) {
            warnings.push({ code: 'MISSING_ASSET', source: node.source })
            return
          }

          renderImageNode(context, node, image, box, palette, scaler)
          return
        }

        if (node.kind === 'text') {
          const text = stringifyDataSource(node.source, experience)
          if (!text) return
          renderTextNode(context, node, text, box, palette, scaler)
        }
      })
    })

  return {
    warnings,
  }
}
