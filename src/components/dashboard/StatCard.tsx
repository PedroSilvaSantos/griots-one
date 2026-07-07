import { motion } from 'framer-motion'

type StatCardProps = {
  label: string
  value: string
  trend: string
}

export function StatCard({ label, value, trend }: StatCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.13em] text-[var(--brand-muted)] dark:text-slate-400">
        {label}
      </p>
      <p className="mt-3 text-3xl font-bold tracking-tight text-[var(--brand-ink)] dark:text-slate-100">{value}</p>
      <p className="mt-2 text-xs font-semibold text-[#0f766e] dark:text-emerald-400">{trend}</p>
    </motion.article>
  )
}
