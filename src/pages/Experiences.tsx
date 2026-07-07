import { motion } from 'framer-motion'
import { ArrowUpRight, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/layout/Button'
import type { Experience } from '../features/experience/types/experience'
import { deleteExperience, getExperiences } from '../services/experience.service'

const statusLabels: Record<Experience['status'], string> = {
  draft: 'Rascunho',
  published: 'Publicado',
}

const templates = [
  { title: 'Campanha', subtitle: 'Mobilizacao e engajamento' },
  { title: 'Evento', subtitle: 'Ingressos e divulgacao' },
  { title: 'Marca', subtitle: 'Posicionamento institucional' },
  { title: 'Experiencia', subtitle: 'Fluxos digitais imersivos' },
]

export function Experiences() {
  const navigate = useNavigate()
  const [savedExperiences, setSavedExperiences] = useState<Experience[]>([])

  useEffect(() => {
    setSavedExperiences(getExperiences())
  }, [])

  const handleDelete = (id: string) => {
    deleteExperience(id)
    setSavedExperiences(getExperiences())
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">Experiencias</h2>
            <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">
              Crie experiencias para eventos, marcas e projetos institucionais sem alterar codigo.
            </p>
          </div>

          <Button className="h-11 px-6 text-xs uppercase tracking-[0.1em]" onClick={() => navigate('/admin/experiences/new')}>
            + Nova Experiencia
          </Button>
        </div>
      </section>

      {savedExperiences.length ? (
        <section className="space-y-3 rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
          <h3 className="font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">Experiencias Salvas</h3>
          <div className="space-y-2">
            {savedExperiences.map((experience) => (
              <div
                key={experience.id}
                className="grid grid-cols-1 items-center gap-3 rounded-xl border border-[#d8e2ea] bg-white p-3 sm:grid-cols-[1fr_auto] dark:border-white/10 dark:bg-[#101622]"
              >
                <div>
                  <p className="text-sm font-semibold text-[var(--brand-ink)] dark:text-slate-100">
                    {experience.name || experience.slug}
                  </p>
                  <p className="text-xs uppercase tracking-[0.08em] text-[var(--brand-muted)] dark:text-slate-400">
                    {statusLabels[experience.status] ?? experience.status} • /demo/{experience.slug}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="h-9 px-4 text-[11px] uppercase tracking-[0.1em]"
                    onClick={() => navigate(`/admin/experiences/${experience.id}/edit`)}
                  >
                    Editar
                  </Button>
                  <Button
                    className="h-9 px-4 text-[11px] uppercase tracking-[0.1em]"
                    onClick={() => navigate(`/demo/${experience.slug}`)}
                  >
                    Visualizar
                  </Button>
                  <button
                    type="button"
                    onClick={() => handleDelete(experience.id)}
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-rose-200 px-4 text-[11px] font-semibold uppercase tracking-[0.1em] text-rose-600 transition-colors hover:bg-rose-50"
                  >
                    <Trash2 size={14} />
                    Excluir
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {templates.map((template, index) => (
          <motion.article
            key={template.title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            whileHover={{ y: -5, scale: 1.01 }}
            className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75"
          >
            <div className="h-28 rounded-xl bg-gradient-to-br from-[#dde7f3] to-[#f2f7fc] dark:from-[#1c2532] dark:to-[#101722]" />
            <h3 className="mt-5 font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">{template.title}</h3>
            <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">{template.subtitle}</p>

            <div className="mt-5 grid grid-cols-1 gap-2">
              <Button
                variant="secondary"
                className="h-10 w-full justify-center text-xs uppercase tracking-[0.1em]"
                onClick={() => navigate('/admin/experiences/new')}
              >
                Editar
              </Button>
              <Button
                className="h-10 w-full justify-center gap-2 text-xs uppercase tracking-[0.1em]"
                onClick={() => navigate('/admin/analytics')}
              >
                Visualizar Analises
                <ArrowUpRight size={14} />
              </Button>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  )
}
