import { ImageUp } from 'lucide-react'
import { campaignCategories, campaignStatuses } from '../mocks/campaign'
import type { Campaign } from '../types/campaign'

type CampaignIdentityProps = {
  campaign: Campaign
  onFieldChange: <K extends keyof Campaign>(field: K, value: Campaign[K]) => void
  onAssetChange: (field: 'logo' | 'hero' | 'frame' | 'background', value: string) => void
  onAssetFileChange: (field: 'logo' | 'hero' | 'frame' | 'background', file: File) => Promise<void>
}

const assetFields = [
  { key: 'logo' as const, label: 'Upload Logo', placeholder: 'https://cdn.griots.one/logo.png' },
  { key: 'hero' as const, label: 'Upload Hero', placeholder: 'https://cdn.griots.one/hero.png' },
  { key: 'frame' as const, label: 'Upload Moldura PNG', placeholder: 'https://cdn.griots.one/frame.png' },
  { key: 'background' as const, label: 'Upload Background', placeholder: 'https://cdn.griots.one/background.jpg' },
]

export function CampaignIdentity({
  campaign,
  onFieldChange,
  onAssetChange,
  onAssetFileChange,
}: CampaignIdentityProps) {
  return (
    <section className="space-y-5 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <h2 className="font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">Informacoes Gerais</h2>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Nome da campanha</span>
          <input
            value={campaign.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
            className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Slug</span>
          <input
            value={campaign.slug}
            onChange={(event) => onFieldChange('slug', event.target.value)}
            className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Categoria</span>
          <select
            value={campaign.category}
            onChange={(event) => onFieldChange('category', event.target.value as Campaign['category'])}
            className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
          >
            {campaignCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 sm:col-span-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Status</span>
          <select
            value={campaign.status}
            onChange={(event) => onFieldChange('status', event.target.value as Campaign['status'])}
            className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
          >
            {campaignStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="space-y-4">
        <h3 className="font-display text-xl text-[var(--brand-ink)] dark:text-slate-100">Identidade</h3>

        {assetFields.map((asset) => (
          <div key={asset.key} className="space-y-2">
            <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">{asset.label}</span>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={campaign[asset.key]}
                onChange={(event) => onAssetChange(asset.key, event.target.value)}
                placeholder={asset.placeholder}
                className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
              />
              <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#d8e2ea] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#151e2b]">
                <ImageUp size={14} />
                Upload
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (event) => {
                    const file = event.target.files?.[0]
                    if (!file) return
                    await onAssetFileChange(asset.key, file)
                  }}
                />
              </label>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
