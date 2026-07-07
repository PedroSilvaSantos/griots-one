import { motion } from 'framer-motion'
import {
  BarChart3,
  FileImage,
  FolderKanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Sparkles,
  UserCircle,
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
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Campaigns', to: '/admin/campaigns', icon: FolderKanban },
  { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
  { label: 'Templates', icon: Sparkles },
  { label: 'Media', icon: FileImage },
  { label: 'Settings', to: '/admin/settings', icon: Settings },
  { label: 'Profile', icon: UserCircle },
  { label: 'Logout', icon: LogOut },
]

function SidebarNav({ collapsed, onItemClick }: { collapsed: boolean; onItemClick?: () => void }) {
  return (
    <nav className="mt-7 space-y-2">
      {items.map((item) => {
        const Icon = item.icon

        if (item.to) {
          return (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={onItemClick}
              className={({ isActive }) =>
                cn(
                  'flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-[var(--brand-ink)] text-white dark:bg-slate-100 dark:text-slate-900'
                    : 'text-[var(--brand-muted)] hover:bg-white hover:text-[var(--brand-ink)] dark:text-slate-400 dark:hover:bg-[#151e2b] dark:hover:text-slate-200',
                )
              }
            >
              <Icon size={18} />
              {!collapsed ? <span>{item.label}</span> : null}
            </NavLink>
          )
        }

        return (
          <button
            type="button"
            key={item.label}
            onClick={onItemClick}
            className="flex h-11 w-full items-center gap-3 rounded-xl px-3 text-sm font-medium text-[var(--brand-muted)] transition-colors hover:bg-white hover:text-[var(--brand-ink)] dark:text-slate-400 dark:hover:bg-[#151e2b] dark:hover:text-slate-200"
          >
            <Icon size={18} />
            {!collapsed ? <span>{item.label}</span> : null}
          </button>
        )
      })}
    </nav>
  )
}

export function Sidebar({ collapsed, onToggle, mobileOpen, onCloseMobile }: SidebarProps) {
  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 88 : 264 }}
        transition={{ duration: 0.25 }}
        className="sticky top-0 hidden h-screen border-r border-white/40 bg-white/70 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1018]/85 lg:block"
      >
        <div className="flex items-center justify-between">
          <span
            className={cn(
              'font-display text-xl font-semibold text-[var(--brand-ink)] dark:text-slate-100',
              collapsed && 'sr-only',
            )}
          >
            Griots One
          </span>
          <button
            type="button"
            onClick={onToggle}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
            aria-label="Alternar menu"
          >
            <Menu size={16} />
          </button>
        </div>

        <SidebarNav collapsed={collapsed} />
      </motion.aside>

      {mobileOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/35 backdrop-blur-[1px] lg:hidden" onClick={onCloseMobile}>
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.24 }}
            className="h-screen w-[272px] border-r border-white/40 bg-white/95 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-[#0b1018]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-semibold text-[var(--brand-ink)] dark:text-slate-100">
                Griots One
              </span>
              <button
                type="button"
                onClick={onCloseMobile}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#d8e2ea] bg-white text-[var(--brand-ink)] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
                aria-label="Fechar menu"
              >
                <Menu size={16} />
              </button>
            </div>

            <SidebarNav collapsed={false} onItemClick={onCloseMobile} />
          </motion.aside>
        </div>
      ) : null}
    </>
  )
}
