import type {
  BorderToken,
  ColorToken,
  ExperienceTemplateConfig,
  ExperienceTemplateId,
  HorizontalAlign,
  ImageNode,
  LayoutRegion,
  RadiusToken,
  ShadowToken,
  TemplateNode,
  TypographyToken,
  VerticalAlign,
} from '../../experience-template-engine/experience-engine/core/types'

export type DesignerElementType =
  | 'text'
  | 'image'
  | 'logo'
  | 'mainPhoto'
  | 'candidatePhoto'
  | 'number'
  | 'hashtag'
  | 'footer'
  | 'header'
  | 'qrcode'
  | 'rectangle'
  | 'line'
  | 'shape'

export type DesignerTextAlign = HorizontalAlign
export type DesignerVerticalAlign = VerticalAlign

export type DesignerNodeStyle = {
  background?: ColorToken
  borderColor?: ColorToken
  border?: BorderToken
  borderRadius?: RadiusToken
  shadow?: ShadowToken
  opacity?: number
  rotation?: number
}

export type DesignerTextStyle = {
  typography?: TypographyToken
  align?: DesignerTextAlign
  verticalAlign?: DesignerVerticalAlign
  stroke?: ColorToken
  shadow?: ShadowToken
  lineHeight?: number
  letterSpacing?: number
  uppercase?: boolean
  lowercase?: boolean
  wrap?: boolean
  autoScale?: boolean
  maxLines?: number
  minFontSize?: number
}

export type DesignerImageStyle = {
  fit?: 'cover' | 'contain'
  cropMode?: 'center' | 'smart'
  crop?: boolean
  mask?: ImageNode['mask']
  radius?: RadiusToken
  opacity?: number
  shadow?: ShadowToken
}

export type DesignerTemplateElement = {
  id: string
  name: string
  type: DesignerElementType
  source?: string
  visible: boolean
  zIndex: number
  x: number
  y: number
  width: number
  height: number
  padding?: number
  margin?: number
  styles?: DesignerNodeStyle
  text?: DesignerTextStyle
  image?: DesignerImageStyle
}

export type DesignerRegion = {
  id: string
  name: string
  enabled: boolean
  order: number
  x: number
  y: number
  width: number
  height: number
  padding?: LayoutRegion['padding']
  margin?: LayoutRegion['margin']
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
  elements: DesignerTemplateElement[]
}

export type DesignerTemplateModel = {
  id: ExperienceTemplateId
  name: string
  description: string
  canvas: {
    width: number
    height: number
  }
  theme: ExperienceTemplateConfig['theme']
  regions: DesignerRegion[]
}

export type DesignerStoredTemplate = {
  templateId: ExperienceTemplateId
  updatedAt: string
  model: DesignerTemplateModel
}

export type DesignerTemplateElementPatch = Partial<Omit<DesignerTemplateElement, 'id' | 'type'>>

export type DesignerTemplateConfig = ExperienceTemplateConfig

export type DesignerTemplateNode = TemplateNode
