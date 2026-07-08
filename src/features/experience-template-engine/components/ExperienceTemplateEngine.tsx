import { Download, ImageUp, Layers3 } from 'lucide-react'
import { useRef } from 'react'
import { Button } from '../../../components/layout/Button'
import { ExperienceRenderer } from './ExperienceRenderer'
import { useExperienceTemplateEngine } from '../hooks/useExperienceTemplateEngine'
import { DEFAULT_CANVAS_PRESET } from '../experience-engine/core/canvas-presets'
import type { Experience } from '../../experience/types/experience'
import { templateManager } from '../services/templateManager'

type ExperienceTemplateEngineProps = {
  experience: Experience
  onUploadImage: (file: File) => Promise<void>
}

export function ExperienceTemplateEngine({ experience, onUploadImage }: ExperienceTemplateEngineProps) {
  const template = templateManager.get(experience.template.id)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const {
    error,
    warning,
    rendering,
    downloadUrl,
    downloadFileName,
    canvasRef,
    generateImage,
  } = useExperienceTemplateEngine(experience)

  return (
    <section className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75 sm:p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <h2 className="font-display text-3xl text-[var(--brand-ink)] dark:text-slate-100">Experience Template Engine</h2>
          <p className="max-w-2xl text-sm text-[var(--brand-muted)] dark:text-slate-400">
            O mesmo renderer alimenta a prévia e a exportação final em PNG de alta resolução.
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="space-y-4 rounded-2xl border border-[#d8e2ea] bg-white p-4 dark:border-white/10 dark:bg-[#101622] sm:p-5">
          <div className="rounded-2xl bg-[linear-gradient(135deg,rgba(16,35,63,0.08),rgba(15,118,110,0.08))] p-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:text-slate-400">Template ativo</p>
                <p className="mt-1 font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">{template.name}</p>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--brand-ink)] shadow-sm dark:bg-[#0f1621] dark:text-slate-100">
                <Layers3 size={14} />
                Experience
              </div>
            </div>
            <p className="mt-3 text-sm text-[var(--brand-muted)] dark:text-slate-400">{experience.name || 'Sem nome definido ainda'}</p>
          </div>

          <div className="space-y-2 rounded-2xl border border-dashed border-[#d8e2ea] p-4 dark:border-white/10">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:text-slate-400">Fonte de dados</p>
            <p className="text-sm text-[var(--brand-ink)] dark:text-slate-100">Experience atual do editor</p>
            <p className="text-xs text-[var(--brand-muted)] dark:text-slate-400">A pré-visualização é renderizada pelo mesmo motor do PNG final.</p>
          </div>

          <div className="space-y-3 rounded-2xl border border-[#d8e2ea] bg-[#f8fbfd] p-4 dark:border-white/10 dark:bg-[#0d131d]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:text-slate-400">Upload da imagem</p>
              <p className="mt-1 text-sm text-[var(--brand-ink)] dark:text-slate-100">
                Envie a foto que será usada no template e no PNG final.
              </p>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={async (event) => {
                const file = event.target.files?.[0]
                if (!file) return

                await onUploadImage(file)
                event.target.value = ''
              }}
            />

            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                className="h-11 gap-2 text-xs uppercase tracking-[0.1em]"
                onClick={() => fileInputRef.current?.click()}
              >
                <ImageUp size={14} />
                Upload da imagem
              </Button>

              <p className="flex items-center text-xs text-[var(--brand-muted)] dark:text-slate-400">
                {experience.brand.candidatePhoto ? 'Imagem já vinculada ao template' : 'Nenhuma imagem enviada ainda'}
              </p>
            </div>
          </div>

          {error ? (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
              {error}
            </div>
          ) : null}

          {warning ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-500/30 dark:bg-amber-500/10 dark:text-amber-200">
              {warning}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-3">
            <Button
              className="h-11 gap-2 text-xs uppercase tracking-[0.1em]"
              onClick={() => void generateImage({ preset: DEFAULT_CANVAS_PRESET })}
              disabled={rendering}
            >
              <Download size={14} />
              {rendering ? 'Gerando...' : 'Gerar Imagem'}
            </Button>

            {downloadUrl ? (
              <a
                href={downloadUrl}
                download={downloadFileName}
                className="inline-flex h-11 items-center justify-center rounded-full border border-[#d8e2ea] bg-white px-4 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#151e2b]"
              >
                Baixar PNG
              </a>
            ) : null}
          </div>
        </div>

        <div className="space-y-4">
          <ExperienceRenderer canvasRef={canvasRef} experience={experience} preset={DEFAULT_CANVAS_PRESET} />

          <div className="rounded-2xl border border-[#d8e2ea] bg-white p-4 dark:border-white/10 dark:bg-[#101622]">
            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:text-slate-400">Como funciona</p>
            <p className="mt-2 text-sm leading-relaxed text-[var(--brand-ink)] dark:text-slate-200">
              Quando qualquer campo da Experience é alterado, o canvas é atualizado. Ao clicar em Gerar Imagem, o mesmo renderer é executado em resolução maior e disponibiliza o download em PNG.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
