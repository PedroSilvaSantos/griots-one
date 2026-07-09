import { Eye, Image as ImageIcon, Loader2, Save, Send } from 'lucide-react'
import { memo } from 'react'
import { Button } from '../../../components/layout/Button'

type ExperienceHeaderProps = {
  templateName: string
  experienceName: string
  status: 'draft' | 'published'
  isSaved: boolean
  saving: boolean
  rendering: boolean
  onSaveDraft: () => void
  onPublish: () => void
  onGeneratePng: () => void
  onPreview: () => void
}

export const ExperienceHeader = memo(function ExperienceHeader(props: ExperienceHeaderProps) {
  const {
    templateName,
    experienceName,
    status,
    isSaved,
    saving,
    rendering,
    onSaveDraft,
    onPublish,
    onGeneratePng,
    onPreview,
  } = props

  return (
    <header className="rounded-2xl border border-[#d8e2ea] bg-white px-4 py-3 shadow-[0_14px_34px_-26px_rgba(16,35,63,0.45)] dark:border-white/10 dark:bg-[#101622]">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--brand-muted)] dark:text-slate-400">Griots Experience Studio</p>
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <h2 className="truncate font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">{experienceName || 'Nova Experience'}</h2>
            <span className="inline-flex items-center rounded-full bg-[#eef4f8] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-[var(--brand-ink)] dark:bg-[#1a2331] dark:text-slate-200">Template: {templateName}</span>
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${status === 'published' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300' : 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300'}`}>{status === 'published' ? 'Publicado' : 'Rascunho'}</span>
            <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] ${isSaved ? 'bg-sky-100 text-sky-700 dark:bg-sky-500/20 dark:text-sky-300' : 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-300'}`}>{isSaved ? 'Experience salva' : 'Experience nao salva'}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="secondary" className="h-10 gap-2 text-xs uppercase tracking-[0.1em]" onClick={onSaveDraft} disabled={saving}>
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
            Salvar
          </Button>
          <Button className="h-10 gap-2 text-xs uppercase tracking-[0.1em]" onClick={onPublish} disabled={saving}>
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Send size={13} />}
            Publicar
          </Button>
          <Button variant="secondary" className="h-10 gap-2 text-xs uppercase tracking-[0.1em]" onClick={onGeneratePng} disabled={rendering}>
            {rendering ? <Loader2 size={13} className="animate-spin" /> : <ImageIcon size={13} />}
            Gerar PNG
          </Button>
          <Button variant="ghost" className="h-10 gap-2 text-xs uppercase tracking-[0.1em]" onClick={onPreview}>
            <Eye size={13} />
            Preview
          </Button>
        </div>
      </div>
    </header>
  )
})
