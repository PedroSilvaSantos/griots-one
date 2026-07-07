import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Container } from '../layout/Container'
import { SectionHeader } from '../layout/SectionHeader'
import { Button } from '../layout/Button'

const cases = [
  {
    type: 'Campanha Politica',
    title: 'Dr Vira-Lata',
    gradient: 'from-[#8eb5ff] via-[#cfdfff] to-[#eef4ff]',
  },
  {
    type: 'Evento',
    title: 'Outubro Rosa',
    gradient: 'from-[#ff9dc2] via-[#ffd1e3] to-[#fff0f6]',
  },
  {
    type: 'Empresa',
    title: 'Feira de Negocios',
    gradient: 'from-[#7ecfc4] via-[#b7ebe3] to-[#edfdfa]',
  },
]

export function Cases() {
  return (
    <section id="cases" className="py-20 sm:py-24 lg:py-28">
      <Container className="space-y-12">
        <SectionHeader
          eyebrow="Cases"
          title="Conheca alguns cases"
          description="A mesma plataforma atende campanhas politicas, eventos e empresas."
          align="center"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="rounded-3xl border border-white/75 bg-white/85 p-6 shadow-[0_12px_42px_-26px_rgba(16,35,63,0.4)] backdrop-blur-md sm:p-7"
            >
              <div
                className={`h-40 rounded-2xl bg-gradient-to-br ${item.gradient} shadow-inner sm:h-44`}
              />

              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
                {item.type}
              </p>
              <h3 className="mt-3 font-display text-3xl leading-tight text-[var(--brand-ink)]">{item.title}</h3>

              <Button variant="secondary" className="mt-6 h-11 w-full justify-center gap-2 text-sm">
                Ver demonstracao
                <ArrowUpRight size={15} />
              </Button>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}
