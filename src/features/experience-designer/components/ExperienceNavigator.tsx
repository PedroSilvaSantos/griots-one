import { BookOpen, Boxes, ImageUp, Layers, Palette, UploadCloud } from 'lucide-react'
import { memo } from 'react'

type StudioLeftPanel = 'templates' | 'layers' | 'assets' | 'uploads' | 'themes' | 'library'

type NavigatorItem = {
  id: StudioLeftPanel
  label: string
  icon: typeof Boxes
}

type ExperienceNavigatorProps = {
  activePanel: StudioLeftPanel
  onSelectPanel: (panel: StudioLeftPanel) => void
}

const groupOne: NavigatorItem[] = [
  { id: 'templates', label: 'Templates', icon: Boxes },
  { id: 'assets', label: 'Assets', icon: ImageUp },
  { id: 'uploads', label: 'Uploads', icon: UploadCloud },
]

const groupTwo: NavigatorItem[] = [
  { id: 'themes', label: 'Temas', icon: Palette },
  { id: 'library', label: 'Library', icon: BookOpen },
  { id: 'layers', label: 'Layers', icon: Layers },
]

function ItemButton({
  item,
  active,
  onClick,
}: {
  item: NavigatorItem
  active: boolean
  onClick: () => void
}) {
  const Icon = item.icon

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
        active
          ? 'border-[var(--brand-ink)] bg-[#eef4f8] text-[var(--brand-ink)] shadow-[0_8px_20px_-16px_rgba(16,35,63,0.6)] dark:bg-[#182336] dark:text-slate-100'
          : 'border-[#d8e2ea] bg-white text-[var(--brand-muted)] hover:bg-[#f3f8fb] dark:border-white/10 dark:bg-[#0f1621] dark:text-slate-300 dark:hover:bg-[#192435]'
      }`}
    >
      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-lg border transition-colors ${active ? 'border-[var(--brand-ink)]/25 bg-white/70 dark:bg-[#0f1621]' : 'border-[#d8e2ea] bg-white dark:border-white/15 dark:bg-[#0d141f]'}`}>
        <Icon size={13} />
      </span>
      <span>{item.label}</span>
    </button>
  )
}

export const ExperienceNavigator = memo(function ExperienceNavigator({ activePanel, onSelectPanel }: ExperienceNavigatorProps) {
  return (
    <div className="space-y-3 rounded-xl border border-[#d8e2ea] bg-white/70 p-3 dark:border-white/10 dark:bg-[#0d141f]/70">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:text-slate-400">Experience Navigator</p>

      <div className="space-y-2">
        <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)] dark:text-slate-500">Grupo 1</p>
        <div className="grid grid-cols-1 gap-2">
          {groupOne.map((item) => (
            <ItemButton
              key={item.id}
              item={item}
              active={activePanel === item.id}
              onClick={() => onSelectPanel(item.id)}
            />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)] dark:text-slate-500">Grupo 2</p>
        <div className="grid grid-cols-1 gap-2">
          {groupTwo.map((item) => (
            <ItemButton
              key={item.id}
              item={item}
              active={activePanel === item.id}
              onClick={() => onSelectPanel(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
})

export type { StudioLeftPanel }
