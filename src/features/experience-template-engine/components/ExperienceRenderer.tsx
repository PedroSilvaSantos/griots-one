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
}

export function ExperienceRenderer({ canvasRef, experience, preset = DEFAULT_CANVAS_PRESET }: ExperienceRendererProps) {
  const presetSize = CanvasPresets[preset]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    void previewService.renderPreview(canvas, experience, preset)
  }, [canvasRef, experience, preset])

  return (
    <canvas
      ref={canvasRef}
      width={presetSize.width}
      height={presetSize.height}
      className="h-auto w-full rounded-3xl border border-white/70 bg-white shadow-[0_16px_42px_-28px_rgba(16,35,63,0.55)]"
    />
  )
}
