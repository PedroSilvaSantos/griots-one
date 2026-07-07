import { Bell, Menu, Search } from 'lucide-react'

type HeaderProps = {
  title: string
  onToggleSidebar: () => void
}

export function Header({ title, onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/40 bg-white/70 px-4 py-3 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1018]/85 sm:px-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleSidebar}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu size={16} />
          </button>
          <h1 className="font-display text-3xl leading-none text-[var(--brand-ink)] dark:text-slate-100">{title}</h1>
        </div>

        <div className="flex items-center gap-3">
          <label className="relative w-full max-w-sm lg:w-80">
            <Search
              size={16}
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-[var(--brand-muted)] dark:text-slate-400"
            />
            <input
              type="search"
              placeholder="Pesquisar"
              className="h-10 w-full rounded-xl border border-[#d8e2ea] bg-white pl-9 pr-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
            />
          </label>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
            aria-label="Notificacoes"
          >
            <Bell size={16} />
          </button>

          <div className="flex items-center gap-2 rounded-xl border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#101622]">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-[#10233f] to-[#365f93] text-xs font-bold text-white">
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
    </header>
  )
}
