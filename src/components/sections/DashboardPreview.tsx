import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '../layout/Button'
import { Container } from '../layout/Container'

const metrics = [
  { label: 'Experiencias Ativas', value: '18' },
  { label: 'Downloads', value: '24.820' },
  { label: 'Uploads', value: '31.552' },
  { label: 'Conversao', value: '82%' },
]

const tableRows = [
  { experience: 'Dr Vira-Lata', status: 'Ativa', downloads: '5230' },
  { experience: 'Evento Outubro Rosa', status: 'Ativa', downloads: '3210' },
  { experience: 'Empresa XPTO', status: 'Ativa', downloads: '1244' },
]

const barHeights = ['h-16', 'h-24', 'h-14', 'h-28', 'h-20', 'h-32', 'h-[72px]']

export function DashboardPreview() {
  return (
    <section id="dashboard-preview" className="py-20 sm:py-24 lg:py-28">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.45 }}
            className="space-y-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand-muted)]">
              Dashboard Preview
            </p>
            <h2 className="font-display text-4xl leading-tight text-[var(--brand-ink)] sm:text-5xl">
              Gerencie tudo em um unico lugar
            </h2>
            <p className="max-w-xl text-base text-[var(--brand-muted)] sm:text-lg">
              Acompanhe experiencias, downloads, compartilhamentos e metricas em tempo real.
            </p>
            <Button className="h-12 px-7 text-sm uppercase tracking-[0.12em]">
              Ver Dashboard
              <ArrowUpRight size={16} className="ml-2" />
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl border border-white/70 bg-white/80 p-4 shadow-[0_14px_50px_-28px_rgba(16,35,63,0.45)] backdrop-blur-md sm:p-5"
          >
            <div className="overflow-hidden rounded-2xl border border-[#dce5ec] bg-[#f8fbfd]">
              <div className="grid min-h-[510px] grid-cols-[88px_1fr] sm:grid-cols-[110px_1fr]">
                <aside className="border-r border-[#dce5ec] bg-white px-3 py-4 sm:px-4">
                  <p className="mb-6 font-display text-sm text-[var(--brand-ink)]">Griots</p>
                  <nav className="space-y-2 text-xs font-semibold text-[var(--brand-muted)] sm:text-sm">
                    <p className="rounded-lg bg-[var(--brand-ink)] px-2.5 py-2 text-white">Dashboard</p>
                    <p className="rounded-lg px-2.5 py-2 hover:bg-[#eef4f8]">Experiences</p>
                    <p className="rounded-lg px-2.5 py-2 hover:bg-[#eef4f8]">Analytics</p>
                    <p className="rounded-lg px-2.5 py-2 hover:bg-[#eef4f8]">Settings</p>
                  </nav>
                </aside>

                <div className="p-4 sm:p-5">
                  <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
                    {metrics.map((metric) => (
                      <div key={metric.label} className="rounded-xl border border-[#dce5ec] bg-white p-3">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--brand-muted)]">
                          {metric.label}
                        </p>
                        <p className="mt-2 text-xl font-bold text-[var(--brand-ink)]">{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 rounded-xl border border-[#dce5ec] bg-white p-4">
                    <div className="mb-3 flex items-end justify-between">
                      <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)]">
                        Performance
                      </p>
                      <p className="text-xs font-semibold text-[#0f766e]">+18.4%</p>
                    </div>
                    <div className="flex h-36 items-end gap-2 sm:gap-3">
                      {barHeights.map((height, index) => (
                        <motion.div
                          key={`${height}-${index}`}
                          initial={{ height: 0, opacity: 0.6 }}
                          whileInView={{ height: 'auto', opacity: 1 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{ duration: 0.45, delay: index * 0.04 }}
                          className={`w-full rounded-t-md bg-gradient-to-t from-[var(--brand-ink)]/85 to-[#5e88c4] ${height}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="mt-4 overflow-hidden rounded-xl border border-[#dce5ec] bg-white">
                    <div className="grid grid-cols-[1.3fr_0.8fr_0.6fr] border-b border-[#dce5ec] bg-[#f4f8fb] px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--brand-muted)] sm:px-4">
                      <p>Experiencia</p>
                      <p>Status</p>
                      <p className="text-right">Downloads</p>
                    </div>
                    <div className="divide-y divide-[#edf3f7]">
                      {tableRows.map((row) => (
                        <div
                          key={row.experience}
                          className="grid grid-cols-[1.3fr_0.8fr_0.6fr] items-center px-3 py-2.5 text-xs text-[var(--brand-ink)] sm:px-4 sm:text-sm"
                        >
                          <p className="font-semibold">{row.experience}</p>
                          <span className="inline-flex w-fit rounded-full bg-[#dcf7ef] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0f766e] sm:text-[11px]">
                            {row.status}
                          </span>
                          <p className="text-right font-semibold">{row.downloads}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
