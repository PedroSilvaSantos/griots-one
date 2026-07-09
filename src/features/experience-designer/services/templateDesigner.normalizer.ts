import type { ExperienceTemplateId } from '../../experience-template-engine/experience-engine/core/types'
import { buildSupportFrameRegionLayout } from '../../experience-template-engine/experience-engine/templates/support-frame/support-frame.layout'
import type {
  DesignerRegion,
  DesignerTemplateElement,
  DesignerTemplateModel,
} from '../types/designer'

const FRAME_ELEMENT_IDS = new Set(['photo-frame-surface', 'photo-overlay-frame'])
const SUPPORT_FRAME_FOOTER_PHOTO_ENABLED = false

function applyRegionLayout(region: DesignerRegion, reference: DesignerRegion | { x: number; y: number; width: number; height: number; padding?: DesignerRegion['padding']; margin?: DesignerRegion['margin']; horizontalAlign?: DesignerRegion['horizontalAlign']; verticalAlign?: DesignerRegion['verticalAlign'] }) {
  return {
    ...region,
    x: reference.x,
    y: reference.y,
    width: reference.width,
    height: reference.height,
    padding: reference.padding,
    margin: reference.margin,
    horizontalAlign: reference.horizontalAlign,
    verticalAlign: reference.verticalAlign,
  }
}

function normalizeElementOpacity(element: DesignerTemplateElement): DesignerTemplateElement {
  const opacity = element.visible === false ? 0 : 1

  return {
    ...element,
    styles: {
      ...element.styles,
      opacity,
    },
    image: element.image
      ? {
          ...element.image,
          opacity,
        }
      : element.image,
  }
}

function normalizeSupportFramePhoto(photoArea: DesignerRegion): DesignerRegion {
  const existingMainPhoto = photoArea.elements.find(
    (element) =>
      element.id === 'main-candidate-photo'
      || element.type === 'mainPhoto'
      || element.source === 'brand.candidatePhoto',
  )

  const preservedElements = photoArea.elements.filter(
    (element) =>
      !FRAME_ELEMENT_IDS.has(element.id)
      && element.source !== 'brand.frame'
      && element.type !== 'shape'
      && element.type !== 'rectangle'
      && element.id !== 'header-surface'
      && element.id !== 'footer-surface'
      && element !== existingMainPhoto,
  )

  const mainPhotoElement: DesignerTemplateElement = {
    id: existingMainPhoto?.id ?? 'main-candidate-photo',
    name: existingMainPhoto?.name ?? 'main-candidate-photo',
    type: 'mainPhoto',
    source: 'brand.candidatePhoto',
    visible: true,
    zIndex: 0,
    x: 0,
    y: 0,
    width: 1,
    height: 0.86,
    padding: existingMainPhoto?.padding,
    margin: existingMainPhoto?.margin,
    styles: {
      ...existingMainPhoto?.styles,
      opacity: 1,
      rotation: existingMainPhoto?.styles?.rotation ?? 0,
      border: 'none',
      borderColor: undefined,
      borderRadius: 'none',
      shadow: 'none',
    },
    image: {
      ...existingMainPhoto?.image,
      fit: existingMainPhoto?.image?.fit ?? 'cover',
      cropMode: existingMainPhoto?.image?.cropMode ?? 'smart',
      radius: 'none',
      opacity: 1,
      shadow: 'none',
      mask: 'none',
    },
  }

  return {
    ...photoArea,
    enabled: true,
    elements: [mainPhotoElement, ...preservedElements]
      .map(normalizeElementOpacity)
      .sort((a, b) => a.zIndex - b.zIndex)
      .map((element, index) => ({
        ...element,
        zIndex: index,
      })),
  }
}

