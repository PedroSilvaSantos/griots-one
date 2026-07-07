import { motion } from 'framer-motion'
import type { TimelineEvent } from '../../mocks/dashboard'

type ActivityTimelineProps = {
  items: TimelineEvent[]
}

export function ActivityTimeline({ items }: ActivityTimelineProps) {
  return (
    <section className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <h3 className="text-sm font-semibold uppercase tracking-[0.13em] text-[var(--brand-muted)] dark:text-slate-400">
        Timeline
      </h3>

      <div className="mt-5 space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={`${item.period}-${item.description}-${index}`}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            className="grid grid-cols-[60px_1fr] items-start gap-3"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--brand-muted)] dark:text-slate-400">
              {item.period}
            </p>
            <p className="rounded-xl border border-[#dce5ec] bg-white px-3 py-2 text-sm text-[var(--brand-ink)] dark:border-white/10 dark:bg-[#0f1722] dark:text-slate-200">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
