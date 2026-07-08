import type { Experience } from '../../experience/types/experience'
import {
  DEFAULT_CANVAS_PRESET,
  type CanvasPresetId,
} from '../experience-engine/core/canvas-presets'
import { experienceRenderer } from './experienceRenderer'

export class ExportService {
  async generatePng(
    experience: Experience,
    options?: {
      preset?: CanvasPresetId
      scale?: number
    },
  ) {
    const preset = options?.preset ?? DEFAULT_CANVAS_PRESET
    const scale = options?.scale ?? 2
    const canvas = document.createElement('canvas')
    const renderResult = await experienceRenderer.render(canvas, experience, {
      preset,
      scale,
    })

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob((result) => {
        if (!result) {
          reject(new Error('export-failed'))
          return
        }

        resolve(result)
      }, 'image/png')
    })

    return {
      blob,
      url: URL.createObjectURL(blob),
      fileName: `${experience.template.id}-${preset.toLowerCase()}-${Date.now()}.png`,
      missingAssets: renderResult.missingAssets,
    }
  }
}

export const exportService = new ExportService()
