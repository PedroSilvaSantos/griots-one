import { useMemo, useRef } from 'react'
import { ExperienceRenderer } from '../../../features/experience-template-engine/components/ExperienceRenderer'
import { templateManager } from '../../../features/experience-template-engine/services/templateManager'
import type { Experience } from '../types/experience'

type ExperiencePreviewProps = {
  experience: Experience
}

export function ExperiencePreview({ experience }: ExperiencePreviewProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const template = useMemo(() => templateManager.get(experience.template.id), [experience.template.id])

  return (
    <section className="overflow-hidden rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:text-slate-400">Preview da Experience</p>
          <h2 className="mt-1 font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">{experience.name || 'Experience sem nome'}</h2>
        </div>
        <span className="rounded-full bg-[#eef4f8] px-3 py-1 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--brand-ink)] dark:bg-[#0f1621] dark:text-slate-100">
          {template.name}
        </span>
      </div>

      <ExperienceRenderer canvasRef={canvasRef} experience={experience} />
    </section>
  )
}
