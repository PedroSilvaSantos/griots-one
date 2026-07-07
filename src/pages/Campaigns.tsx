import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Button } from '../components/layout/Button'
import { campaignTypeCards } from '../mocks/dashboard'

export function Campaigns() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
        <h2 className="font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">Campaigns</h2>
        <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">
          Gerencie tipos de campanha e execute com rapidez.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {campaignTypeCards.map((item, index) => (
          <motion.article
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75"
          >
            <div className="h-28 rounded-xl bg-gradient-to-br from-[#dde7f3] to-[#f2f7fc] dark:from-[#1c2532] dark:to-[#101722]" />
            <h3 className="mt-5 font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">{item.title}</h3>
            <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">{item.subtitle}</p>

            <div className="mt-5 grid grid-cols-1 gap-2">
              <Button variant="secondary" className="h-10 w-full justify-center text-xs uppercase tracking-[0.1em]">
                Editar
              </Button>
              <Button className="h-10 w-full justify-center gap-2 text-xs uppercase tracking-[0.1em]">
                Visualizar Analytics
                <ArrowUpRight size={14} />
              </Button>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  )
}
