import type {
  ExperienceTemplateConfig,
  LayoutRegion,
  TemplateNode,
} from '../../experience-template-engine/experience-engine/core/types'
import type {
  DesignerRegion,
  DesignerTemplateElement,
  DesignerTemplateModel,
} from '../types/designer'

function inferElementType(node: TemplateNode): DesignerTemplateElement['type'] {
  if (node.kind === 'text') {
    if (node.component === 'candidateNumber') return 'number'
    if (node.component === 'hashtag') return 'hashtag'
    if (node.component === 'header') return 'header'
    if (node.component === 'footer') return 'footer'
    return 'text'
  }

  if (node.kind === 'image') {
    if (node.source?.includes('candidatePhoto')) return 'mainPhoto'
    if (node.source?.includes('userPhoto')) return 'candidatePhoto'
    if (node.source?.includes('logo')) return 'logo'
    return 'image'
  }

  return 'shape'
}

function toDesignerElement(node: TemplateNode, index: number): DesignerTemplateElement {
  const base: DesignerTemplateElement = {
    id: node.id,
    name: node.id,
    type: inferElementType(node),
    visible: node.visible ?? (node.opacity ?? 1) > 0,
    zIndex: index,
    x: node.box?.x ?? 0,
    y: node.box?.y ?? 0,
    width: node.box?.width ?? 1,
    height: node.box?.height ?? 1,
    styles: {
      opacity: node.opacity ?? 1,
      rotation: 0,
    },
  }

  if (node.kind === 'image') {
    return {
      ...base,
      source: node.source,
      image: {
        fit: node.fit,
        cropMode: node.cropMode,
        mask: node.mask,
        radius: node.radius,
        opacity: node.opacity,
        shadow: node.shadow,
      },
      styles: {
        ...base.styles,
        border: node.border,
        borderColor: node.borderColor,
        borderRadius: node.radius,
        shadow: node.shadow,
      },
    }
  }

  if (node.kind === 'text') {
    return {
      ...base,
      source: node.source,
      text: {
        typography: node.typography,
        align: node.horizontalAlign,
        verticalAlign: node.verticalAlign,
        uppercase: node.uppercase,
        wrap: node.autoFit,
        autoScale: node.autoFit,
        maxLines: node.maxLines,
        minFontSize: node.minFontSize,
      },
    }
  }

  return {
    ...base,
    styles: {
      ...base.styles,
      background: node.fill,
      border: node.border,
      borderColor: node.stroke,
      borderRadius: node.radius,
      shadow: node.shadow,
    },
  }
}

function toNode(element: DesignerTemplateElement): TemplateNode {
  const opacity = element.styles?.opacity ?? 1
  const box = {
    x: element.x,
    y: element.y,
    width: element.width,
    height: element.height,
  }

  if (element.type === 'shape' || element.type === 'rectangle' || element.type === 'line') {
    return {
      id: element.id,
      kind: 'shape',
      fill: element.styles?.background,
      border: element.styles?.border,
      stroke: element.styles?.borderColor,
      radius: element.styles?.borderRadius,
      shadow: element.styles?.shadow,
      visible: element.visible,
      opacity,
      box,
    }
  }

  if (element.type === 'text' || element.type === 'hashtag' || element.type === 'number' || element.type === 'footer' || element.type === 'header') {
    const component = element.type === 'hashtag'
      ? 'hashtag'
      : element.type === 'number'
        ? 'candidateNumber'
        : element.type === 'header'
          ? 'header'
          : element.type === 'footer'
            ? 'footer'
            : 'default'

    return {
      id: element.id,
      kind: 'text',
      source: element.source ?? 'content.title',
      typography: element.text?.typography ?? 'body',
      component,
      horizontalAlign: element.text?.align,
      verticalAlign: element.text?.verticalAlign,
      maxLines: element.text?.maxLines,
      autoFit: element.text?.autoScale,
      ellipsis: true,
      uppercase: element.text?.uppercase,
      minFontSize: element.text?.minFontSize,
      visible: element.visible,
      opacity,
      box,
    }
  }

  return {
    id: element.id,
    kind: 'image',
    source: element.source ?? 'brand.logo',
    fit: element.image?.fit,
    cropMode: element.image?.cropMode,
    mask: element.image?.mask,
    border: element.styles?.border,
    borderColor: element.styles?.borderColor,
    radius: element.image?.radius ?? element.styles?.borderRadius,
    shadow: element.image?.shadow ?? element.styles?.shadow,
    visible: element.visible,
    opacity,
    box,
  }
}

function toRegionLayout(region: DesignerRegion): LayoutRegion {
  return {
    x: region.x,
    y: region.y,
    width: region.width,
    height: region.height,
    padding: region.padding,
    margin: region.margin,
    horizontalAlign: region.horizontalAlign,
    verticalAlign: region.verticalAlign,
  }
}

export function toDesignerModel(template: ExperienceTemplateConfig): DesignerTemplateModel {
  const regions = Object.entries(template.regions)
    .map(([regionId, region]) => ({
      id: regionId,
      name: regionId,
      enabled: region.enabled,
      order: region.order,
      x: region.layout.x,
      y: region.layout.y,
      width: region.layout.width,
      height: region.layout.height,
      padding: region.layout.padding,
      margin: region.layout.margin,
      horizontalAlign: region.layout.horizontalAlign,
      verticalAlign: region.layout.verticalAlign,
      elements: region.nodes
        .map((node, index) => toDesignerElement(node, index))
        .sort((a, b) => a.zIndex - b.zIndex),
    }))
    .sort((a, b) => a.order - b.order)

  return {
    id: template.id,
    name: template.name,
    description: template.description,
    canvas: {
      width: template.width,
      height: template.height,
    },
    theme: template.theme,
    regions,
  }
}

export function toEngineTemplate(model: DesignerTemplateModel): ExperienceTemplateConfig {
  const regions = Object.fromEntries(
    model.regions.map((region) => [
      region.id,
      {
        enabled: region.enabled,
        order: region.order,
        layout: toRegionLayout(region),
        nodes: [...region.elements]
          .sort((a, b) => a.zIndex - b.zIndex)
          .map((element) => toNode(element)),
      },
    ]),
  )

  return {
    id: model.id,
    name: model.name,
    description: model.description,
    width: model.canvas.width,
    height: model.canvas.height,
    theme: model.theme,
    fonts: [
      { family: 'Syne', weight: 700 },
      { family: 'Manrope', weight: 700 },
      { family: 'Montserrat', weight: 900 },
    ],
    regions,
  }
}
