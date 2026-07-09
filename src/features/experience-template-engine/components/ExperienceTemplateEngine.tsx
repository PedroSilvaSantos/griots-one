import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExperienceDesigner } from '../../experience-designer'
import type { Experience } from '../../experience/types/experience'
import { DEFAULT_CANVAS_PRESET } from '../experience-engine/core/canvas-presets'
import { useExperienceTemplateEngine } from '../hooks/useExperienceTemplateEngine'

type ExperienceTemplateEngineProps = {
  experience: Experience
  previewPath: string
  isSaved: boolean
  saving: boolean
  onSaveDraft: () => void
  onPublish: () => void
  onUploadImage: (file: File) => Promise<void>
}

export function ExperienceTemplateEngine({
  experience,
  previewPath,
  isSaved,
  saving,
  onSaveDraft,
  onPublish,
  onUploadImage,
}: ExperienceTemplateEngineProps) {
  const navigate = useNavigate()
  const {
    error,
    warning,
    rendering,
    canvasRef,
    generateImage,
  } = useExperienceTemplateEngine(experience)

  const statusMessage = useMemo(() => {
    if (error) return { type: 'error', text: error }
    if (warning) return { type: 'warning', text: warning }
    return null
  }, [error, warning])

  return (
    <section className="space-y-3">
      <ExperienceDesigner
        experience={experience}
        canvasRef={canvasRef}
        preset={DEFAULT_CANVAS_PRESET}
        isSaved={isSaved}
        saving={saving}
        rendering={rendering}
        onSaveDraft={onSaveDraft}
        onPublish={onPublish}
        onGeneratePng={() => {
          void generateImage({ preset: DEFAULT_CANVAS_PRESET })
        }}
        onPreview={() => navigate(previewPath)}
        onUploadImage={onUploadImage}
      />

      {statusMessage ? (
        <div className={`rounded-xl border px-4 py-3 text-sm ${statusMessage.type === 'error' ? 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300' : 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200'}`}>
          {statusMessage.text}
        </div>
      ) : null}
    </section>
  )
}
