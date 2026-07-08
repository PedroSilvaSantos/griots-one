import type { LayoutRegion } from '../core/types'

export function createRegion(
  x: number,
  y: number,
  width: number,
  height: number,
  patch?: Partial<LayoutRegion>,
): LayoutRegion {
  return {
    x,
    y,
    width,
    height,
    ...patch,
  }
}
