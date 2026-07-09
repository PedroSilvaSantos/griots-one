import { memo } from 'react'
import type { DesignerTemplateElement, DesignerTemplateElementPatch } from '../types/designer'
import { PropertyPanel } from './PropertyPanel'

type ExperienceInspectorProps = {
  selectedElement: DesignerTemplateElement | null
  onPatchElement: (patch: DesignerTemplateElementPatch) => void
}

export const ExperienceInspector = memo(function ExperienceInspector({ selectedElement, onPatchElement }: ExperienceInspectorProps) {
  if (!selectedElement) {
    return (
      <div className="rounded-xl border border-dashed border-[#d8e2ea] p-3 text-xs text-[var(--brand-muted)] dark:border-white/10 dark:text-slate-400">
        Selecione um elemento para editar propriedades no Inspector.
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[#d8e2ea] bg-white p-3 shadow-[0_12px_30px_-24px_rgba(16,35,63,0.38)] dark:border-white/10 dark:bg-[#0f1621]">
      <div className="mb-3 border-b border-[#e3ebf2] pb-2 dark:border-white/10">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:text-slate-400">Inspector</p>
        <p className="mt-1 text-[11px] text-[var(--brand-muted)] dark:text-slate-500">Painel de propriedades do elemento selecionado</p>
      </div>
      <PropertyPanel element={selectedElement} onPatch={onPatchElement} />
    </div>
  )
})
