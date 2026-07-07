import { Layers, Radar, Workflow, ShieldCheck } from 'lucide-react'
import { Container } from '../layout/Container'
import { SectionHeader } from '../layout/SectionHeader'
import { featureItems } from '../../services/siteContent'

const icons = [Layers, Workflow, Radar, ShieldCheck]

export function Features() {
  return (
    <section id="features" className="py-16 sm:py-24">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Features"
          title="Arquitetura de produto para decisões melhores"
          description="Tudo pensado para transformar dados dispersos em execução com ritmo e padrão de excelência."
          align="center"
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {featureItems.map((feature, index) => {
            const Icon = icons[index % icons.length]

            return (
              <article key={feature.title} className="section-panel p-6 sm:p-7">
                <div className="mb-5 inline-flex rounded-xl bg-white p-2.5 ring-1 ring-[var(--stroke)]">
                  <Icon size={18} className="text-[var(--brand-ink)]" />
                </div>
                <h3 className="font-display text-2xl text-[var(--brand-ink)]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">
                  {feature.description}
                </p>
              </article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
