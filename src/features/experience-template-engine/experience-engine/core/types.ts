export type ExperienceEngineThemeId = 'political' | 'premium' | 'minimal'

export type ColorToken =
  | 'Primary'
  | 'Secondary'
  | 'Background'
  | 'Surface'
  | 'White'
  | 'Black'
  | 'Border'
  | 'Accent'
  | 'Danger'
  | 'Success'
  | 'BackgroundStart'
  | 'BackgroundEnd'
  | 'Text'
  | 'MutedText'
  | 'OnPrimary'
  | 'Shadow'

export type SpacingToken = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'

export type RadiusToken = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'pill'

export type BorderToken = 'none' | 'thin' | 'regular' | 'strong'

export type ShadowToken = 'none' | 'soft' | 'elevated' | 'focus'

export type TypographyToken =
  | 'headline'
  | 'candidateName'
  | 'candidateNumber'
  | 'hashtag'
  | 'header'
  | 'footer'
  | 'caption'
  | 'body'
  | 'party'

export type LayoutAreaName =
  | 'HeaderArea'
  | 'LogoLeftArea'
  | 'LogoRightArea'
  | 'PhotoArea'
  | 'OverlayArea'
  | 'HashtagArea'
  | 'FooterArea'
  | 'FooterLine1Area'
  | 'FooterLine2Area'
  | 'CandidateNumberArea'
  | 'CandidatePhotoArea'
  | 'CandidateInfoArea'
  | string

export type HorizontalAlign = 'left' | 'center' | 'right' | 'justify'

export type VerticalAlign = 'top' | 'middle' | 'bottom'

export type SafeAreaInsets = {
  top?: SpacingToken
  right?: SpacingToken
  bottom?: SpacingToken
  left?: SpacingToken
}

export type TemplateFont = {
  family: string
  weight: number
  style?: 'normal' | 'italic'
}

export type TypographyStyle = {
  fontFamily: string
  fontWeight: number
  fontSize: number
  lineHeight: number
  letterSpacing: number
  color: ColorToken
  stroke?: ColorToken
  strokeWidth?: number
  shadow?: ShadowToken
  textTransform?: 'none' | 'uppercase'
  textAlign?: HorizontalAlign
}

export type LayoutRegion = {
  x: number
  y: number
  width: number
  height: number
  padding?: SpacingToken
  margin?: SpacingToken
  safeArea?: SafeAreaInsets
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
}

type BaseNode = {
  id: string
  opacity?: number
  box?: {
    x: number
    y: number
    width: number
    height: number
  }
}

export type ShapeNode = BaseNode & {
  kind: 'shape'
  fill: ColorToken
  stroke?: ColorToken
  border?: BorderToken
  radius?: RadiusToken
  shadow?: ShadowToken
}

export type TextNode = BaseNode & {
  kind: 'text'
  source: string
  typography: TypographyToken
  component?: 'default' | 'hashtag' | 'candidateName' | 'candidateNumber' | 'header' | 'footer'
  horizontalAlign?: HorizontalAlign
  verticalAlign?: VerticalAlign
  maxLines?: number
  autoFit?: boolean
  ellipsis?: boolean
  uppercase?: boolean
  minFontSize?: number
}

export type ImageNode = BaseNode & {
  kind: 'image'
  source: string
  fit?: 'cover' | 'contain'
  cropMode?: 'center' | 'smart'
  border?: BorderToken
  borderColor?: ColorToken
  radius?: RadiusToken
  shadow?: ShadowToken
  mask?: 'none' | 'circle' | 'rounded'
}

export type TemplateNode = ShapeNode | TextNode | ImageNode

export type ExperienceTemplateId =
  | 'support-frame'
  | 'feed'
  | 'story'
  | 'banner'
  | 'card-whatsapp'
  | 'outdoor'
  | 'flyer'
  | 'cartaz'
  | 'santinho'

export type ExperienceTemplateConfig = {
  id: ExperienceTemplateId
  name: string
  description: string
  width: number
  height: number
  fonts: TemplateFont[]
  theme: ExperienceEngineThemeId
  regions: Record<
    LayoutAreaName,
    {
      enabled: boolean
      order: number
      layout: LayoutRegion
      nodes: TemplateNode[]
    }
  >
}

export type RenderWarning = {
  code: 'MISSING_ASSET'
  source: string
}
