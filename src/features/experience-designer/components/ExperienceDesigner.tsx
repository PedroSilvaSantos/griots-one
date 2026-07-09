import { useMemo, useState, type RefObject } from 'react'
import type { Experience } from '../../experience/types/experience'
import type { CanvasPresetId } from '../../experience-template-engine/experience-engine/core/canvas-presets'
import type { DesignerTemplateElementPatch } from '../types/designer'
import { useExperienceDesigner } from '../hooks/useExperienceDesigner'
import { ExperienceAssets } from './ExperienceAssets'
import { ExperienceCanvas } from './ExperienceCanvas'
import { CanvasViewport } from './CanvasViewport'
import { ExperienceHeader } from './ExperienceHeader'
import { ExperienceInspector } from './ExperienceInspector'
import { ExperienceLayers } from './ExperienceLayers'
import { ExperienceNavigator, type StudioLeftPanel } from './ExperienceNavigator'
import { ExperienceToolbar } from './ExperienceToolbar'
import { WorkspaceStatus } from './WorkspaceStatus'
import { studioTokens } from './studio.tokens'

type ExperienceDesignerProps = {
  experience: Experience
  canvasRef: RefObject<HTMLCanvasElement | null>
  preset: CanvasPresetId
  isSaved: boolean
  saving: boolean
  rendering: boolean
  onSaveDraft: () => void
  onPublish: () => void
  onGeneratePng: () => void
  onPreview: () => void
  onUploadImage: (file: File) => Promise<void>
}

