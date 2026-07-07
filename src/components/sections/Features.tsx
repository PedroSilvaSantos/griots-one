import { motion } from 'framer-motion'
import {
  BarChart3,
  Image,
  LayoutDashboard,
  Palette,
  Rocket,
  Share2,
  type LucideIcon,
} from 'lucide-react'
import { Container } from '../layout/Container'
import { SectionHeader } from '../layout/SectionHeader'

type FeatureCard = {
  icon: LucideIcon
  title: string
  description: string
}

const featureCards: FeatureCard[] = [
  {
    icon: Rocket,
    title: 'Landing Personalizada',
    description: 'Crie paginas exclusivas para qualquer experiencia.',
  },
  {
    icon: Image,
    title: 'Editor Inteligente',
    description: 'Permita que qualquer usuario gere imagens personalizadas.',
  },
  {
    icon: Share2,
    title: 'Compartilhamento',
    description: 'Compartilhe diretamente nas redes sociais.',
  },
  {
    icon: LayoutDashboard,
    title: 'Painel Administrativo',
    description: 'Gerencie experiencias sem editar codigo.',
  },
  {
    icon: BarChart3,
    title: 'Analiticos',
    description: 'Acompanhe downloads, acessos e conversoes.',
  },
  {
    icon: Palette,
    title: 'Marca Branca',
    description: 'Troque logo, cores e identidade visual rapidamente.',
  },
]

const smoothEase = [0.22, 1, 0.36, 1] as const

const cardReveal = {
  hidden: { opacity: 0, y: 18 },
  show: (index: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: smoothEase,
      delay: index * 0.06,
    },
  }),
}

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-24 lg:py-28">
      <Container className="space-y-12">
        <SectionHeader
          eyebrow="Recursos"
          title="Tudo que voce precisa para lancar experiencias digitais"
          description="Uma plataforma completa para experiencias politicas, eventos e empresas."
          align="center"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {featureCards.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.article
                key={feature.title}
                custom={index}
                variants={cardReveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.22, ease: smoothEase }}
                className="rounded-3xl border border-white/70 bg-white/85 p-7 shadow-[0_12px_42px_-26px_rgba(16,35,63,0.38)] backdrop-blur-md sm:p-8"
              >
                <div className="mb-6 inline-flex rounded-2xl border border-[#dce5ec] bg-gradient-to-br from-[#ffffff] to-[#eff5f9] p-3 shadow-sm">
                  <Icon size={20} className="text-[var(--brand-ink)]" />
                </div>
                <h3 className="font-display text-2xl leading-tight text-[var(--brand-ink)]">{feature.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--brand-muted)] sm:text-base">
                  {feature.description}
                </p>
              </motion.article>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
