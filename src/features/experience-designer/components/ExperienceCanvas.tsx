import { memo } from 'react'
import type { RefObject } from 'react'
import type { Experience } from '../../experience/types/experience'
import type { CanvasPresetId } from '../../experience-template-engine/experience-engine/core/canvas-presets'
import { ExperienceRenderer } from '../../experience-template-engine/components/ExperienceRenderer'

type ExperienceCanvasProps = {
  canvasRef: RefObject<HTMLCanvasElement | null>
  experience: Experience
  preset: CanvasPresetId
  renderVersion: number
}

export const ExperienceCanvas = memo(function ExperienceCanvas({ canvasRef, experience, preset, renderVersion }: ExperienceCanvasProps) {
  return (
    <ExperienceRenderer
      canvasRef={canvasRef}
      experience={experience}
      preset={preset}
      renderVersion={renderVersion}
    />
  )
})
