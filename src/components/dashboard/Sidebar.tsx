import { motion } from 'framer-motion'
import {
  BarChart3,
  BadgeCheck,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '../../services/cn'

type SidebarProps = {
  collapsed: boolean
  onToggle: () => void
  mobileOpen: boolean
  onCloseMobile: () => void
}

type Item = {
  label: string
  to?: string
  icon: typeof LayoutDashboard
}

const items: Item[] = [
  { label: 'Painel', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Experiencias', to: '/admin/experiences', icon: FolderKanban },
  { label: 'Analises', to: '/admin/analytics', icon: BarChart3 },
  { label: 'Configuracoes', to: '/admin/settings', icon: Settings },
  { label: 'Sair', to: '/', icon: LogOut },
]

function SidebarNav({ collapsed, onItemClick }: { collapsed: boolean; onItemClick?: () => void }) {
  const primaryItems = items.filter((item) => item.label !== 'Sair')
  const secondaryItems = items.filter((item) => item.label === 'Sair')

  return (
    <nav className="mt-8 flex h-[calc(100vh-14rem)] flex-col justify-between">
      <div className="space-y-6">
        {!collapsed ? (
          <div className="px-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--brand-muted)]/80 dark:text-slate-500">
              Navegacao
            </p>
          </div>
        ) : null}

        <div className="space-y-1.5">
          {primaryItems.map((item) => {
            const Icon = item.icon

            if (item.to) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  onClick={onItemClick}
                  className={({ isActive }) =>
                    cn(
                      'group relative flex h-12 items-center rounded-2xl px-3 text-sm font-medium transition-all',
                      collapsed ? 'justify-center px-0' : 'gap-3',
                      isActive
                        ? 'bg-[linear-gradient(135deg,#10233f,#17345f)] text-white shadow-[0_16px_28px_-22px_rgba(16,35,63,0.75)]'
                        : 'text-[var(--brand-muted)] hover:bg-white/85 hover:text-[var(--brand-ink)] dark:text-slate-400 dark:hover:bg-white/6 dark:hover:text-slate-200',
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span
                        className={cn(
                          'absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full transition-opacity',
                          isActive ? 'bg-[#6ee7b7] opacity-100' : 'opacity-0',
                        )}
                      />
                      <span
                        className={cn(
                          'grid h-9 w-9 place-items-center rounded-xl border transition-all',
                          isActive
                            ? 'border-white/10 bg-white/10 text-white'
                            : 'border-[#d8e2ea] bg-white text-[var(--brand-ink)] group-hover:border-[#c9d8e5] dark:border-white/10 dark:bg-[#0f1621] dark:text-slate-200',
                        )}
                      >
                        <Icon size={17} />
                      </span>
                      {!collapsed ? <span className="truncate">{item.label}</span> : null}
                    </>
                  )}
                </NavLink>
              )
            }

            return null
          })}
        </div>
      </div>

      <div className="space-y-3">
        {!collapsed ? (
          <div className="rounded-[1.4rem] border border-[#d8e2ea] bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(241,246,250,0.88))] p-3 shadow-[0_16px_36px_-28px_rgba(16,35,63,0.35)] dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(17,24,39,0.96),rgba(9,14,24,0.9))]">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[linear-gradient(135deg,#0f766e,#2563eb)] text-white shadow-[0_10px_24px_-18px_rgba(37,99,235,0.8)]">
                <Sparkles size={17} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--brand-ink)] dark:text-slate-100">Studio ativo</p>
                <p className="mt-1 text-xs leading-5 text-[var(--brand-muted)] dark:text-slate-400">
                  Gerencie publicacoes, rascunhos e analises em um unico fluxo.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="grid h-10 w-10 place-items-center rounded-2xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] shadow-[0_12px_24px_-18px_rgba(16,35,63,0.4)] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100">
              <Sparkles size={16} />
            </div>
          </div>
        )}

        <div className="space-y-1.5">
          {secondaryItems.map((item) => {
            const Icon = item.icon

            if (!item.to) return null

            return (
              <NavLink
                key={item.label}
                to={item.to}
                onClick={onItemClick}
                className={cn(
                  'group flex h-12 items-center rounded-2xl text-sm font-medium transition-all',
                  collapsed ? 'justify-center px-0' : 'gap-3 px-3',
                  'text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-300 dark:hover:bg-rose-500/10',
                )}
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl border border-rose-200 bg-white text-rose-600 transition-all group-hover:border-rose-300 dark:border-rose-500/25 dark:bg-[#101622] dark:text-rose-300">
                  <Icon size={17} />
                </span>
                {!collapsed ? <span>{item.label}</span> : null}
              </NavLink>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 96 : 288 }}
        transition={{ duration: 0.25 }}
        className="sticky top-0 hidden h-screen border-r border-white/45 bg-[linear-gradient(180deg,rgba(255,255,255,0.74),rgba(244,248,251,0.82))] p-4 shadow-[inset_-1px_0_0_rgba(255,255,255,0.35)] backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(11,16,24,0.92),rgba(8,12,20,0.96))] lg:block"
      >
        <div className={cn('rounded-[1.7rem] border border-white/65 bg-white/72 p-3 shadow-[0_18px_38px_-30px_rgba(16,35,63,0.4)] backdrop-blur-sm dark:border-white/10 dark:bg-white/4', collapsed && 'px-2')}>
          <div className={cn('flex items-center justify-between gap-3', collapsed && 'justify-center')}>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#10233f,#2563eb)] text-white shadow-[0_14px_26px_-20px_rgba(37,99,235,0.75)]">
              <BadgeCheck size={20} />
            </div>

            {!collapsed ? (
              <div className="min-w-0 flex-1">
                <p className="font-display text-xl font-semibold leading-none text-[var(--brand-ink)] dark:text-slate-100">
                  Griots One
                </p>
                <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)] dark:text-slate-400">
                  Control center
                </p>
              </div>
            ) : null}

            {!collapsed ? (
              <button
                type="button"
                onClick={onToggle}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#162133]"
                aria-label="Alternar menu"
              >
                <Menu size={16} />
              </button>
            ) : null}
          </div>

          {!collapsed ? (
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[#d7e2eb] bg-[#f7fafc] px-3 py-2 dark:border-white/10 dark:bg-[#101723]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:text-slate-400">
                Workspace sincronizado
              </span>
            </div>
          ) : (
            <button
              type="button"
              onClick={onToggle}
              className="mt-3 inline-flex h-10 w-full items-center justify-center rounded-2xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#162133]"
              aria-label="Expandir menu"
            >
              <Menu size={16} />
            </button>
          )}
        </div>

        <SidebarNav collapsed={collapsed} />
      </motion.aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/45 backdrop-blur-[2px] lg:hidden" onClick={onCloseMobile}>
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.24 }}
            className="h-screen w-[288px] border-r border-white/40 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,248,251,0.95))] p-4 backdrop-blur-xl dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(11,16,24,0.98),rgba(7,10,16,0.98))]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="rounded-[1.7rem] border border-white/65 bg-white/78 p-3 shadow-[0_18px_38px_-30px_rgba(16,35,63,0.4)] backdrop-blur-sm dark:border-white/10 dark:bg-white/4">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[linear-gradient(135deg,#10233f,#2563eb)] text-white shadow-[0_14px_26px_-20px_rgba(37,99,235,0.75)]">
                    <BadgeCheck size={20} />
                  </div>
                  <div>
                    <p className="font-display text-xl font-semibold text-[var(--brand-ink)] dark:text-slate-100">
                      Griots One
                    </p>
                    <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)] dark:text-slate-400">
                      Control center
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onCloseMobile}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
                  aria-label="Fechar menu"
                >
                  <Menu size={16} />
                </button>
              </div>

              <div className="mt-3 flex items-center gap-2 rounded-2xl border border-[#d7e2eb] bg-[#f7fafc] px-3 py-2 dark:border-white/10 dark:bg-[#101723]">
                <span className="h-2.5 w-2.5 rounded-full bg-[#10b981]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:text-slate-400">
                  Workspace sincronizado
                </span>
              </div>
            </div>

            <SidebarNav collapsed={false} onItemClick={onCloseMobile} />
          </motion.aside>
        </div>
      ) : null}
    </>
  )
}
