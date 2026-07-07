import { useMemo, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Breadcrumb } from '../components/dashboard/Breadcrumb'
import { Header } from '../components/dashboard/Header'
import { Sidebar } from '../components/dashboard/Sidebar'

const routeTitles: Record<string, string> = {
  '/admin/dashboard': 'Painel',
  '/admin/experiences': 'Experiencias',
  '/admin/experiences/new': 'Construtor de Experiencias',
  '/admin/analytics': 'Analises',
  '/admin/settings': 'Configuracoes',
}

export function DashboardLayout() {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  const title = useMemo(() => routeTitles[location.pathname] ?? 'Painel', [location.pathname])

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_5%_0%,rgba(35,73,122,0.18),transparent_34%),radial-gradient(circle_at_100%_0%,rgba(15,118,110,0.12),transparent_38%),linear-gradient(180deg,#eef3f8_0%,#f6f8fb_45%,#fbfcfd_100%)] dark:bg-[radial-gradient(circle_at_5%_0%,rgba(59,130,246,0.2),transparent_34%),radial-gradient(circle_at_100%_0%,rgba(16,185,129,0.15),transparent_38%),linear-gradient(180deg,#070a10_0%,#090d15_45%,#0b1018_100%)]">
      <div className="flex min-h-screen">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((value) => !value)}
          mobileOpen={mobileOpen}
          onCloseMobile={() => setMobileOpen(false)}
        />

        <div className="flex min-h-screen flex-1 flex-col">
          <Header title={title} onToggleSidebar={() => setMobileOpen(true)} />
          <main className="flex-1 p-4 sm:p-6">
            <Breadcrumb />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
