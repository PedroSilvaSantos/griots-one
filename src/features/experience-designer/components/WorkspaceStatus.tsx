import { Clock3, Layers3, Palette, Sparkles, ZoomIn } from 'lucide-react'
import { memo } from 'react'

type WorkspaceStatusProps = {
  templateName: string
  themeName: string
  canvas: { width: number; height: number }
  zoom: number
  status: 'draft' | 'published'
  isSaved: boolean
  lastChangeLabel: string
}

function StatusPill({ label, tone }: { label: string; tone: 'ok' | 'warn' | 'info' }) {
  const toneClass = tone === 'ok'
    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
    : tone === 'warn'
      ? 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'
      : 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300'

  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${toneClass}`}>{label}</span>
}

export const WorkspaceStatus = memo(function WorkspaceStatus(props: WorkspaceStatusProps) {
  const {
    templateName,
    themeName,
    canvas,
    zoom,
    status,
    isSaved,
    lastChangeLabel,
  } = props

  return (
    <div className="space-y-3 rounded-xl border border-[#d8e2ea] bg-white/70 p-3 dark:border-white/10 dark:bg-[#0d141f]/70">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:text-slate-400">Workspace</p>

      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="rounded-lg border border-[#d8e2ea] bg-white px-2 py-2 dark:border-white/10 dark:bg-[#0f1621]">
          <p className="flex items-center gap-1 text-[var(--brand-muted)] dark:text-slate-400"><Layers3 size={12} /> Template</p>
          <p className="mt-1 font-semibold text-[var(--brand-ink)] dark:text-slate-100">{templateName}</p>
        </div>
        <div className="rounded-lg border border-[#d8e2ea] bg-white px-2 py-2 dark:border-white/10 dark:bg-[#0f1621]">
          <p className="flex items-center gap-1 text-[var(--brand-muted)] dark:text-slate-400"><Palette size={12} /> Tema</p>
          <p className="mt-1 font-semibold text-[var(--brand-ink)] dark:text-slate-100">{themeName}</p>
        </div>
        <div className="rounded-lg border border-[#d8e2ea] bg-white px-2 py-2 dark:border-white/10 dark:bg-[#0f1621]">
          <p className="flex items-center gap-1 text-[var(--brand-muted)] dark:text-slate-400"><Sparkles size={12} /> Canvas</p>
          <p className="mt-1 font-semibold text-[var(--brand-ink)] dark:text-slate-100">{canvas.width}x{canvas.height}</p>
        </div>
        <div className="rounded-lg border border-[#d8e2ea] bg-white px-2 py-2 dark:border-white/10 dark:bg-[#0f1621]">
          <p className="flex items-center gap-1 text-[var(--brand-muted)] dark:text-slate-400"><ZoomIn size={12} /> Zoom</p>
          <p className="mt-1 font-semibold text-[var(--brand-ink)] dark:text-slate-100">{Math.round(zoom * 100)}%</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <StatusPill label={status === 'published' ? 'Publicada' : 'Rascunho'} tone={status === 'published' ? 'ok' : 'warn'} />
        <StatusPill label={isSaved ? 'Experience salva' : 'Experience nao salva'} tone={isSaved ? 'ok' : 'info'} />
      </div>

      <p className="flex items-center gap-1 text-[11px] text-[var(--brand-muted)] dark:text-slate-400"><Clock3 size={12} /> Ultima alteracao: {lastChangeLabel}</p>
    </div>
  )
})
