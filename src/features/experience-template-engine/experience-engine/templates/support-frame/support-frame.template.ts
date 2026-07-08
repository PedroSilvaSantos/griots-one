import type { ExperienceTemplateConfig } from '../../core/types'
import { CanvasPresets } from '../../core/canvas-presets'
import { supportFrameLayout } from './support-frame.layout'
import { supportFrameNodes } from './support-frame.styles'

export const supportFrameTemplateEngineConfig: ExperienceTemplateConfig = {
  id: 'support-frame',
  name: 'Moldura de Apoio',
  description: 'Composição editorial de campanha com hierarquia tipográfica profissional.',
  width: CanvasPresets.SMARTPHONE.width,
  height: CanvasPresets.SMARTPHONE.height,
  theme: 'political',
  fonts: [
    { family: 'Syne', weight: 700 },
    { family: 'Manrope', weight: 700 },
    { family: 'Montserrat', weight: 900 },
  ],
  layout: supportFrameLayout,
  nodes: supportFrameNodes,
}
