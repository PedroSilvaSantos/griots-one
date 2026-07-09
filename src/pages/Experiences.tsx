import { motion } from 'framer-motion'
import {
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Eye,
  Megaphone,
  PencilLine,
  Plus,
  RadioTower,
  Search,
  Sparkles,
  Ticket,
  Trash2,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/layout/Button'
import type { Experience } from '../features/experience/types/experience'
import { cn } from '../services/cn'
import { deleteExperience, getExperiences } from '../services/experience.service'

const statusLabels: Record<Experience['status'], string> = {
  draft: 'Rascunho',
  published: 'Publicado',
}

const statusTone: Record<Experience['status'], string> = {
  draft: 'bg-amber-100 text-amber-800 ring-1 ring-amber-200 dark:bg-amber-500/15 dark:text-amber-200 dark:ring-amber-500/30',
  published: 'bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-200 dark:ring-emerald-500/30',
}

type ExperienceFilter = 'all' | Experience['status']

type TemplateCard = {
  title: string
  subtitle: string
  description: string
  icon: typeof Megaphone
  eyebrow: string
  accent: string
  chips: string[]
}

const templates: TemplateCard[] = [
  {
    title: 'Campanha',
    subtitle: 'Mobilizacao e engajamento',
    description: 'Para candidaturas, mandatos e mobilizacoes com leitura rapida e CTA forte.',
    icon: Megaphone,
    eyebrow: 'Alta conversao',
    accent: 'linear-gradient(135deg, rgba(15,118,110,0.28), rgba(29,78,216,0.32))',
    chips: ['Hashtag forte', 'Numero em destaque', 'Foto protagonista'],
  },
  {
    title: 'Evento',
    subtitle: 'Ingressos e divulgacao',
    description: 'Ideal para cronograma, lote, headline curta e distribuicao em social.',
    icon: Ticket,
    eyebrow: 'Fluxo rapido',
    accent: 'linear-gradient(135deg, rgba(14,116,144,0.26), rgba(37,99,235,0.30))',
    chips: ['Datas claras', 'Abertura visual', 'CTA de inscricao'],
  },
  {
    title: 'Marca',
    subtitle: 'Posicionamento institucional',
    description: 'Apresentacao mais limpa para lancamentos, branding e prova de autoridade.',
    icon: BriefcaseBusiness,
    eyebrow: 'Mais editorial',
    accent: 'linear-gradient(135deg, rgba(30,41,59,0.28), rgba(14,165,233,0.22))',
    chips: ['Tipografia premium', 'Mensagem central', 'Visual sobrio'],
  },
  {
    title: 'Experiencia',
    subtitle: 'Fluxos digitais imersivos',
    description: 'Boa base para jornadas mais autorais com assets, analytics e narrativa visual.',
    icon: RadioTower,
    eyebrow: 'Mais flexivel',
    accent: 'linear-gradient(135deg, rgba(2,132,199,0.22), rgba(15,23,42,0.34))',
    chips: ['Assets modulares', 'Estrutura expansivel', 'Leitura moderna'],
  },
]

const filters: Array<{ id: ExperienceFilter; label: string }> = [
  { id: 'all', label: 'Todas' },
  { id: 'draft', label: 'Rascunhos' },
  { id: 'published', label: 'Publicadas' },
]

function getExperienceDisplayName(experience: Experience) {
  return experience.name.trim() || experience.content.candidateName.trim() || experience.slug
}

function formatUpdatedAt(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return 'sem atualizacao recente'
  }

  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

function TemplatePreview({ accent, title }: { accent: string; title: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-white/55 bg-[#0f1722] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] dark:border-white/10"
      style={{ backgroundImage: accent }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.22),transparent_38%)]" />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-3 w-16 rounded-full bg-white/65" />
          <div className="h-3 w-10 rounded-full bg-white/25" />
        </div>
        <div className="rounded-[1.4rem] border border-white/25 bg-slate-950/30 p-3 backdrop-blur-sm">
          <div className="h-20 rounded-[1rem] bg-white/18" />
          <div className="mt-3 h-3 w-28 rounded-full bg-white/65" />
          <div className="mt-2 h-3 w-20 rounded-full bg-white/35" />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="h-2.5 w-24 rounded-full bg-white/60" />
            <div className="mt-2 h-2.5 w-14 rounded-full bg-white/30" />
          </div>
          <span className="rounded-full border border-white/30 bg-white/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/80">
            {title}
          </span>
        </div>
      </div>
    </div>
  )
}

