import { ChevronDown, ChevronUp } from 'lucide-react'
import { memo, useState } from 'react'
import type { DesignerTemplateElement, DesignerTemplateElementPatch } from '../types/designer'

type PropertyPanelProps = {
  element: DesignerTemplateElement
  onPatch: (patch: DesignerTemplateElementPatch) => void
}

function parseNumber(value: string, fallback: number) {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export const PropertyPanel = memo(function PropertyPanel({ element, onPatch }: PropertyPanelProps) {
  const [openTransform, setOpenTransform] = useState(true)
  const [openAppearance, setOpenAppearance] = useState(true)
  const [openTypography, setOpenTypography] = useState(true)
  const [openImage, setOpenImage] = useState(true)
  const [openLayout, setOpenLayout] = useState(true)

  const isText = element.type === 'text' || element.type === 'number' || element.type === 'hashtag' || element.type === 'footer' || element.type === 'header'
  const isImage = element.type === 'image' || element.type === 'logo' || element.type === 'mainPhoto' || element.type === 'candidatePhoto'

  const CardHeader = ({
    title,
    open,
    onToggle,
  }: {
    title: string
    open: boolean
    onToggle: () => void
  }) => (
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between rounded-lg border border-[#d8e2ea] bg-white/70 px-2 py-2 text-left text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-muted)] transition-colors hover:bg-[#f3f8fb] dark:border-white/10 dark:bg-[#0f1621]/70 dark:text-slate-400 dark:hover:bg-[#182435]"
    >
      <span>{title}</span>
      {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
    </button>
  )

  return (
    <div className="space-y-3">
      <label className="space-y-1 text-xs">
        <span className="text-[var(--brand-muted)] dark:text-slate-400">Nome</span>
        <input
          value={element.name}
          onChange={(event) => onPatch({ name: event.target.value })}
          className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 text-xs dark:border-white/10 dark:bg-[#0f1621]"
        />
      </label>

      <section className="space-y-2 rounded-xl border border-[#d8e2ea] bg-white/60 p-2 dark:border-white/10 dark:bg-[#0d141f]/65">
        <CardHeader title="Transformacao" open={openTransform} onToggle={() => setOpenTransform((value) => !value)} />
        {openTransform ? (
          <div className="grid grid-cols-2 gap-2">
            <label className="space-y-1 text-xs"><span>X</span><input type="number" step="0.01" value={element.x} onChange={(event) => onPatch({ x: parseNumber(event.target.value, element.x) })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
            <label className="space-y-1 text-xs"><span>Y</span><input type="number" step="0.01" value={element.y} onChange={(event) => onPatch({ y: parseNumber(event.target.value, element.y) })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
            <label className="space-y-1 text-xs"><span>Largura</span><input type="number" step="0.01" value={element.width} onChange={(event) => onPatch({ width: parseNumber(event.target.value, element.width) })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
            <label className="space-y-1 text-xs"><span>Altura</span><input type="number" step="0.01" value={element.height} onChange={(event) => onPatch({ height: parseNumber(event.target.value, element.height) })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
          </div>
        ) : null}
      </section>

      <section className="space-y-2 rounded-xl border border-[#d8e2ea] bg-white/60 p-2 dark:border-white/10 dark:bg-[#0d141f]/65">
        <CardHeader title="Aparencia" open={openAppearance} onToggle={() => setOpenAppearance((value) => !value)} />
        {openAppearance ? (
          <div className="grid grid-cols-2 gap-2">
            <label className="space-y-1 text-xs">
              <span>Background</span>
              <select value={element.styles?.background ?? 'Surface'} onChange={(event) => onPatch({ styles: { background: event.target.value as NonNullable<typeof element.styles>['background'] } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]">
                <option value="Surface">Surface</option>
                <option value="Primary">Primary</option>
                <option value="Secondary">Secondary</option>
                <option value="Accent">Accent</option>
                <option value="White">White</option>
                <option value="Black">Black</option>
              </select>
            </label>
            <label className="space-y-1 text-xs">
              <span>Border</span>
              <select value={element.styles?.border ?? 'none'} onChange={(event) => onPatch({ styles: { border: event.target.value as NonNullable<typeof element.styles>['border'] } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]">
                <option value="none">none</option>
                <option value="thin">thin</option>
                <option value="regular">regular</option>
                <option value="strong">strong</option>
              </select>
            </label>
            <label className="space-y-1 text-xs">
              <span>Radius</span>
              <select value={element.styles?.borderRadius ?? 'md'} onChange={(event) => onPatch({ styles: { borderRadius: event.target.value as NonNullable<typeof element.styles>['borderRadius'] } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]">
                <option value="none">none</option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
                <option value="xl">xl</option>
                <option value="pill">pill</option>
              </select>
            </label>
            <label className="space-y-1 text-xs">
              <span>Shadow</span>
              <select value={element.styles?.shadow ?? 'none'} onChange={(event) => onPatch({ styles: { shadow: event.target.value as NonNullable<typeof element.styles>['shadow'] } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]">
                <option value="none">none</option>
                <option value="soft">soft</option>
                <option value="elevated">elevated</option>
                <option value="focus">focus</option>
              </select>
            </label>
            <label className="space-y-1 text-xs"><span>Opacity</span><input type="number" step="0.05" min="0" max="1" value={element.styles?.opacity ?? 1} onChange={(event) => onPatch({ styles: { opacity: parseNumber(event.target.value, element.styles?.opacity ?? 1) } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
            <label className="space-y-1 text-xs"><span>Rotacao</span><input type="number" step="1" value={element.styles?.rotation ?? 0} onChange={(event) => onPatch({ styles: { rotation: parseNumber(event.target.value, element.styles?.rotation ?? 0) } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
          </div>
        ) : null}
      </section>

      {isText ? (
        <section className="space-y-2 rounded-xl border border-[#d8e2ea] bg-white/60 p-2 dark:border-white/10 dark:bg-[#0d141f]/65">
          <CardHeader title="Tipografia" open={openTypography} onToggle={() => setOpenTypography((value) => !value)} />
          {openTypography ? (
            <div className="grid grid-cols-2 gap-2">
              <label className="space-y-1 text-xs"><span>Fonte</span><select value={element.text?.typography ?? 'body'} onChange={(event) => onPatch({ text: { typography: event.target.value as NonNullable<typeof element.text>['typography'] } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]"><option value="headline">headline</option><option value="candidateName">candidateName</option><option value="candidateNumber">candidateNumber</option><option value="hashtag">hashtag</option><option value="header">header</option><option value="footer">footer</option><option value="caption">caption</option><option value="body">body</option><option value="party">party</option></select></label>
              <label className="space-y-1 text-xs"><span>Align</span><select value={element.text?.align ?? 'left'} onChange={(event) => onPatch({ text: { align: event.target.value as NonNullable<typeof element.text>['align'] } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]"><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></label>
              <label className="space-y-1 text-xs"><span>Max linhas</span><input type="number" min="1" max="10" value={element.text?.maxLines ?? 2} onChange={(event) => onPatch({ text: { maxLines: parseNumber(event.target.value, element.text?.maxLines ?? 2) } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
              <label className="space-y-1 text-xs"><span>Auto Scale</span><select value={String(element.text?.autoScale ?? true)} onChange={(event) => onPatch({ text: { autoScale: event.target.value === 'true' } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]"><option value="true">Ativo</option><option value="false">Inativo</option></select></label>
            </div>
          ) : null}
        </section>
      ) : null}

      {isImage ? (
        <section className="space-y-2 rounded-xl border border-[#d8e2ea] bg-white/60 p-2 dark:border-white/10 dark:bg-[#0d141f]/65">
          <CardHeader title="Imagem" open={openImage} onToggle={() => setOpenImage((value) => !value)} />
          {openImage ? (
            <div className="grid grid-cols-2 gap-2">
              <label className="space-y-1 text-xs"><span>Object Fit</span><select value={element.image?.fit ?? 'cover'} onChange={(event) => onPatch({ image: { fit: event.target.value as 'cover' | 'contain' } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]"><option value="cover">cover</option><option value="contain">contain</option></select></label>
              <label className="space-y-1 text-xs"><span>Crop</span><select value={String(element.image?.crop ?? false)} onChange={(event) => onPatch({ image: { crop: event.target.value === 'true' } })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]"><option value="false">off</option><option value="true">on</option></select></label>
            </div>
          ) : null}
        </section>
      ) : null}

      <section className="space-y-2 rounded-xl border border-[#d8e2ea] bg-white/60 p-2 dark:border-white/10 dark:bg-[#0d141f]/65">
        <CardHeader title="Layout" open={openLayout} onToggle={() => setOpenLayout((value) => !value)} />
        {openLayout ? (
          <>
            <div className="grid grid-cols-2 gap-2">
              <label className="space-y-1 text-xs"><span>Padding</span><input type="number" step="1" value={element.padding ?? 0} onChange={(event) => onPatch({ padding: parseNumber(event.target.value, element.padding ?? 0) })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
              <label className="space-y-1 text-xs"><span>Margin</span><input type="number" step="1" value={element.margin ?? 0} onChange={(event) => onPatch({ margin: parseNumber(event.target.value, element.margin ?? 0) })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
              <label className="space-y-1 text-xs"><span>ZIndex</span><input type="number" step="1" value={element.zIndex} onChange={(event) => onPatch({ zIndex: parseNumber(event.target.value, element.zIndex) })} className="w-full rounded-lg border border-[#d8e2ea] bg-white px-2 py-1.5 dark:border-white/10 dark:bg-[#0f1621]" /></label>
            </div>

            <label className="mt-2 flex items-center justify-between rounded-lg border border-[#d8e2ea] px-2 py-2 text-xs dark:border-white/10">
              <span>Visible</span>
              <input type="checkbox" checked={element.visible} onChange={(event) => onPatch({ visible: event.target.checked })} />
            </label>
          </>
        ) : null}
      </section>
    </div>
  )
})
