import type { Experience } from '../../experience/types/experience'
import { applyDesignerTemplate } from '../../experience-designer/services/templateDesigner.service'
import type { CanvasPresetId } from '../experience-engine/core/canvas-presets'
import { resolveDataSource } from '../experience-engine/core/data'
import { loadImageAsset } from './assetLoader'
import { renderExperienceTemplate } from './canvasRenderer'
import { ensureFontsLoaded } from './fontLoader'
import { templateManager } from './templateManager'

async function loadAssets(experience: Experience) {
  const template = templateManager.get(experience.template.id)
  const imageNodes = Object.values(template.regions)
    .filter((region) => region.enabled)
    .flatMap((region) => region.nodes)
    .filter((node): node is Extract<(typeof template.regions)[string]['nodes'][number], { kind: 'image' }> => node.kind === 'image')
  const uniqueSources = Array.from(new Set(imageNodes.map((node) => node.source)))

  const entries = await Promise.all(
    uniqueSources.map(async (source) => {
        const value = String(resolveDataSource(source, experience) || '')
        if (!value) return null

        try {
          const image = await loadImageAsset(value)
          return [source, image] as const
        } catch {
          return null
        }
      }),
  )

  const loadedSources = new Set(entries.filter((entry): entry is readonly [string, HTMLImageElement] => Boolean(entry)).map(([source]) => source))

  return {
    assets: Object.fromEntries(entries.filter((entry): entry is readonly [string, HTMLImageElement] => Boolean(entry))),
    missingAssets: uniqueSources.filter((source) => !loadedSources.has(source)),
  }
}

export class ExperienceRenderer {
  async render(
    canvas: HTMLCanvasElement,
    experience: Experience,
    options?: {
      scale?: number
      preset?: CanvasPresetId
    },
  ) {
    const scale = options?.scale ?? 1
    applyDesignerTemplate(experience.template.id)
    const template = templateManager.get(experience.template.id)
    await ensureFontsLoaded(template.fonts)
    const { assets, missingAssets } = await loadAssets(experience)
    const result = renderExperienceTemplate(canvas, template, experience, assets, scale, options?.preset)
    const warningMissingAssets = result?.warnings
      .filter((warning) => warning.code === 'MISSING_ASSET')
      .map((warning) => warning.source) ?? []

    return {
      missingAssets: Array.from(new Set([...missingAssets, ...warningMissingAssets])),
    }
  }
}

export const experienceRenderer = new ExperienceRenderer()
