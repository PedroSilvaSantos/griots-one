import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

const labels: Record<string, string> = {
  admin: 'Painel',
  dashboard: 'Painel',
  experiences: 'Experiencias',
  new: 'Nova',
  edit: 'Editar',
  analytics: 'Analises',
  settings: 'Configuracoes',
}

export function Breadcrumb() {
  const location = useLocation()

  const parts = useMemo(() => {
    const chunks = location.pathname.split('/').filter(Boolean)
    if (!chunks.length || chunks[0] !== 'admin') return []

    const leaf = chunks[1]
    const root = labels.admin

    if (!leaf || leaf === 'dashboard') return [root]

    if (leaf === 'experiences' && chunks.length >= 3) {
      const tail = chunks[2] === 'new' ? labels.new : labels.edit
      return [root, labels.experiences, tail]
    }

    return [root, labels[leaf] ?? leaf]
  }, [location.pathname])

  if (!parts.length) return null

  return (
    <nav aria-label="Breadcrumb" className="mb-5 px-1">
      <ol className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)] dark:text-slate-400">
        {parts.map((part, index) => (
          <li key={`${part}-${index}`} className="flex items-center gap-2">
            {index > 0 ? <span className="h-1 w-1 rounded-full bg-current opacity-45" /> : null}
            <span className={index === parts.length - 1 ? 'text-[var(--brand-ink)] dark:text-slate-200' : ''}>
              {part}
            </span>
          </li>
        ))}
      </ol>
    </nav>
  )
}
