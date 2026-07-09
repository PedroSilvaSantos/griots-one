import { Minus, Plus, Search } from 'lucide-react'
import { memo } from 'react'

type ZoomControlProps = {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomReset: () => void
}

export const ZoomControl = memo(function ZoomControl({ zoom, onZoomIn, onZoomOut, onZoomReset }: ZoomControlProps) {
  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-[#d8e2ea] bg-white px-1 py-1 dark:border-white/10 dark:bg-[#0f1621]">
      <button type="button" onClick={onZoomOut} className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--brand-muted)] hover:bg-[#eef4f8] dark:hover:bg-[#1a2331]">
        <Minus size={14} />
      </button>
      <button type="button" onClick={onZoomReset} className="inline-flex min-w-14 items-center justify-center gap-1 rounded-full px-2 text-xs font-semibold text-[var(--brand-ink)] dark:text-slate-100">
        <Search size={12} />
        {Math.round(zoom * 100)}%
      </button>
      <button type="button" onClick={onZoomIn} className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[var(--brand-muted)] hover:bg-[#eef4f8] dark:hover:bg-[#1a2331]">
        <Plus size={14} />
      </button>
    </div>
  )
})
