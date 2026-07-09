import { Bell, Menu, Search, Sparkles } from 'lucide-react'

type HeaderProps = {
  title: string
  onToggleSidebar: () => void
}

const pageMeta: Record<string, { eyebrow: string; description: string }> = {
  Painel: {
    eyebrow: 'Visao geral',
    description: 'Acompanhe performance, atividade recente e pontos de atencao do workspace.',
  },
  Experiencias: {
    eyebrow: 'Workspace editorial',
    description: 'Organize rascunhos, publicacoes e modelos sem perder contexto de distribuicao.',
  },
  'Construtor de Experiencias': {
    eyebrow: 'Editor visual',
    description: 'Monte layouts, assets e narrativa de campanha em um fluxo unico.',
  },
  Analises: {
    eyebrow: 'Leitura executiva',
    description: 'Compare resultados e identifique o que vale repetir, ajustar ou descartar.',
  },
  Configuracoes: {
    eyebrow: 'Governanca',
    description: 'Centralize preferencias, identidade visual e operacao da conta.',
  },
}

export function Header({ title, onToggleSidebar }: HeaderProps) {
  const meta = pageMeta[title] ?? pageMeta.Painel

  return (
    <header className="sticky top-0 z-20 border-b border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.72),rgba(246,249,251,0.7))] px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(11,16,24,0.88),rgba(9,14,22,0.82))] sm:px-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] shadow-[0_12px_24px_-20px_rgba(16,35,63,0.45)] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={16} />
          </button>

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8e2ea] bg-white/75 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)] dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
              <Sparkles size={12} />
              {meta.eyebrow}
            </div>
            <h1 className="mt-3 font-display text-3xl leading-none text-[var(--brand-ink)] dark:text-slate-100 sm:text-[2.2rem]">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-[var(--brand-muted)] dark:text-slate-400">
              {meta.description}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 lg:items-end">
          <label className="relative w-full max-w-sm lg:w-[21rem]">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--brand-muted)] dark:text-slate-400"
            />
            <input
              type="search"
              placeholder="Pesquisar no painel"
              className="h-11 w-full rounded-2xl border border-[#d8e2ea] bg-white pl-10 pr-16 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-[#f3f7fb] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:bg-white/5 dark:text-slate-400 lg:inline-flex">
              Buscar
            </span>
          </label>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] shadow-[0_12px_24px_-20px_rgba(16,35,63,0.45)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#162133]"
              aria-label="Notificacoes"
            >
              <span className="absolute right-3 top-3 h-2.5 w-2.5 rounded-full bg-[#ef4444] ring-2 ring-white dark:ring-[#101622]" />
              <Bell size={16} />
            </button>

            <div className="flex items-center gap-3 rounded-[1.2rem] border border-[#d8e2ea] bg-[linear-gradient(180deg,#ffffff,#f5f8fb)] px-2.5 py-2 shadow-[0_14px_28px_-22px_rgba(16,35,63,0.42)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(16,22,34,0.98),rgba(12,18,28,0.96))]">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-[#10233f] to-[#365f93] text-xs font-bold text-white shadow-[0_10px_20px_-16px_rgba(37,99,235,0.8)]">
                PS
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-semibold text-[var(--brand-ink)] dark:text-slate-100">Pedro Silva</p>
                <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:text-slate-400">
                  Fundador
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
