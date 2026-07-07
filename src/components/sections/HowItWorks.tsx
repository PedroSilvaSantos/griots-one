import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { SectionHeader } from '../layout/SectionHeader'
import { Container } from '../layout/Container'

const steps = [
  'Crie sua campanha',
  'Personalize',
  'Compartilhe',
  'Acompanhe resultados',
]

const smoothEase = [0.22, 1, 0.36, 1] as const

const stepReveal = {
  hidden: { opacity: 0, y: 14 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      delay: 0.08 + index * 0.08,
      ease: smoothEase,
    },
  }),
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 lg:py-28">
      <Container className="space-y-12">
        <SectionHeader
          eyebrow="How It Works"
          title="Como funciona"
          description="Quatro passos para colocar sua campanha no ar."
          align="center"
        />

        <div className="rounded-3xl border border-white/70 bg-white/75 p-5 shadow-[0_12px_42px_-26px_rgba(16,35,63,0.38)] backdrop-blur-md sm:p-8">
          <div className="hidden lg:grid lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] lg:items-center lg:gap-4">
            {steps.map((step, index) => (
              <div key={step} className="contents">
                <motion.article
                  custom={index}
                  variants={stepReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.45 }}
                  className="rounded-2xl border border-[#dde6ed] bg-gradient-to-br from-white to-[#f4f8fb] p-5 text-center"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
                    Passo {index + 1}
                  </p>
                  <p className="mt-3 font-display text-2xl leading-tight text-[var(--brand-ink)]">{step}</p>
                </motion.article>

                {index < steps.length - 1 ? (
                  <motion.div
                    custom={index}
                    variants={stepReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.45 }}
                    className="flex items-center justify-center"
                  >
                    <ArrowDown size={18} className="text-[var(--brand-muted)]" />
                  </motion.div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="space-y-4 lg:hidden">
            {steps.map((step, index) => (
              <div key={step} className="space-y-4">
                <motion.article
                  custom={index}
                  variants={stepReveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.35 }}
                  className="rounded-2xl border border-[#dde6ed] bg-gradient-to-br from-white to-[#f4f8fb] p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]">
                    Passo {index + 1}
                  </p>
                  <p className="mt-3 font-display text-2xl leading-tight text-[var(--brand-ink)]">{step}</p>
                </motion.article>

                {index < steps.length - 1 ? (
                  <motion.div
                    custom={index}
                    variants={stepReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.35 }}
                    className="flex justify-center"
                  >
                    <ArrowDown size={18} className="text-[var(--brand-muted)]" />
                  </motion.div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
