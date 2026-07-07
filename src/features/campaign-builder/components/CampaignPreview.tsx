import type { Campaign } from '../types/campaign'

type CampaignPreviewProps = {
  campaign: Campaign
}

export function CampaignPreview({ campaign }: CampaignPreviewProps) {
  return (
    <section className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <div
        className="p-6"
        style={{
          background: campaign.background
            ? `linear-gradient(rgba(16,35,63,0.32), rgba(16,35,63,0.48)), url(${campaign.background}) center/cover no-repeat`
            : `linear-gradient(135deg, ${campaign.colors.primary}, ${campaign.colors.secondary})`,
        }}
      >
        {campaign.settings.hero ? (
          <div className="rounded-2xl bg-white/88 p-6 backdrop-blur-sm">
            {campaign.logo ? (
              <img src={campaign.logo} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)]">
                {campaign.name || 'Sua Campanha'}
              </p>
            )}
            <h2 className="mt-4 font-display text-3xl leading-tight text-[var(--brand-ink)]">
              {campaign.texts.heroTitle}
            </h2>
            <p className="mt-3 text-sm text-[var(--brand-muted)]">{campaign.texts.heroSubtitle}</p>
            <button
              type="button"
              className="mt-5 rounded-xl px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: campaign.colors.button }}
            >
              {campaign.texts.cta}
            </button>
          </div>
        ) : null}
      </div>

      <div className="space-y-4 p-6">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg p-3 text-white" style={{ backgroundColor: campaign.colors.primary }}>
            <p className="text-[11px] uppercase tracking-[0.09em]">Primaria</p>
          </div>
          <div className="rounded-lg p-3 text-white" style={{ backgroundColor: campaign.colors.secondary }}>
            <p className="text-[11px] uppercase tracking-[0.09em]">Secundaria</p>
          </div>
          <div className="rounded-lg p-3 text-white" style={{ backgroundColor: campaign.colors.accent }}>
            <p className="text-[11px] uppercase tracking-[0.09em]">Destaque</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#d8e2ea] bg-white p-4 dark:border-white/10 dark:bg-[#101622]">
          <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--brand-muted)]">Features</p>
          <p className="mt-2 text-sm text-[var(--brand-ink)] dark:text-slate-200">{campaign.texts.features}</p>
        </div>

        <div className="rounded-xl border border-[#d8e2ea] bg-white p-4 dark:border-white/10 dark:bg-[#101622]">
          <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--brand-muted)]">Footer</p>
          <p className="mt-2 text-sm text-[var(--brand-ink)] dark:text-slate-200">{campaign.texts.footer}</p>
        </div>

        <div className="rounded-xl border border-[#d8e2ea] bg-white p-4 dark:border-white/10 dark:bg-[#101622]">
          <p className="text-xs font-semibold uppercase tracking-[0.11em] text-[var(--brand-muted)]">Social</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-[var(--brand-ink)] dark:text-slate-200">
            <span>Instagram: {campaign.socials.instagram || '-'}</span>
            <span>Facebook: {campaign.socials.facebook || '-'}</span>
            <span>TikTok: {campaign.socials.tiktok || '-'}</span>
            <span>YouTube: {campaign.socials.youtube || '-'}</span>
            <span>Site: {campaign.socials.website || '-'}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
