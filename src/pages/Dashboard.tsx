import { motion } from 'framer-motion'
import { ActivityTimeline } from '../components/dashboard/ActivityTimeline'
import { ExperienceTable } from '../components/dashboard/ExperienceTable'
import { StatCard } from '../components/dashboard/StatCard'
import { dashboardBars, dashboardStats, experienceRows, timelineEvents } from '../mocks/dashboard'

export function Dashboard() {
  return (
    <div className="space-y-6">
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {dashboardStats.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.45fr_0.55fr]">
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75"
        >
          <div className="mb-4 flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[var(--brand-muted)] dark:text-slate-400">
                Ultimos 7 dias
              </p>
              <h2 className="mt-2 font-display text-3xl text-[var(--brand-ink)] dark:text-slate-100">
                Performance
              </h2>
            </div>
            <p className="text-sm font-semibold text-[#0f766e] dark:text-emerald-400">+18.3%</p>
          </div>

          <div className="flex h-52 items-end gap-2 sm:gap-3">
            {dashboardBars.map((value, index) => (
              <motion.div
                key={`${value}-${index}`}
                initial={{ height: 0, opacity: 0.55 }}
                whileInView={{ height: `${value}%`, opacity: 1 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                className="w-full rounded-t-lg bg-gradient-to-t from-[var(--brand-ink)]/90 to-[#5f8bc8]"
              />
            ))}
          </div>
        </motion.article>

        <ActivityTimeline items={timelineEvents} />
      </section>

      <section>
        <ExperienceTable rows={experienceRows} />
      </section>
    </div>
  )
}
