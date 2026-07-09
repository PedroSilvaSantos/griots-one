import {
  ArrowDown,
  ArrowUp,
  Eye,
  EyeOff,
  Hash,
  Image,
  Layers3,
  PenSquare,
  RectangleHorizontal,
  Type,
} from 'lucide-react'
import { memo } from 'react'
import type { DesignerTemplateElement } from '../types/designer'

type LayerItemProps = {
  element: DesignerTemplateElement
  selected: boolean
  onSelect: (elementId: string) => void
  onToggleVisibility: (elementId: string) => void
  onMoveUp: (elementId: string) => void
  onMoveDown: (elementId: string) => void
}

export const LayerItem = memo(function LayerItem({ element, selected, onSelect, onToggleVisibility, onMoveUp, onMoveDown }: LayerItemProps) {
  const Icon = element.type === 'image' || element.type === 'mainPhoto' || element.type === 'candidatePhoto'
    ? Image
    : element.type === 'number'
      ? Hash
      : element.type === 'logo'
        ? PenSquare
        : element.type === 'hashtag'
          ? Hash
          : element.type === 'shape' || element.type === 'rectangle' || element.type === 'line'
            ? RectangleHorizontal
            : element.type === 'footer' || element.type === 'header' || element.type === 'text'
              ? Type
              : Layers3

  return (
    <div className={`rounded-xl border px-2.5 py-2 transition-all ${selected ? 'border-[var(--brand-ink)] bg-[#eef4f8] shadow-[0_10px_24px_-20px_rgba(16,35,63,0.6)] dark:bg-[#162133]' : 'border-[#d8e2ea] bg-white hover:bg-[#f3f8fb] dark:border-white/10 dark:bg-[#0f1621] dark:hover:bg-[#172131]'}`}>
      <div className="flex items-center justify-between gap-2">
        <button type="button" onClick={() => onSelect(element.id)} className="min-w-0 flex-1 text-left">
          <p className="flex items-center gap-1.5 truncate text-xs font-semibold text-[var(--brand-ink)] dark:text-slate-100">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-[#d8e2ea] bg-white dark:border-white/15 dark:bg-[#0b121d]">
              <Icon size={11} />
            </span>
            <span className="truncate">{element.name}</span>
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.08em] text-[var(--brand-muted)] dark:text-slate-400">
            {element.type} | pos {element.x.toFixed(2)},{element.y.toFixed(2)} | ordem {element.zIndex}
          </p>
        </button>

        <div className="flex items-center gap-1">
          <button type="button" onClick={() => onToggleVisibility(element.id)} className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--brand-muted)] hover:bg-[#eef4f8] dark:hover:bg-[#1a2331]">
            {element.visible ? <Eye size={12} /> : <EyeOff size={12} />}
          </button>
          <button type="button" onClick={() => onMoveUp(element.id)} className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--brand-muted)] hover:bg-[#eef4f8] dark:hover:bg-[#1a2331]">
            <ArrowUp size={12} />
          </button>
          <button type="button" onClick={() => onMoveDown(element.id)} className="inline-flex h-6 w-6 items-center justify-center rounded-full text-[var(--brand-muted)] hover:bg-[#eef4f8] dark:hover:bg-[#1a2331]">
            <ArrowDown size={12} />
          </button>
        </div>
      </div>
    </div>
  )
})