function normalizeSupportFrameModel(model: DesignerTemplateModel): DesignerTemplateModel {
  const headerEnabled = model.regions.find((region) => region.id === 'HeaderArea')?.enabled ?? true
  const layout = buildSupportFrameRegionLayout({
    headerEnabled,
    footerPhotoEnabled: SUPPORT_FRAME_FOOTER_PHOTO_ENABLED,
  })

  return {
    ...model,
    regions: model.regions.map((region) => {
      if (region.id === 'PhotoArea') {
        return applyRegionLayout(normalizeSupportFramePhoto(region), layout.PhotoArea)
      }

      if (region.id === 'OverlayArea') {
        return applyRegionLayout({
          ...region,
          enabled: false,
          elements: region.elements.filter((element) => !FRAME_ELEMENT_IDS.has(element.id) && element.source !== 'brand.frame'),
        }, layout.OverlayArea)
      }

      if (region.id === 'HashtagArea') {
        return applyRegionLayout({
          ...region,
          enabled: true,
          elements: region.elements
            .filter((element) => element.id === 'hashtag')
            .map((element) => normalizeElementOpacity({
              ...element,
              type: 'hashtag',
              source: 'content.hashtag',
              visible: true,
              x: 0,
              y: 0,
              width: 1,
              height: 1,
              text: {
                ...element.text,
                typography: 'hashtag',
                align: 'center',
                verticalAlign: 'bottom',
                autoScale: true,
                maxLines: 2,
                minFontSize: 22,
              },
            })),
        }, layout.HashtagArea)
      }

      if (region.id === 'FooterArea') {
        return applyRegionLayout({
          ...region,
          enabled: false,
          elements: region.elements.filter((element) => element.id !== 'footer-surface').map(normalizeElementOpacity),
        }, layout.FooterArea)
      }

      if (region.id === 'CandidatePhotoArea') {
        return applyRegionLayout({
          ...region,
          enabled: false,
          elements: region.elements.map(normalizeElementOpacity),
        }, layout.CandidatePhotoArea)
      }

      if (region.id === 'FooterLine1Area') {
        return applyRegionLayout({
          ...region,
          enabled: true,
          elements: region.elements
            .filter((element) => element.id === 'footer-text-line1')
            .map((element) => normalizeElementOpacity({
              ...element,
              type: 'text',
              source: 'content.candidateName',
              visible: true,
              x: 0,
              y: 0,
              width: 1,
              height: 1,
              text: {
                ...element.text,
                typography: 'candidateName',
                align: 'left',
                verticalAlign: 'bottom',
                autoScale: true,
                maxLines: 2,
                minFontSize: 28,
              },
            })),
        }, layout.FooterLine1Area)
      }

      if (region.id === 'FooterLine2Area') {
        return applyRegionLayout({
          ...region,
          enabled: true,
          elements: region.elements
            .filter((element) => element.id === 'footer-text-line2' || element.id === 'footer-party')
            .map((element) => normalizeElementOpacity(element.id === 'footer-party'
              ? {
                  ...element,
                  type: 'text',
                  source: 'content.party',
                  visible: true,
                  x: 0,
                  y: 0,
                  width: 1,
                  height: 1,
                  text: {
                    ...element.text,
                    typography: 'party',
                    align: 'right',
                    verticalAlign: 'bottom',
                    autoScale: true,
                    maxLines: 1,
                    minFontSize: 18,
                    uppercase: true,
                  },
                }
              : {
                  ...element,
                  type: 'text',
                  source: 'content.bottomLine2',
                  visible: true,
                  x: 0,
                  y: 0,
                  width: 1,
                  height: 1,
                  text: {
                    ...element.text,
                    typography: 'footer',
                    align: 'left',
                    verticalAlign: 'top',
                    autoScale: true,
                    maxLines: 2,
                    minFontSize: 14,
                  },
                })),
        }, layout.FooterLine2Area)
      }

      if (region.id === 'CandidateNumberArea') {
        return applyRegionLayout({
          ...region,
          enabled: true,
          elements: region.elements
            .filter((element) => element.id === 'candidate-number')
            .map((element) => normalizeElementOpacity({
              ...element,
              type: 'number',
              source: 'content.candidateNumber',
              visible: true,
              x: 0,
              y: 0,
              width: 1,
              height: 1,
              text: {
                ...element.text,
                typography: 'candidateNumber',
                align: 'left',
                verticalAlign: 'bottom',
                autoScale: true,
                maxLines: 1,
                minFontSize: 44,
              },
            })),
        }, layout.CandidateNumberArea)
      }

      return applyRegionLayout({
        ...region,
        elements: region.elements.map(normalizeElementOpacity),
      }, layout[region.id] ?? region)
    }),
  }
}

export function normalizeDesignerTemplateModel(
  templateId: ExperienceTemplateId,
  model: DesignerTemplateModel,
) {
  if (templateId === 'support-frame') {
    return normalizeSupportFrameModel(model)
  }

  return model
}
