import { getBorder, getColor, getRadius, getShadow, type ColorPalette } from '../design-system'
import type { Scaler } from '../core/scale'
import type { ImageNode } from '../core/types'

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

function drawFitImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  box: Box,
  fit: 'cover' | 'contain',
  cropMode: 'center' | 'smart',
) {
  const ratioX = box.width / image.width
  const ratioY = box.height / image.height
  const ratio = fit === 'contain' ? Math.min(ratioX, ratioY) : Math.max(ratioX, ratioY)

  const drawWidth = image.width * ratio
  const drawHeight = image.height * ratio

  if (fit === 'contain') {
    const x = box.x + (box.width - drawWidth) / 2
    const y = box.y + (box.height - drawHeight) / 2
    context.drawImage(image, x, y, drawWidth, drawHeight)
    return
  }

  if (cropMode === 'smart') {
    const overflowX = Math.max(0, drawWidth - box.width)
    const overflowY = Math.max(0, drawHeight - box.height)

    const focusX = 0.5
    const focusY = 0.34

    const x = box.x - overflowX * focusX
    const y = box.y - overflowY * focusY
    context.drawImage(image, x, y, drawWidth, drawHeight)
    return
  }

  const x = box.x + (box.width - drawWidth) / 2
  const y = box.y + (box.height - drawHeight) / 2
  context.drawImage(image, x, y, drawWidth, drawHeight)
}

export function renderImageNode(
  context: CanvasRenderingContext2D,
  node: ImageNode,
  image: HTMLImageElement,
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

  if (node.mask === 'circle') {
    const radiusCircle = Math.min(box.width, box.height) / 2
    context.beginPath()
    context.arc(box.x + box.width / 2, box.y + box.height / 2, radiusCircle, 0, Math.PI * 2)
    context.closePath()
    context.clip()
  } else {
    roundRect(
      context,
      box.x,
      box.y,
      box.width,
      box.height,
      node.mask === 'rounded' ? scaler.scale(getRadius('lg')) : radius,
    )
    context.clip()
  }

  drawFitImage(context, image, box, node.fit ?? 'cover', node.cropMode ?? 'center')
  context.restore()

  if (borderWidth > 0) {
    context.save()
    context.lineWidth = borderWidth
    context.strokeStyle = getColor(node.borderColor ?? 'Surface', palette)
    roundRect(context, box.x, box.y, box.width, box.height, radius)
    context.stroke()
    context.restore()
  }
}