export function Experiences() {
  const navigate = useNavigate()
  const [savedExperiences, setSavedExperiences] = useState<Experience[]>([])
  const [query, setQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<ExperienceFilter>('all')

  useEffect(() => {
    setSavedExperiences(getExperiences())
  }, [])

  const orderedExperiences = useMemo(
    () =>
      [...savedExperiences].sort(
        (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      ),
    [savedExperiences],
  )

  const filteredExperiences = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return orderedExperiences.filter((experience) => {
      const matchesStatus = statusFilter === 'all' || experience.status === statusFilter
      const matchesQuery = normalizedQuery.length === 0
        || getExperienceDisplayName(experience).toLowerCase().includes(normalizedQuery)
        || experience.slug.toLowerCase().includes(normalizedQuery)
        || experience.category.toLowerCase().includes(normalizedQuery)
        || experience.template.id.toLowerCase().includes(normalizedQuery)

      return matchesStatus && matchesQuery
    })
  }, [orderedExperiences, query, statusFilter])

  const stats = useMemo(() => {
    const publishedCount = savedExperiences.filter((experience) => experience.status === 'published').length
    const draftCount = savedExperiences.length - publishedCount
    const categoryCount = new Set(savedExperiences.map((experience) => experience.category)).size

    return {
      total: savedExperiences.length,
      published: publishedCount,
      drafts: draftCount,
      categories: categoryCount,
    }
  }, [savedExperiences])

  const handleDelete = (experience: Experience) => {
    const confirmed = window.confirm(`Excluir a experience "${getExperienceDisplayName(experience)}"?`)
    if (!confirmed) return

    deleteExperience(experience.id)
    setSavedExperiences(getExperiences())
  }

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-[1.35fr_0.65fr]">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/65 bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(240,247,252,0.82))] p-6 shadow-[0_18px_55px_-34px_rgba(16,35,63,0.48)] backdrop-blur-md dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(17,21,28,0.94),rgba(9,16,28,0.88))]">
          <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(15,118,110,0.18),transparent_64%)]" />
          <div className="absolute bottom-[-3.5rem] right-[-2rem] h-52 w-52 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.16),transparent_64%)]" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#cfe0ec] bg-white/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)] dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <Sparkles size={13} />
              Workspace de publicacao
            </div>

            <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.02] text-[var(--brand-ink)] dark:text-slate-100 md:text-[2.85rem]">
              Organize suas experiences com mais clareza e menos atrito operacional.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[var(--brand-muted)] dark:text-slate-400 md:text-[15px]">
              Centralize rascunhos, publicacoes e modelos em um painel que ajuda o time a decidir rapido o que editar, publicar ou escalar.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Button className="h-11 gap-2 px-6 text-xs uppercase tracking-[0.12em]" onClick={() => navigate('/admin/experiences/new')}>
                <Plus size={14} />
                Nova Experience
              </Button>
              <Button
                variant="secondary"
                className="h-11 gap-2 px-5 text-xs uppercase tracking-[0.12em]"
                onClick={() => navigate('/admin/analytics')}
              >
                Visualizar Analises
                <ArrowUpRight size={14} />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 xl:grid-cols-1">
          <div className="rounded-[1.6rem] border border-white/60 bg-white/85 p-4 shadow-[0_12px_36px_-28px_rgba(16,35,63,0.4)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/80">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:text-slate-400">Total</p>
            <p className="mt-3 font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">{stats.total}</p>
            <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">Experiences cadastradas</p>
          </div>
          <div className="rounded-[1.6rem] border border-white/60 bg-white/85 p-4 shadow-[0_12px_36px_-28px_rgba(16,35,63,0.4)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/80">
            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:text-slate-400">Publicadas</p>
            <p className="mt-3 font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">{stats.published}</p>
            <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">Prontas para distribuicao</p>
          </div>
          <div className="rounded-[1.6rem] border border-white/60 bg-white/85 p-4 shadow-[0_12px_36px_-28px_rgba(16,35,63,0.4)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/80 xl:grid xl:grid-cols-2 xl:gap-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:text-slate-400">Rascunhos</p>
              <p className="mt-3 font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">{stats.drafts}</p>
            </div>
            <div className="mt-4 border-t border-[#e4ebf1] pt-4 dark:border-white/10 xl:mt-0 xl:border-t-0 xl:border-l xl:pl-3 xl:pt-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:text-slate-400">Categorias</p>
              <p className="mt-3 font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">{stats.categories}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] border border-white/65 bg-white/82 p-5 shadow-[0_14px_42px_-30px_rgba(16,35,63,0.4)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/78">
        <div className="flex flex-col gap-4 border-b border-[#e1e9ef] pb-4 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-display text-[1.9rem] leading-none text-[var(--brand-ink)] dark:text-slate-100">
                Experiences salvas
              </h3>
              <span className="rounded-full bg-[#edf5fb] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:bg-white/5 dark:text-slate-300">
                {filteredExperiences.length} visiveis
              </span>
            </div>
            <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">
              Continue edicoes recentes, filtre por status e encontre rapido o que ja esta pronto para publicar.
            </p>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <label className="relative w-full lg:w-[22rem]">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-muted)] dark:text-slate-400"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Buscar por nome, slug, categoria ou template"
                className="h-11 w-full rounded-2xl border border-[#d8e2ea] bg-white pl-10 pr-4 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
              />
            </label>

            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => setStatusFilter(filter.id)}
                  className={cn(
                    'rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-all',
                    statusFilter === filter.id
                      ? 'bg-[var(--brand-ink)] text-white shadow-[0_10px_20px_-16px_rgba(16,35,63,0.55)]'
                      : 'bg-[#eef4f8] text-[var(--brand-muted)] hover:bg-[#e3edf5] dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10',
                  )}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          {filteredExperiences.length ? (
            filteredExperiences.map((experience) => (
              <article
                key={experience.id}
                className="group relative overflow-hidden rounded-[1.6rem] border border-[#d8e2ea] bg-[linear-gradient(135deg,#ffffff,rgba(243,247,251,0.96))] p-4 shadow-[0_10px_28px_-24px_rgba(16,35,63,0.38)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(16,35,63,0.5)] dark:border-white/10 dark:bg-[linear-gradient(135deg,rgba(16,22,34,0.96),rgba(11,18,29,0.92))]"
              >
                <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-[#0f766e] via-[#2563eb] to-[#0f172a] opacity-75" />

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="min-w-0 flex-1 pl-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={cn('inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]', statusTone[experience.status])}>
                        {statusLabels[experience.status]}
                      </span>
                      <span className="inline-flex rounded-full bg-[#edf5fb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:bg-white/5 dark:text-slate-300">
                        {experience.category}
                      </span>
                      <span className="inline-flex rounded-full bg-[#f5f8fb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:bg-[#151d2b] dark:text-slate-400">
                        {experience.template.id}
                      </span>
                    </div>

                    <h4 className="mt-3 truncate font-display text-[1.65rem] leading-none text-[var(--brand-ink)] dark:text-slate-100">
                      {getExperienceDisplayName(experience)}
                    </h4>

                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--brand-muted)] dark:text-slate-400">
                      <span className="inline-flex items-center gap-1.5">
                        <ArrowUpRight size={13} />
                        /demo/{experience.slug}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <CalendarDays size={13} />
                        Atualizada em {formatUpdatedAt(experience.updatedAt)}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-3">
                    <Button
                      variant="secondary"
                      className="h-11 gap-2 px-4 text-[11px] uppercase tracking-[0.12em]"
                      onClick={() => navigate(`/admin/experiences/${experience.id}/edit`)}
                    >
                      <PencilLine size={14} />
                      Editar
                    </Button>
                    <Button
                      className="h-11 gap-2 px-4 text-[11px] uppercase tracking-[0.12em]"
                      onClick={() => navigate(`/demo/${experience.slug}`)}
                    >
                      <Eye size={14} />
                      Visualizar
                    </Button>
                    <button
                      type="button"
                      onClick={() => handleDelete(experience)}
                      className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-rose-200 px-4 text-[11px] font-semibold uppercase tracking-[0.12em] text-rose-600 transition-colors hover:bg-rose-50 dark:border-rose-500/30 dark:text-rose-300 dark:hover:bg-rose-500/10"
                    >
                      <Trash2 size={14} />
                      Excluir
                    </button>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-[1.6rem] border border-dashed border-[#d7e3ec] bg-[#f7fafc] px-5 py-10 text-center dark:border-white/10 dark:bg-[#0f1621]">
              <p className="font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">Nenhuma experience encontrada</p>
              <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">
                Ajuste os filtros ou crie uma nova experience para alimentar este workspace.
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)] dark:text-slate-400">
              Biblioteca de formatos
            </p>
            <h3 className="mt-1 font-display text-[2rem] leading-none text-[var(--brand-ink)] dark:text-slate-100">
              Comece com um template mais intencional
            </h3>
          </div>
          <p className="max-w-xl text-sm text-[var(--brand-muted)] dark:text-slate-400">
            Cada formato abaixo prioriza um tipo de narrativa. A ideia aqui e acelerar o primeiro rascunho com uma base mais clara.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {templates.map((template, index) => {
            const Icon = template.icon

            return (
              <motion.article
                key={template.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                whileHover={{ y: -6 }}
                className="overflow-hidden rounded-[1.8rem] border border-white/65 bg-white/84 p-4 shadow-[0_14px_40px_-28px_rgba(16,35,63,0.42)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/78"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#edf5fb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:bg-white/5 dark:text-slate-300">
                    {template.eyebrow}
                  </span>
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[#eef4f8] text-[var(--brand-ink)] dark:bg-[#162133] dark:text-slate-100">
                    <Icon size={18} />
                  </div>
                </div>

                <div className="mt-4">
                  <TemplatePreview accent={template.accent} title={template.title} />
                </div>

                <h4 className="mt-5 font-display text-[1.75rem] leading-none text-[var(--brand-ink)] dark:text-slate-100">
                  {template.title}
                </h4>
                <p className="mt-2 text-sm font-medium text-[var(--brand-ink)]/75 dark:text-slate-300">
                  {template.subtitle}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--brand-muted)] dark:text-slate-400">
                  {template.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {template.chips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center gap-1 rounded-full bg-[#f4f8fb] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--brand-muted)] dark:bg-[#151d2b] dark:text-slate-300"
                    >
                      <CheckCircle2 size={11} />
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-1 gap-2">
                  <Button
                    className="h-11 w-full justify-center gap-2 text-xs uppercase tracking-[0.12em]"
                    onClick={() => navigate('/admin/experiences/new')}
                  >
                    Criar com este modelo
                    <ArrowUpRight size={14} />
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-10 w-full justify-center gap-2 text-xs uppercase tracking-[0.12em]"
                    onClick={() => navigate('/admin/analytics')}
                  >
                    Ver analises
                    <Sparkles size={13} />
                  </Button>
                </div>
              </motion.article>
            )
          })}
        </div>
      </section>
    </div>
  )
}
