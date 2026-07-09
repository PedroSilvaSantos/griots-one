import { getBorder, getColor, getRadius, getShadow, type ColorPalette } from '../design-system'
import type { Scaler } from '../core/scale'
import type { ShapeNode } from '../core/types'
import { drawRoundedRectPath, type RenderBox } from './rendering'

export function renderShapeNode(
  context: CanvasRenderingContext2D,
  node: ShapeNode,
  box: RenderBox,
  palette: ColorPalette,
  scaler: Scaler,
) {
  const radius = scaler.scale(getRadius(node.radius ?? 'none'))
  const borderWidth = node.border ? scaler.scale(getBorder(node.border)) : 0

  context.save()
  context.globalAlpha = node.opacity ?? 1

  if (node.shadow && node.fill) {
    const shadow = getShadow(node.shadow, palette)
    context.shadowColor = shadow.color
    context.shadowBlur = scaler.scale(shadow.blur)
    context.shadowOffsetX = scaler.horizontalScale(shadow.offsetX)
    context.shadowOffsetY = scaler.verticalScale(shadow.offsetY)
  }

  drawRoundedRectPath(context, box, radius)

  if (node.fill) {
    context.fillStyle = getColor(node.fill, palette)
    context.fill()
  }

  if (borderWidth > 0 && node.stroke) {
    context.lineWidth = borderWidth
    context.strokeStyle = getColor(node.stroke, palette)
    context.stroke()
  }

  context.restore()
}
