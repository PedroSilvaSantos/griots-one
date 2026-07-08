export type Scaler = {
  scale: (value: number) => number
  horizontalScale: (value: number) => number
  verticalScale: (value: number) => number
  fontScale: (value: number) => number
}

export function createScaler(width: number, height: number, baseWidth = 1200, baseHeight = 1500): Scaler {
  const ratioX = width / baseWidth
  const ratioY = height / baseHeight
  const ratio = Math.min(ratioX, ratioY)

  const scale = (value: number) => value * ratio
  const horizontalScale = (value: number) => value * ratioX
  const verticalScale = (value: number) => value * ratioY
  const fontScale = (value: number) => value * ratio

  return {
    scale,
    horizontalScale,
    verticalScale,
    fontScale,
  }
}
