import { motion } from 'framer-motion'
import { CampaignTable } from '../components/dashboard/CampaignTable'
import { StatCard } from '../components/dashboard/StatCard'
import { analyticsBars, analyticsFilters, campaignRows, dashboardStats } from '../mocks/dashboard'

export function Analytics() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">Analytics</h2>
          <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">
            Painel de desempenho com filtros e leitura executiva.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {analyticsFilters.map((filter) => (
            <button
              key={filter}
              type="button"
              className="rounded-full border border-[#d8e2ea] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-200 dark:hover:bg-[#151e2b]"
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={`${stat.label}-analytics`} label={stat.label} value={stat.value} trend={stat.trend} />
        ))}
      </section>

      <section className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
        <div className="mb-4 flex items-end justify-between">
          <h3 className="font-display text-3xl text-[var(--brand-ink)] dark:text-slate-100">Funnel Snapshot</h3>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:text-slate-400">
            Atualizado agora
          </p>
        </div>

        <div className="flex h-56 items-end gap-2 sm:gap-3">
          {analyticsBars.map((value, index) => (
            <motion.div
              key={`${value}-${index}`}
              initial={{ height: 0, opacity: 0.55 }}
              whileInView={{ height: `${value}%`, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
              className="w-full rounded-t-lg bg-gradient-to-t from-[#0f766e] to-[#56c5b7]"
            />
          ))}
        </div>
      </section>

      <section>
        <CampaignTable rows={campaignRows} />
      </section>
    </div>
  )
}
