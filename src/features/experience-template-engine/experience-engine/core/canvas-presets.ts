export const CanvasPresets = {
  SMARTPHONE: {
    width: 1080,
    height: 1920,
    ratio: '9:16',
  },
  INSTAGRAM_STORY: {
    width: 1080,
    height: 1920,
    ratio: '9:16',
  },
  INSTAGRAM_FEED: {
    width: 1080,
    height: 1350,
    ratio: '4:5',
  },
  FACEBOOK_POST: {
    width: 1200,
    height: 630,
    ratio: '40:21',
  },
} as const

export type CanvasPresetId = keyof typeof CanvasPresets
export type CanvasPreset = (typeof CanvasPresets)[CanvasPresetId]

export const DEFAULT_CANVAS_PRESET: CanvasPresetId = 'SMARTPHONE'

export function resolveCanvasPreset(preset?: CanvasPresetId): CanvasPreset {
  return CanvasPresets[preset ?? DEFAULT_CANVAS_PRESET]
}
