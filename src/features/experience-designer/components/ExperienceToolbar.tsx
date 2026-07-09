import {
  AlignCenter,
  AlignHorizontalJustifyCenter,
  AlignLeft,
  AlignRight,
  ArrowDownToLine,
  ArrowUpToLine,
  Copy,
  Eye,
  Grid3X3,
  Redo2,
  Trash2,
  Undo2,
} from 'lucide-react'
import { memo } from 'react'
import type { ReactNode } from 'react'
import { ZoomControl } from './ZoomControl'

type ExperienceToolbarProps = {
  canUndo: boolean
  canRedo: boolean
  selectedElementId: string
  zoom: number
  showGrid: boolean
  onUndo: () => void
  onRedo: () => void
  onDuplicate: () => void
  onDelete: () => void
  onAlign: (direction: 'left' | 'center' | 'right' | 'top' | 'middle' | 'bottom') => void
  onBringForward: () => void
  onSendBackward: () => void
  onToggleGrid: () => void
  onZoomIn: () => void
  onZoomOut: () => void
  onZoomReset: () => void
  onPreview: () => void
}

function IconButton({
  title,
  onClick,
  disabled,
  children,
}: {
  title: string
  onClick: () => void
  disabled?: boolean
  children: ReactNode
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d8e2ea] bg-white text-[var(--brand-muted)] transition-colors hover:bg-[#eef4f8] disabled:cursor-not-allowed disabled:opacity-40 dark:border-white/10 dark:bg-[#101622] dark:text-slate-300 dark:hover:bg-[#1a2331]"
    >
      {children}
    </button>
  )
}

export const ExperienceToolbar = memo(function ExperienceToolbar(props: ExperienceToolbarProps) {
  const {
    canUndo,
    canRedo,
    selectedElementId,
    zoom,
    showGrid,
    onUndo,
    onRedo,
    onDuplicate,
    onDelete,
    onAlign,
    onBringForward,
    onSendBackward,
    onToggleGrid,
    onZoomIn,
    onZoomOut,
    onZoomReset,
    onPreview,
  } = props

  const hasSelection = Boolean(selectedElementId)

  return (
    <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-[#d8e2ea] bg-white/95 p-2.5 shadow-[0_12px_28px_-24px_rgba(16,35,63,0.45)] dark:border-white/10 dark:bg-[#0f1621]/90">
      <div className="flex flex-wrap items-center gap-1">
        <IconButton title="Undo" onClick={onUndo} disabled={!canUndo}><Undo2 size={14} /></IconButton>
        <IconButton title="Redo" onClick={onRedo} disabled={!canRedo}><Redo2 size={14} /></IconButton>
        <IconButton title="Duplicar" onClick={onDuplicate} disabled={!hasSelection}><Copy size={14} /></IconButton>
        <IconButton title="Excluir" onClick={onDelete} disabled={!hasSelection}><Trash2 size={14} /></IconButton>
        <IconButton title="Alinhar esquerda" onClick={() => onAlign('left')} disabled={!hasSelection}><AlignLeft size={14} /></IconButton>
        <IconButton title="Alinhar centro" onClick={() => onAlign('center')} disabled={!hasSelection}><AlignCenter size={14} /></IconButton>
        <IconButton title="Alinhar direita" onClick={() => onAlign('right')} disabled={!hasSelection}><AlignRight size={14} /></IconButton>
        <IconButton title="Centralizar vertical" onClick={() => onAlign('middle')} disabled={!hasSelection}><AlignHorizontalJustifyCenter size={14} /></IconButton>
        <IconButton title="Trazer para frente" onClick={onBringForward} disabled={!hasSelection}><ArrowUpToLine size={14} /></IconButton>
        <IconButton title="Enviar para tras" onClick={onSendBackward} disabled={!hasSelection}><ArrowDownToLine size={14} /></IconButton>
        <IconButton title="Grid" onClick={onToggleGrid}><Grid3X3 size={14} className={showGrid ? 'text-[var(--brand-ink)] dark:text-slate-100' : ''} /></IconButton>
        <IconButton title="Preview" onClick={onPreview}><Eye size={14} /></IconButton>
      </div>

      <div className="flex items-center gap-2">
        <p className="hidden rounded-full border border-[#d8e2ea] bg-white px-2 py-1 text-[11px] font-semibold text-[var(--brand-muted)] dark:border-white/10 dark:bg-[#0f1621] dark:text-slate-400 xl:inline-flex">
          Selecionado: {selectedElementId ? selectedElementId : 'nenhum'}
        </p>
        <ZoomControl zoom={zoom} onZoomIn={onZoomIn} onZoomOut={onZoomOut} onZoomReset={onZoomReset} />
      </div>
    </div>
  )
})
