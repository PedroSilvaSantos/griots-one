import { ArrowUpRight, Sparkles } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../layout/Button'
import { Container } from '../layout/Container'

export function Hero() {
  const navigate = useNavigate()

  return (
    <section id="hero" className="relative overflow-hidden pt-20 pb-16 sm:pt-24 sm:pb-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] bg-white/80 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
              <Sparkles size={14} />
              Sistema Operacional SaaS
            </div>
            <div className="space-y-6">
              <h1 className="font-display text-5xl leading-[0.95] text-[var(--brand-ink)] sm:text-6xl lg:text-7xl">
                A camada de execução para times SaaS que querem crescer com clareza.
              </h1>
              <p className="max-w-xl text-base text-[var(--brand-muted)] sm:text-lg">
                Griots One centraliza decisões, rituais e performance em um fluxo único para produto,
                receita e experiência do cliente.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                className="h-12 px-7 text-sm uppercase tracking-[0.12em]"
                onClick={() => navigate('/login')}
              >
                Solicitar Demonstracao
              </Button>
              <Button
                variant="secondary"
                className="h-12 px-7 text-sm uppercase tracking-[0.12em]"
                onClick={() => navigate('/demo/dr-viralata')}
              >
                Ver Demonstracao
              </Button>
            </div>
          </div>

          <div className="section-panel relative p-5 sm:p-7">
            <div className="rounded-2xl border border-[var(--stroke)] bg-[#f8fbfc] p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--brand-ink)]">Resumo de Performance</p>
                <span className="rounded-full bg-[#d9f5ef] px-3 py-1 text-xs font-semibold text-[#0f766e]">
                  +24.8%
                </span>
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--brand-muted)]">MRR</p>
                  <p className="font-display text-4xl text-[var(--brand-ink)]">R$ 218.430</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white p-4 ring-1 ring-[var(--stroke)]">
                    <p className="text-xs text-[var(--brand-muted)]">Churn</p>
                    <p className="mt-1 text-lg font-bold text-[var(--brand-ink)]">1.9%</p>
                  </div>
                  <div className="rounded-xl bg-white p-4 ring-1 ring-[var(--stroke)]">
                    <p className="text-xs text-[var(--brand-muted)]">NPS</p>
                    <p className="mt-1 text-lg font-bold text-[var(--brand-ink)]">72</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand-ink)]"
                >
                  Abrir visão executiva
                  <ArrowUpRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
