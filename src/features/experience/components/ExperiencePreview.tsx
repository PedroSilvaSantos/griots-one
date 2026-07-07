import type { Experience } from '../types/experience'

type ExperiencePreviewProps = {
  experience: Experience
}

export function ExperiencePreview({ experience }: ExperiencePreviewProps) {
  const radius = `${experience.theme.radius}px`

  return (
    <section className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <div
        className="p-6"
        style={{
          borderRadius: radius,
          background: experience.brand.background
            ? `linear-gradient(rgba(16,35,63,0.35), rgba(16,35,63,0.45)), url(${experience.brand.background}) center/cover no-repeat`
            : `linear-gradient(135deg, ${experience.theme.primary}, ${experience.theme.secondary})`,
        }}
      >
        <article className="bg-white/90 p-6 backdrop-blur-sm" style={{ borderRadius: radius }}>
          {experience.brand.logo ? (
            <img src={experience.brand.logo} alt="Logo" className="h-10 w-auto object-contain" />
          ) : (
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]">
              {experience.name || 'Sua Experiencia'}
            </p>
          )}

          <h2 className="mt-4 font-display text-3xl leading-tight text-[var(--brand-ink)]">{experience.content.title}</h2>
          <p className="mt-3 text-sm text-[var(--brand-muted)]">{experience.content.subtitle}</p>

          <button
            type="button"
            className="mt-5 rounded-xl px-4 py-2 text-sm font-semibold text-white"
            style={{
              backgroundColor: experience.theme.button,
              borderRadius: radius,
            }}
          >
            {experience.content.cta}
          </button>
        </article>
      </div>

      <div className="space-y-4 p-6">
        <div className="grid grid-cols-3 gap-2">
          <div className="rounded-lg p-3 text-white" style={{ backgroundColor: experience.theme.primary }}>
            <p className="text-[11px] uppercase tracking-[0.08em]">Primaria</p>
          </div>
          <div className="rounded-lg p-3 text-white" style={{ backgroundColor: experience.theme.secondary }}>
            <p className="text-[11px] uppercase tracking-[0.08em]">Secundaria</p>
          </div>
          <div className="rounded-lg p-3 text-white" style={{ backgroundColor: experience.theme.accent }}>
            <p className="text-[11px] uppercase tracking-[0.08em]">Destaque</p>
          </div>
        </div>

        <div className="rounded-xl border border-[#d8e2ea] bg-white p-4 dark:border-white/10 dark:bg-[#101622]" style={{ borderRadius: radius }}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)]">Features</p>
          <p className="mt-2 text-sm text-[var(--brand-ink)] dark:text-slate-200">{experience.content.features}</p>
        </div>

        <div className="rounded-xl border border-[#d8e2ea] bg-white p-4 dark:border-white/10 dark:bg-[#101622]" style={{ borderRadius: radius }}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)]">Rodape</p>
          <p className="mt-2 text-sm text-[var(--brand-ink)] dark:text-slate-200">{experience.content.footer}</p>
        </div>
      </div>
    </section>
  )
}
