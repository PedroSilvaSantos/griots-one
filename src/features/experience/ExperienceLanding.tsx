import { useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Button } from '../../components/layout/Button'
import { ExperienceRenderer as TemplateExperienceRenderer } from '../experience-template-engine/components/ExperienceRenderer'
import { useExperienceLoader } from './useExperienceLoader'

export function ExperienceLanding() {
  const navigate = useNavigate()
  const { slug = '' } = useParams<{ slug: string }>()
  const { experience, notFound } = useExperienceLoader(slug)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  if (notFound || !experience) {
    return (
      <section className="grid min-h-screen place-items-center px-6 py-16">
        <div className="w-full max-w-xl rounded-3xl border border-white/70 bg-white/85 p-10 text-center shadow-[0_18px_50px_-30px_rgba(16,35,63,0.55)] backdrop-blur-xl">
          <h1 className="font-display text-4xl text-[var(--brand-ink)]">Experiência não encontrada</h1>
          <p className="mt-3 text-sm text-[var(--brand-muted)]">Verifique o link da demo ou crie uma nova experiência no painel.</p>
          <Button className="mt-8 h-11 px-7 text-sm uppercase tracking-[0.12em]" onClick={() => navigate('/')}>
            Voltar para Home
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="px-4 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-5xl rounded-3xl border border-white/70 bg-white/85 p-4 shadow-[0_18px_50px_-30px_rgba(16,35,63,0.55)] backdrop-blur-md sm:p-6">
        <TemplateExperienceRenderer canvasRef={canvasRef} experience={experience} />
      </div>
    </section>
  )
}
