import type { Campaign } from '../types/campaign'

type CampaignTextsProps = {
  campaign: Campaign
  onTextChange: <K extends keyof Campaign['texts']>(field: K, value: Campaign['texts'][K]) => void
  onSocialChange: <K extends keyof Campaign['socials']>(field: K, value: Campaign['socials'][K]) => void
  onSettingChange: <K extends keyof Campaign['settings']>(field: K, value: Campaign['settings'][K]) => void
}

const textFields = [
  { key: 'heroTitle' as const, label: 'Titulo Hero' },
  { key: 'heroSubtitle' as const, label: 'Subtitulo' },
  { key: 'cta' as const, label: 'Texto CTA' },
  { key: 'features' as const, label: 'Texto Features' },
  { key: 'footer' as const, label: 'Texto Footer' },
]

const socialFields = [
  { key: 'instagram' as const, label: 'Instagram' },
  { key: 'facebook' as const, label: 'Facebook' },
  { key: 'tiktok' as const, label: 'TikTok' },
  { key: 'youtube' as const, label: 'YouTube' },
  { key: 'website' as const, label: 'Site' },
]

const settingFields = [
  { key: 'download' as const, label: 'Ativar Download' },
  { key: 'share' as const, label: 'Ativar Compartilhamento' },
  { key: 'analytics' as const, label: 'Ativar Analytics' },
  { key: 'hero' as const, label: 'Mostrar Hero' },
  { key: 'pricing' as const, label: 'Mostrar Pricing' },
]

export function CampaignTexts({
  campaign,
  onTextChange,
  onSocialChange,
  onSettingChange,
}: CampaignTextsProps) {
  return (
    <section className="space-y-6 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <div className="space-y-4">
        <h2 className="font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">Textos</h2>

        <div className="grid grid-cols-1 gap-3">
          {textFields.map((field) => (
            <label key={field.key} className="space-y-2">
              <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">{field.label}</span>
              <textarea
                value={campaign.texts[field.key]}
                onChange={(event) => onTextChange(field.key, event.target.value)}
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
                value={campaign.socials[field.key]}
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
          {settingFields.map((field) => (
            <label
              key={field.key}
              className="flex items-center justify-between rounded-xl border border-[#d8e2ea] bg-white px-3 py-2.5 dark:border-white/10 dark:bg-[#101622]"
            >
              <span className="text-sm text-[var(--brand-ink)] dark:text-slate-200">{field.label}</span>
              <input
                type="checkbox"
                checked={campaign.settings[field.key]}
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
