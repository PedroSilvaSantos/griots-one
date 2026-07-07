import type { Experience } from './types/experience'

const statusLabels: Record<Experience['status'], string> = {
  draft: 'Rascunho',
  published: 'Publicado',
}

type ExperienceRendererProps = {
  experience: Experience
}

export function ExperienceRenderer({ experience }: ExperienceRendererProps) {
  const radius = `${experience.theme.radius}px`

  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-3xl border border-white/70 bg-white/80 shadow-[0_18px_50px_-30px_rgba(16,35,63,0.55)] backdrop-blur-md">
      <div
        className="p-8 sm:p-12"
        style={{
          background: experience.brand.background
            ? `linear-gradient(rgba(16,35,63,0.45), rgba(16,35,63,0.55)), url(${experience.brand.background}) center/cover no-repeat`
            : `linear-gradient(135deg, ${experience.theme.primary}, ${experience.theme.secondary})`,
        }}
      >
        <article className="bg-white/92 p-6 sm:p-8" style={{ borderRadius: radius }}>
          <div className="flex items-center justify-between gap-4">
            {experience.brand.logo ? (
              <img src={experience.brand.logo} alt="Logo" className="h-10 w-auto object-contain" />
            ) : (
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--brand-muted)]">
                {experience.name}
              </span>
            )}
            <span className="rounded-full px-3 py-1 text-xs font-semibold" style={{ backgroundColor: `${experience.theme.accent}22`, color: experience.theme.accent }}>
              {statusLabels[experience.status]}
            </span>
          </div>

          {experience.brand.hero ? (
            <img
              src={experience.brand.hero}
              alt="Hero"
              className="mt-5 h-48 w-full object-cover sm:h-64"
              style={{ borderRadius: radius }}
            />
          ) : null}

          <h1 className="mt-6 font-display text-4xl leading-tight text-[var(--brand-ink)] sm:text-5xl">{experience.content.title}</h1>
          <p className="mt-3 max-w-3xl text-sm text-[var(--brand-muted)] sm:text-base">{experience.content.subtitle}</p>

          <button
            type="button"
            className="mt-6 inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white"
            style={{ backgroundColor: experience.theme.button, borderRadius: radius }}
          >
            {experience.content.cta}
          </button>
        </article>
      </div>

      <div className="space-y-4 p-6 sm:p-8">
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl p-4 text-white" style={{ backgroundColor: experience.theme.primary }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em]">Primaria</p>
          </div>
          <div className="rounded-xl p-4 text-white" style={{ backgroundColor: experience.theme.secondary }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em]">Secundaria</p>
          </div>
          <div className="rounded-xl p-4 text-white" style={{ backgroundColor: experience.theme.accent }}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.09em]">Destaque</p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#d8e2ea] bg-white p-5" style={{ borderRadius: radius }}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)]">Features</p>
          <p className="mt-2 text-sm text-[var(--brand-ink)]">{experience.content.features}</p>
        </div>

        <div className="rounded-2xl border border-[#d8e2ea] bg-white p-5" style={{ borderRadius: radius }}>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)]">Footer</p>
          <p className="mt-2 text-sm text-[var(--brand-ink)]">{experience.content.footer}</p>
        </div>
      </div>
    </section>
  )
}
