import { memo } from 'react'
import type { DesignerRegion } from '../types/designer'
import { LayerItem } from './LayerItem'

type ExperienceLayersProps = {
  regions: DesignerRegion[]
  selectedElementId: string
  onSelectElement: (elementId: string) => void
  onToggleVisibility: (elementId: string) => void
  onMoveLayer: (elementId: string, direction: 'up' | 'down') => void
}

export const ExperienceLayers = memo(function ExperienceLayers({
  regions,
  selectedElementId,
  onSelectElement,
  onToggleVisibility,
  onMoveLayer,
}: ExperienceLayersProps) {
  return (
    <div className="space-y-3">
      {regions
        .filter((region) => region.enabled)
        .sort((a, b) => a.order - b.order)
        .map((region) => (
          <section key={region.id} className="space-y-2 rounded-xl border border-[#d8e2ea] bg-white/60 p-2 dark:border-white/10 dark:bg-[#0d141f]/60">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[var(--brand-muted)] dark:text-slate-400">
              {region.name}
            </p>

            <div className="space-y-2">
              {[...region.elements]
                .sort((a, b) => b.zIndex - a.zIndex)
                .map((element) => (
                  <LayerItem
                    key={element.id}
                    element={element}
                    selected={selectedElementId === element.id}
                    onSelect={onSelectElement}
                    onToggleVisibility={onToggleVisibility}
                    onMoveUp={(id) => onMoveLayer(id, 'up')}
                    onMoveDown={(id) => onMoveLayer(id, 'down')}
                  />
                ))}
            </div>
          </section>
        ))}
    </div>
  )
})
