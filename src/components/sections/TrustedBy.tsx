import { motion } from 'framer-motion'
import { Container } from '../layout/Container'

const brands = ['AUTOPASS', 'GRIOTS', 'EVENT+', 'ABC COMPANY', 'CITY RUN', 'VIRA LATA']

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      delay: 0.04 * index,
    },
  }),
}

export function TrustedBy() {
  return (
    <section id="trusted-by" className="py-14 sm:py-16">
      <Container>
        <div className="rounded-3xl border border-white/70 bg-white/65 px-6 py-8 shadow-[0_10px_34px_-24px_rgba(16,35,63,0.42)] backdrop-blur-md sm:px-10 sm:py-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.45 }}
            className="text-center text-sm font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)]"
          >
            Empresas, experiencias e eventos confiam na Griots One
          </motion.p>

          <div className="mt-7 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:justify-between lg:gap-8">
            {brands.map((brand, index) => (
              <motion.span
                key={brand}
                custom={index}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{ scale: 1.05 }}
                className="text-center text-sm font-bold tracking-[0.18em] text-[#96a2b0] transition-colors hover:text-[var(--brand-ink)]"
              >
                {brand}
              </motion.span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
