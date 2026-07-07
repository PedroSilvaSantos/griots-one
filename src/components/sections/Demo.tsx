import { Play, Activity, Bell, LineChart } from 'lucide-react'
import { Container } from '../layout/Container'
import { SectionHeader } from '../layout/SectionHeader'
import { Button } from '../layout/Button'

export function Demo() {
  return (
    <section id="demo" className="py-16 sm:py-24">
      <Container className="space-y-10">
        <SectionHeader
          eyebrow="Demo"
          title="Visualize a operação em segundos"
          description="Interface orientada a contexto, com leitura executiva e detalhe operacional no mesmo lugar."
        />

        <div className="section-panel overflow-hidden p-5 sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-2xl border border-[var(--stroke)] bg-[var(--brand-white)] p-5 sm:p-6">
              <div className="mb-5 flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--brand-ink)]">Control Room</p>
                <div className="inline-flex items-center gap-2 rounded-full border border-[var(--stroke)] px-3 py-1 text-xs text-[var(--brand-muted)]">
                  <Activity size={14} />
                  Live
                </div>
              </div>
              <div className="space-y-3">
                <div className="h-2 rounded-full bg-[#dde5eb]">
                  <div className="h-2 w-[78%] rounded-full bg-[var(--brand-accent)]"></div>
                </div>
                <div className="h-2 rounded-full bg-[#dde5eb]">
                  <div className="h-2 w-[62%] rounded-full bg-[var(--brand-ink)]"></div>
                </div>
                <div className="h-2 rounded-full bg-[#dde5eb]">
                  <div className="h-2 w-[86%] rounded-full bg-[#2a9d8f]"></div>
                </div>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl bg-[#f8fbfc] p-4 ring-1 ring-[var(--stroke)]">
                  <LineChart size={16} className="mb-2 text-[var(--brand-ink)]" />
                  <p className="text-xs text-[var(--brand-muted)]">Conversão</p>
                  <p className="text-xl font-bold text-[var(--brand-ink)]">12.4%</p>
                </div>
                <div className="rounded-xl bg-[#f8fbfc] p-4 ring-1 ring-[var(--stroke)]">
                  <Bell size={16} className="mb-2 text-[var(--brand-ink)]" />
                  <p className="text-xs text-[var(--brand-muted)]">Alertas ativos</p>
                  <p className="text-xl font-bold text-[var(--brand-ink)]">08</p>
                </div>
                <div className="rounded-xl bg-[#f8fbfc] p-4 ring-1 ring-[var(--stroke)]">
                  <Activity size={16} className="mb-2 text-[var(--brand-ink)]" />
                  <p className="text-xs text-[var(--brand-muted)]">SLA médio</p>
                  <p className="text-xl font-bold text-[var(--brand-ink)]">1h21</p>
                </div>
              </div>
            </div>

            <div className="section-panel flex flex-col items-start justify-between gap-6 bg-white p-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
                  Product Tour
                </p>
                <h3 className="mt-4 font-display text-3xl text-[var(--brand-ink)]">Veja o Griots One em ação</h3>
                <p className="mt-3 text-sm text-[var(--brand-muted)] sm:text-base">
                  Demonstração guiada com casos reais de operação, customer success e receita.
                </p>
              </div>
              <Button className="h-11 w-full justify-center gap-2 sm:w-auto">
                <Play size={15} />
                Iniciar demo
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
