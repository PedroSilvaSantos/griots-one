import type { ShadowToken } from '../core/types'

export type ShadowStyle = {
  color: string
  blur: number
  offsetX: number
  offsetY: number
}

export const shadows: Record<ShadowToken, ShadowStyle> = {
  none: { color: 'transparent', blur: 0, offsetX: 0, offsetY: 0 },
  soft: { color: 'rgba(16, 35, 63, 0.14)', blur: 16, offsetX: 0, offsetY: 6 },
  elevated: { color: 'rgba(16, 35, 63, 0.22)', blur: 30, offsetX: 0, offsetY: 14 },
  focus: { color: 'rgba(15, 118, 110, 0.45)', blur: 10, offsetX: 0, offsetY: 0 },
}
