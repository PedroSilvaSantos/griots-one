import { getBorder, getColor, getRadius, getShadow, type ColorPalette } from '../design-system'
import type { Scaler } from '../core/scale'
import type { ShapeNode } from '../core/types'

type Box = {
  x: number
  y: number
  width: number
  height: number
}

function roundRect(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  const r = Math.max(0, Math.min(radius, Math.min(width, height) / 2))
  context.beginPath()
  context.moveTo(x + r, y)
  context.arcTo(x + width, y, x + width, y + height, r)
  context.arcTo(x + width, y + height, x, y + height, r)
  context.arcTo(x, y + height, x, y, r)
  context.arcTo(x, y, x + width, y, r)
  context.closePath()
}

export function renderShapeNode(
  context: CanvasRenderingContext2D,
  node: ShapeNode,
  box: Box,
  palette: ColorPalette,
  scaler: Scaler,
) {
  const radius = scaler.scale(getRadius(node.radius ?? 'none'))
  const borderWidth = node.border ? scaler.scale(getBorder(node.border)) : 0

  context.save()
  context.globalAlpha = node.opacity ?? 1

  if (node.shadow) {
    const shadow = getShadow(node.shadow, palette)
    context.shadowColor = shadow.color
    context.shadowBlur = scaler.scale(shadow.blur)
    context.shadowOffsetX = scaler.horizontalScale(shadow.offsetX)
    context.shadowOffsetY = scaler.verticalScale(shadow.offsetY)
  }

  context.fillStyle = getColor(node.fill, palette)
  roundRect(context, box.x, box.y, box.width, box.height, radius)
  context.fill()

  if (borderWidth > 0 && node.stroke) {
    context.lineWidth = borderWidth
    context.strokeStyle = getColor(node.stroke, palette)
    roundRect(context, box.x, box.y, box.width, box.height, radius)
    context.stroke()
  }

  context.restore()
}
