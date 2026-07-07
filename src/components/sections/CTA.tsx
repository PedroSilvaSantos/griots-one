import { ArrowRight } from 'lucide-react'
import { Button } from '../layout/Button'
import { Container } from '../layout/Container'

export function CTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="section-panel overflow-hidden bg-[var(--brand-ink)] p-8 text-[var(--brand-white)] sm:p-12">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/70">Comece agora</p>
              <h2 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">
                Transforme sua operação SaaS em uma máquina previsível.
              </h2>
              <p className="mt-4 max-w-xl text-sm text-white/80 sm:text-base">
                Entre para a lista de acesso antecipado e receba um blueprint de implantação com nosso time.
              </p>
            </div>
            <Button variant="secondary" className="h-12 gap-2 px-7 text-sm uppercase tracking-[0.12em]">
              Entrar na waitlist
              <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
