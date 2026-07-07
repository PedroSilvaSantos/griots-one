import { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/layout/Button'
import { Container } from '../components/layout/Container'
import { CAMPAIGNS_STORAGE_KEY } from '../features/campaign-builder/mocks/campaign'
import type { Campaign } from '../features/campaign-builder/types/campaign'
import { EXPERIENCES_STORAGE_KEY, createEmptyExperience } from '../features/experience/mocks/experience'
import type { Experience } from '../features/experience/types/experience'

export function DemoDrViralata() {
  const navigate = useNavigate()
  const { slug = 'dr-viralata' } = useParams<{ slug: string }>()

  const experience = useMemo(() => {
    const experienceFallback = {
      ...createEmptyExperience(),
      name: 'Dr Vira-Lata',
      slug,
    }

    if (typeof window === 'undefined') {
      return experienceFallback
    }

    const rawExperience = localStorage.getItem(EXPERIENCES_STORAGE_KEY)
    if (rawExperience) {
      try {
        const parsed = JSON.parse(rawExperience) as Experience[]
        const found = parsed.find((item) => item.slug === slug)

        if (found) return found
      } catch {
      }
    }

    const rawCampaign = localStorage.getItem(CAMPAIGNS_STORAGE_KEY)
    if (!rawCampaign) return experienceFallback

    try {
      const parsed = JSON.parse(rawCampaign) as Campaign[]
      const found = parsed.find((item) => item.slug === slug)

      if (!found) return experienceFallback

      return {
        ...experienceFallback,
        id: found.id,
        name: found.name,
        slug: found.slug,
        status: found.status,
        brand: {
          logo: found.logo,
          hero: found.hero,
          background: found.background,
          frame: found.frame,
        },
        theme: {
          ...experienceFallback.theme,
          primary: found.colors.primary,
          secondary: found.colors.secondary,
          accent: found.colors.accent,
          button: found.colors.button,
        },
        content: {
          title: found.texts.heroTitle,
          subtitle: found.texts.heroSubtitle,
          cta: found.texts.cta,
          features: found.texts.features,
          footer: found.texts.footer,
        },
        social: {
          instagram: found.socials.instagram,
          facebook: found.socials.facebook,
          tiktok: found.socials.tiktok,
          linkedin: '',
          website: found.socials.website,
        },
        settings: {
          download: found.settings.download,
          share: found.settings.share,
          analytics: found.settings.analytics,
          gallery: false,
        },
      }
    } catch {
      return experienceFallback
    }
  }, [slug])

  return (
    <section className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div
          className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_14px_44px_-26px_rgba(16,35,63,0.45)] backdrop-blur-md sm:p-10"
          style={{
            borderColor: `${experience.theme.accent}66`,
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)]">Demo da Experiencia</p>
          <h1 className="mt-4 font-display text-4xl text-[var(--brand-ink)] sm:text-5xl">
            {experience.name || 'Dr Vira-Lata'}
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-[var(--brand-muted)] sm:text-base">
            {experience.content.subtitle || 'Ambiente demonstrativo da experiencia com visao de performance, ativos e engajamento.'}
          </p>

          {experience.brand.hero ? (
            <img src={experience.brand.hero} alt="Hero" className="mt-6 h-52 w-full rounded-2xl object-cover" />
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              className="h-11 px-7 text-sm uppercase tracking-[0.12em]"
              onClick={() => navigate('/admin/dashboard')}
            >
              Abrir Dashboard
            </Button>
            <Button
              variant="secondary"
              className="h-11 px-7 text-sm uppercase tracking-[0.12em]"
              onClick={() => navigate('/')}
            >
              Voltar para Landing
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