function parseNumber(value: string, fallback: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function ExperienceDesigner(props: ExperienceDesignerProps) {
  const {
    experience,
    canvasRef,
    preset,
    isSaved,
    saving,
    rendering,
    onSaveDraft,
    onPublish,
    onGeneratePng,
    onPreview,
    onUploadImage,
  } = props

  const {
    model,
    selectedElement,
    selectedElementId,
    savingTemplate,
    renderVersion,
    canUndo,
    canRedo,
    hasUnsavedChanges,
    setSelectedElementId,
    setTemplateName,
    setCanvas,
    setTheme,
    setRegionEnabled,
    updateElement,
    addElement,
    duplicateElement,
    removeElement,
    moveLayer,
    toggleLayerVisibility,
    alignSelected,
    undo,
    redo,
    saveTemplate,
  } = useExperienceDesigner(experience)

  const [activePanel, setActivePanel] = useState<StudioLeftPanel>('layers')
  const [showGrid, setShowGrid] = useState(false)
  const [zoom, setZoom] = useState(0.58)
  const [lastChangeLabel, setLastChangeLabel] = useState('agora')

  const activePanelTitle = useMemo(() => {
    if (activePanel === 'templates') return 'Templates'
    if (activePanel === 'layers') return 'Layers'
    if (activePanel === 'assets') return 'Assets'
    if (activePanel === 'uploads') return 'Uploads'
    if (activePanel === 'themes') return 'Temas'
    return 'Biblioteca'
  }, [activePanel])

  const patchSelectedElement = (patch: DesignerTemplateElementPatch) => {
    if (!selectedElement) return
    updateElement(selectedElement.id, patch)
    setLastChangeLabel('agora')
  }

  return (
    <section className="space-y-3 rounded-2xl border border-[#d8e2ea] bg-white p-3 shadow-[0_18px_40px_-30px_rgba(16,35,63,0.45)] dark:border-white/10 dark:bg-[#101622]">
      <ExperienceHeader
        templateName={model.name}
        experienceName={experience.name}
        status={experience.status}
        isSaved={isSaved && !hasUnsavedChanges}
        saving={saving || savingTemplate}
        rendering={rendering}
        onSaveDraft={() => {
          void saveTemplate()
          onSaveDraft()
        }}
        onPublish={onPublish}
        onGeneratePng={onGeneratePng}
        onPreview={onPreview}
      />

      <div className="grid grid-cols-1 gap-3 xl:grid-cols-[20%_55%_25%]">
        <aside className="space-y-3 rounded-2xl border border-[#d8e2ea] bg-white/95 p-3 shadow-[0_12px_30px_-24px_rgba(16,35,63,0.35)] dark:border-white/10 dark:bg-[#0f1621]/95">
          <ExperienceNavigator activePanel={activePanel} onSelectPanel={setActivePanel} />

          <WorkspaceStatus
            templateName={model.name}
            themeName={model.theme}
            canvas={model.canvas}
            zoom={zoom}
            status={experience.status}
            isSaved={isSaved && !hasUnsavedChanges}
            lastChangeLabel={lastChangeLabel}
          />

          <div className="rounded-xl border border-[#d8e2ea] p-3 dark:border-white/10">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] dark:text-slate-400">{activePanelTitle}</p>

            {activePanel === 'layers' ? (
              <ExperienceLayers
                regions={model.regions}
                selectedElementId={selectedElementId}
                onSelectElement={setSelectedElementId}
                onToggleVisibility={(elementId) => {
                  toggleLayerVisibility(elementId)
                  setLastChangeLabel('agora')
                }}
                onMoveLayer={(elementId, direction) => {
                  moveLayer(elementId, direction)
                  setLastChangeLabel('agora')
                }}
              />
            ) : null}

            {activePanel === 'assets' || activePanel === 'uploads' ? (
              <ExperienceAssets experience={experience} onUploadImage={onUploadImage} />
            ) : null}

            {activePanel === 'templates' ? (
              <div className="space-y-2 text-xs text-[var(--brand-muted)] dark:text-slate-400">
                <label className="space-y-1 block"><span>Nome do template</span><input value={model.name} onChange={(event) => setTemplateName(event.target.value)} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
                <div className="grid grid-cols-2 gap-2">
                  <label className="space-y-1 block"><span>Width</span><input type="number" value={model.canvas.width} onChange={(event) => setCanvas(parseNumber(event.target.value, model.canvas.width), model.canvas.height)} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
                  <label className="space-y-1 block"><span>Height</span><input type="number" value={model.canvas.height} onChange={(event) => setCanvas(model.canvas.width, parseNumber(event.target.value, model.canvas.height))} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
                </div>
              </div>
            ) : null}

            {activePanel === 'themes' ? (
              <div className="space-y-2 text-xs text-[var(--brand-muted)] dark:text-slate-400">
                <label className="space-y-1 block"><span>Tema base</span><select value={model.theme} onChange={(event) => setTheme(event.target.value as typeof model.theme)} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]"><option value="political">political</option><option value="premium">premium</option><option value="minimal">minimal</option></select></label>
                {model.regions.map((region) => (
                  <label key={region.id} className="flex items-center justify-between rounded-lg border border-[#d8e2ea] px-2 py-2 dark:border-white/10">
                    <span>{region.name}</span>
                    <input type="checkbox" checked={region.enabled} onChange={(event) => setRegionEnabled(region.id, event.target.checked)} />
                  </label>
                ))}
              </div>
            ) : null}

            {activePanel === 'library' ? (
              <div className="space-y-2 text-xs text-[var(--brand-muted)] dark:text-slate-400">
                <button type="button" onClick={() => { addElement('text'); setLastChangeLabel('agora') }} className="w-full rounded-lg border border-[#d8e2ea] px-2 py-2 text-left dark:border-white/10">Adicionar Texto</button>
                <button type="button" onClick={() => { addElement('image'); setLastChangeLabel('agora') }} className="w-full rounded-lg border border-[#d8e2ea] px-2 py-2 text-left dark:border-white/10">Adicionar Imagem</button>
                <button type="button" onClick={() => { addElement('shape'); setLastChangeLabel('agora') }} className="w-full rounded-lg border border-[#d8e2ea] px-2 py-2 text-left dark:border-white/10">Adicionar Shape</button>
                <button type="button" onClick={() => { addElement('hashtag'); setLastChangeLabel('agora') }} className="w-full rounded-lg border border-[#d8e2ea] px-2 py-2 text-left dark:border-white/10">Adicionar Hashtag</button>
                <button type="button" onClick={() => { addElement('number'); setLastChangeLabel('agora') }} className="w-full rounded-lg border border-[#d8e2ea] px-2 py-2 text-left dark:border-white/10">Adicionar Numero</button>
              </div>
            ) : null}
          </div>
        </aside>

        <main className="space-y-3">
          <ExperienceToolbar
            canUndo={canUndo}
            canRedo={canRedo}
            selectedElementId={selectedElementId}
            zoom={zoom}
            showGrid={showGrid}
            onUndo={undo}
            onRedo={redo}
            onDuplicate={() => {
              if (selectedElementId) duplicateElement(selectedElementId)
            }}
            onDelete={() => {
              if (selectedElementId) removeElement(selectedElementId)
            }}
            onAlign={alignSelected}
            onBringForward={() => {
              if (selectedElementId) moveLayer(selectedElementId, 'up')
              setLastChangeLabel('agora')
            }}
            onSendBackward={() => {
              if (selectedElementId) moveLayer(selectedElementId, 'down')
              setLastChangeLabel('agora')
            }}
            onToggleGrid={() => setShowGrid((value) => !value)}
            onZoomIn={() => setZoom((value) => Math.min(1.6, value + 0.05))}
            onZoomOut={() => setZoom((value) => Math.max(0.2, value - 0.05))}
            onZoomReset={() => setZoom(0.58)}
            onPreview={onPreview}
          />

          <CanvasViewport zoom={zoom} showGrid={showGrid}>
            <ExperienceCanvas
              canvasRef={canvasRef}
              experience={experience}
              preset={preset}
              renderVersion={renderVersion}
            />
          </CanvasViewport>

          <div className="rounded-xl border border-dashed border-[#d8e2ea] px-3 py-2 text-xs text-[var(--brand-muted)] dark:border-white/10 dark:text-slate-400">
            Workspace premium ativo. Alteracoes de layout e propriedades sao aplicadas em tempo real no mesmo renderer de exportacao.
          </div>
        </main>

        <aside className="space-y-3 rounded-2xl border border-[#d8e2ea] bg-white/95 p-3 shadow-[0_12px_30px_-24px_rgba(16,35,63,0.35)] dark:border-white/10 dark:bg-[#0f1621]/95">
          <ExperienceInspector selectedElement={selectedElement} onPatchElement={patchSelectedElement} />

          <div className="rounded-xl border border-[#d8e2ea] p-3 text-xs text-[var(--brand-muted)] dark:border-white/10 dark:text-slate-400">
            <p className="font-semibold uppercase tracking-[0.1em]">Studio Tokens</p>
            <p className="mt-1">Spacing: {studioTokens.spacing.sm} / Radius: {studioTokens.radius.panel}</p>
            <p className="mt-1">Elevation: {studioTokens.elevation.panel}</p>
          </div>
        </aside>
      </div>
    </section>
  )
}
