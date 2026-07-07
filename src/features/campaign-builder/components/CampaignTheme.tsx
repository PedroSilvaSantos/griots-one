import type { Campaign } from '../types/campaign'

type CampaignThemeProps = {
  campaign: Campaign
  onColorChange: <K extends keyof Campaign['colors']>(field: K, value: Campaign['colors'][K]) => void
}

const colorFields = [
  { key: 'primary' as const, label: 'Cor Primaria' },
  { key: 'secondary' as const, label: 'Cor Secundaria' },
  { key: 'accent' as const, label: 'Cor de Destaque' },
  { key: 'button' as const, label: 'Cor do Botao' },
]

export function CampaignTheme({ campaign, onColorChange }: CampaignThemeProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <h2 className="font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">Cores</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {colorFields.map((field) => (
          <label key={field.key} className="space-y-2">
            <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">{field.label}</span>
            <div className="flex items-center gap-2 rounded-xl border border-[#d8e2ea] bg-white px-3 dark:border-white/10 dark:bg-[#101622]">
              <input
                type="color"
                value={campaign.colors[field.key]}
                onChange={(event) => onColorChange(field.key, event.target.value)}
                className="h-10 w-10 cursor-pointer border-none bg-transparent p-0"
              />
              <input
                value={campaign.colors[field.key]}
                onChange={(event) => onColorChange(field.key, event.target.value)}
                className="h-11 w-full bg-transparent text-sm text-[var(--brand-ink)] outline-none dark:text-slate-100"
              />
            </div>
          </label>
        ))}
      </div>
    </section>
  )
}
