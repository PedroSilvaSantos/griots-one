import { useNavigate } from 'react-router-dom'
import { useExperience } from '../hooks/useExperience'
import { BrandIdentity } from './BrandIdentity'
import { ExperiencePreview } from './ExperiencePreview'
import { LandingContent } from './LandingContent'
import { PublishActions } from './PublishActions'
import { ThemeEditor } from './ThemeEditor'

type ExperienceFormProps = {
  experienceId?: string
}

export function ExperienceForm({ experienceId }: ExperienceFormProps) {
  const navigate = useNavigate()
  const {
    experience,
    isSaved,
    previewPath,
    updateField,
    updateBrand,
    updateBrandFile,
    updateTheme,
    updateContent,
    updateSocial,
    updateSetting,
    saveExperience,
    error,
    clearError,
  } = useExperience(experienceId)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">
          {experienceId ? 'Editar Experiencia' : 'Nova Experiencia'}
        </h1>

        <button
          type="button"
          onClick={() => navigate('/admin/experiences')}
          className="rounded-full border border-[#d8e2ea] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#151e2b]"
        >
          Voltar para Experiencias
        </button>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
          <div className="flex items-center justify-between gap-4">
            <span>{error}</span>
            <button type="button" className="text-xs font-semibold uppercase tracking-[0.08em]" onClick={clearError}>
              Fechar
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <LandingContent
            experience={experience}
            onFieldChange={updateField}
            onContentChange={updateContent}
            onSocialChange={updateSocial}
            onSettingChange={updateSetting}
          />

          <BrandIdentity experience={experience} onBrandChange={updateBrand} onBrandFileChange={updateBrandFile} />

          <ThemeEditor experience={experience} onThemeChange={updateTheme} />
        </div>

        <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <PublishActions
            previewPath={previewPath}
            isSaved={isSaved}
            onSave={() => {
              const saved = saveExperience('draft')
              if (saved) {
                navigate(`/admin/experiences/${saved.id}/edit`, { replace: true })
              }
            }}
            onPublish={() => {
              const saved = saveExperience('published')
              if (saved) {
                navigate(`/admin/experiences/${saved.id}/edit`, { replace: true })
              }
            }}
          />

          <ExperiencePreview experience={experience} />
        </div>
      </div>
    </div>
  )
}
