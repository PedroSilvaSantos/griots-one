import { memo } from 'react'
import type { ReactNode } from 'react'

type CanvasViewportProps = {
  zoom: number
  showGrid: boolean
  children: ReactNode
}

export const CanvasViewport = memo(function CanvasViewport({ zoom, showGrid, children }: CanvasViewportProps) {
  return (
    <div className="relative overflow-auto rounded-2xl border border-[#d8e2ea] bg-[#e9eef3] p-6 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.55)] dark:border-white/10 dark:bg-[#0d131d]">
      <div className="grid min-h-[70vh] place-items-center">
        <div
          className={`relative rounded-2xl p-4 transition-transform duration-150 ${showGrid ? 'bg-[linear-gradient(to_right,rgba(16,35,63,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,35,63,0.08)_1px,transparent_1px)] bg-[size:20px_20px]' : ''}`}
          style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
        >
          {children}
        </div>
      </div>
    </div>
  )
})
