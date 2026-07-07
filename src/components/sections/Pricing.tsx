import { Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Container } from '../layout/Container'
import { SectionHeader } from '../layout/SectionHeader'
import { pricingPlans } from '../../services/siteContent'
import { Button } from '../layout/Button'
import { cn } from '../../services/cn'

export function Pricing() {
  const navigate = useNavigate()

  return (
    <section id="pricing" className="py-16 sm:py-24">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Pricing"
          title="Planos que acompanham o ritmo do seu crescimento"
          description="Comece rápido e evolua sem migração dolorosa de stack ou processos."
          align="center"
        />

        <div className="grid gap-4 lg:grid-cols-3">
          {pricingPlans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                'section-panel flex flex-col p-6 sm:p-7',
                plan.highlighted && 'bg-[var(--brand-ink)] text-[var(--brand-white)]',
              )}
            >
              <p
                className={cn(
                  'text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]',
                  plan.highlighted && 'text-white/70',
                )}
              >
                {plan.name}
              </p>
              <div className="mt-4 flex items-end gap-2">
                <p className="font-display text-4xl">{plan.price}</p>
                <p className={cn('pb-1 text-sm text-[var(--brand-muted)]', plan.highlighted && 'text-white/70')}>
                  {plan.period}
                </p>
              </div>
              <p className={cn('mt-4 text-sm text-[var(--brand-muted)]', plan.highlighted && 'text-white/80')}>
                {plan.description}
              </p>
              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-sm">
                    <span
                      className={cn(
                        'inline-flex h-5 w-5 items-center justify-center rounded-full bg-white ring-1 ring-[var(--stroke)]',
                        plan.highlighted && 'bg-white/10 ring-white/30',
                      )}
                    >
                      <Check
                        size={13}
                        className={cn('text-[var(--brand-ink)]', plan.highlighted && 'text-[var(--brand-white)]')}
                      />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                variant={plan.highlighted ? 'secondary' : 'primary'}
                className={cn('mt-8 h-11 w-full', plan.highlighted && 'bg-white text-[var(--brand-ink)]')}
                onClick={() => navigate('/login')}
              >
                Escolher plano
              </Button>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}
