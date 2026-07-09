export type RenderBox = {
  x: number
  y: number
  width: number
  height: number
}

type RenderableNode = {
  visible?: boolean
  opacity?: number
}

export function isNodeVisible(node: RenderableNode) {
  return node.visible !== false && (node.opacity ?? 1) > 0
}

export function drawRoundedRectPath(
  context: CanvasRenderingContext2D,
  box: RenderBox,
  radius: number,
) {
  const r = Math.max(0, Math.min(radius, Math.min(box.width, box.height) / 2))

  context.beginPath()
  context.moveTo(box.x + r, box.y)
  context.arcTo(box.x + box.width, box.y, box.x + box.width, box.y + box.height, r)
  context.arcTo(box.x + box.width, box.y + box.height, box.x, box.y + box.height, r)
  context.arcTo(box.x, box.y + box.height, box.x, box.y, r)
  context.arcTo(box.x, box.y, box.x + box.width, box.y, r)
  context.closePath()
}
