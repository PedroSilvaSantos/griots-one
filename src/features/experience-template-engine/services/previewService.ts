import type { Experience } from '../../experience/types/experience'
import {
  DEFAULT_CANVAS_PRESET,
  type CanvasPresetId,
} from '../experience-engine/core/canvas-presets'
import { experienceRenderer } from './experienceRenderer'

export class PreviewService {
  async renderPreview(canvas: HTMLCanvasElement, experience: Experience, preset: CanvasPresetId = DEFAULT_CANVAS_PRESET) {
    await experienceRenderer.render(canvas, experience, {
      preset,
      scale: 1,
    })
  }
}

export const previewService = new PreviewService()
