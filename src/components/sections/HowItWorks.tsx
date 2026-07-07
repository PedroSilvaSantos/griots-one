import { Container } from '../layout/Container'
import { SectionHeader } from '../layout/SectionHeader'
import { stepItems } from '../../services/siteContent'

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="How It Works"
          title="Da integração ao scale em um fluxo contínuo"
          description="Sem troca de contexto entre times. Cada etapa conecta pessoas, processos e receita."
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {stepItems.map((step, index) => (
            <article key={step.title} className="section-panel p-6">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
                Step {index + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl text-[var(--brand-ink)]">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
