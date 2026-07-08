import type { Experience } from '../../experience/types/experience'
import type { CanvasPresetId } from '../experience-engine/core/canvas-presets'
import type { ExperienceTemplateConfig } from '../types/template'
import { renderTemplateCanvas } from '../experience-engine/renderer/canvasRenderer'

type AssetMap = Record<string, HTMLImageElement | null>

export function renderExperienceTemplate(
  canvas: HTMLCanvasElement,
  template: ExperienceTemplateConfig,
  experience: Experience,
  assets: AssetMap,
  scale = 1,
  preset?: CanvasPresetId,
) {
  return renderTemplateCanvas(canvas, template, experience, assets, { scale, preset })
}