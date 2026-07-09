import { useEffect } from 'react'
import {
  CanvasPresets,
  DEFAULT_CANVAS_PRESET,
  type CanvasPresetId,
} from '../experience-engine/core/canvas-presets'
import { previewService } from '../services/previewService'
import type { Experience } from '../../experience/types/experience'

type ExperienceRendererProps = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  experience: Experience
  preset?: CanvasPresetId
  renderVersion?: number
}

export function ExperienceRenderer({ canvasRef, experience, preset = DEFAULT_CANVAS_PRESET, renderVersion = 0 }: ExperienceRendererProps) {
  const presetSize = CanvasPresets[preset]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    void previewService.renderPreview(canvas, experience, preset)
  }, [canvasRef, experience, preset, renderVersion])

  return (
    <canvas
      ref={canvasRef}
      width={presetSize.width}
      height={presetSize.height}
      className="block h-auto w-full bg-transparent"
    />
  )
}
