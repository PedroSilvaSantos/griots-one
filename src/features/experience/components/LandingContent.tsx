import { experienceCategories, experienceStatuses } from '../mocks/experience'
import type { Experience } from '../types/experience'

const statusLabels: Record<Experience['status'], string> = {
  draft: 'Rascunho',
  published: 'Publicado',
}

type LandingContentProps = {
  experience: Experience
  onFieldChange: <K extends keyof Experience>(field: K, value: Experience[K]) => void
  onContentChange: <K extends keyof Experience['content']>(field: K, value: Experience['content'][K]) => void
  onSocialChange: <K extends keyof Experience['social']>(field: K, value: Experience['social'][K]) => void
  onSettingChange: <K extends keyof Experience['settings']>(field: K, value: Experience['settings'][K]) => void
}

const contentFields = [
  { key: 'title' as const, label: 'Titulo' },
  { key: 'subtitle' as const, label: 'Subtitulo' },
  { key: 'cta' as const, label: 'Texto CTA' },
  { key: 'features' as const, label: 'Texto de Features' },
  { key: 'footer' as const, label: 'Texto de Rodape' },
]

const socialFields = [
  { key: 'instagram' as const, label: 'Instagram' },
  { key: 'facebook' as const, label: 'Facebook' },
  { key: 'tiktok' as const, label: 'TikTok' },
  { key: 'linkedin' as const, label: 'LinkedIn' },
  { key: 'website' as const, label: 'Site' },
]

const settingsFields = [
  { key: 'download' as const, label: 'Ativar Download' },
  { key: 'share' as const, label: 'Ativar Compartilhamento' },
  { key: 'analytics' as const, label: 'Ativar Analytics' },
  { key: 'gallery' as const, label: 'Ativar Galeria' },
]

export function LandingContent({
  experience,
  onFieldChange,
  onContentChange,
  onSocialChange,
  onSettingChange,
}: LandingContentProps) {
  return (
    <section className="space-y-6 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">Informacoes</h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Nome</span>
            <input
              value={experience.name}
              onChange={(event) => onFieldChange('name', event.target.value)}
              className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Slug</span>
            <input
              value={experience.slug}
              onChange={(event) => onFieldChange('slug', event.target.value)}
              className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
            />
          </label>

          <label className="space-y-2">
            <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Categoria</span>
            <select
              value={experience.category}
              onChange={(event) => onFieldChange('category', event.target.value as Experience['category'])}
              className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
            >
              {experienceCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="space-y-2 sm:col-span-2">
            <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Status</span>
            <select
              value={experience.status}
              onChange={(event) => onFieldChange('status', event.target.value as Experience['status'])}
              className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
            >
              {experienceStatuses.map((status) => (
                <option key={status} value={status}>
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-[var(--brand-ink)] dark:text-slate-100">Conteudo da Landing</h3>

        <div className="grid grid-cols-1 gap-3">
          {contentFields.map((field) => (
            <label key={field.key} className="space-y-2">
              <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">{field.label}</span>
              <textarea
                value={experience.content[field.key]}
                onChange={(event) => onContentChange(field.key, event.target.value)}
                rows={2}
                className="w-full rounded-xl border border-[#d8e2ea] bg-white px-3 py-2 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-[var(--brand-ink)] dark:text-slate-100">Redes Sociais</h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {socialFields.map((field) => (
            <label key={field.key} className="space-y-2">
              <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">{field.label}</span>
              <input
                value={experience.social[field.key]}
                onChange={(event) => onSocialChange(field.key, event.target.value)}
                className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-[var(--brand-ink)] dark:text-slate-100">Configuracoes</h3>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {settingsFields.map((field) => (
            <label
              key={field.key}
              className="flex items-center justify-between rounded-xl border border-[#d8e2ea] bg-white px-3 py-2.5 dark:border-white/10 dark:bg-[#101622]"
            >
              <span className="text-sm text-[var(--brand-ink)] dark:text-slate-200">{field.label}</span>
              <input
                type="checkbox"
                checked={experience.settings[field.key]}
                onChange={(event) => onSettingChange(field.key, event.target.checked)}
                className="h-4 w-4 rounded border-[#c7d5e3] text-[var(--brand-ink)]"
              />
            </label>
          ))}
        </div>
      </div>
    </section>
  )
}
