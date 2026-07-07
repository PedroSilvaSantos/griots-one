import { ImageUp } from 'lucide-react'
import type { Experience } from '../types/experience'

type BrandIdentityProps = {
  experience: Experience
  onBrandChange: <K extends keyof Experience['brand']>(field: K, value: Experience['brand'][K]) => void
  onBrandFileChange: (field: keyof Experience['brand'], file: File) => Promise<void>
}

const fields = [
  { key: 'logo' as const, label: 'Logo', placeholder: 'https://cdn.griots.one/logo.png' },
  { key: 'hero' as const, label: 'Imagem Hero', placeholder: 'https://cdn.griots.one/hero.png' },
  { key: 'background' as const, label: 'Background', placeholder: 'https://cdn.griots.one/background.jpg' },
  { key: 'frame' as const, label: 'Frame PNG', placeholder: 'https://cdn.griots.one/frame.png' },
]

export function BrandIdentity({ experience, onBrandChange, onBrandFileChange }: BrandIdentityProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <h2 className="font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">Identidade Visual</h2>

      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">{field.label}</span>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              value={experience.brand[field.key]}
              onChange={(event) => onBrandChange(field.key, event.target.value)}
              placeholder={field.placeholder}
              className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
            />

            <label className="inline-flex h-11 cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#d8e2ea] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#151e2b]">
              <ImageUp size={14} />
              Enviar
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={async (event) => {
                  const file = event.target.files?.[0]
                  if (!file) return
                  await onBrandFileChange(field.key, file)
                }}
              />
            </label>
          </div>
        </div>
      ))}
    </section>
  )
}
