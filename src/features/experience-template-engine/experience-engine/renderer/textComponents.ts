import type { Scaler } from '../core/scale'
import { getTypography, type ColorPalette } from '../design-system'
import type { TextNode } from '../core/types'
import { TextEngine } from './textEngine'

type Box = {
  x: number
  y: number
  width: number
  height: number
}

function createScaledTypography(node: TextNode, scaler: Scaler) {
  const typography = getTypography(node.typography)
  return {
    ...typography,
    fontSize: scaler.fontScale(typography.fontSize),
    lineHeight: scaler.verticalScale(typography.lineHeight),
    letterSpacing: scaler.horizontalScale(typography.letterSpacing),
    strokeWidth: typography.strokeWidth ? Math.max(1, scaler.scale(typography.strokeWidth)) : undefined,
  }
}

export function renderDefaultText(
  context: CanvasRenderingContext2D,
  node: TextNode,
  text: string,
  box: Box,
  palette: ColorPalette,
  scaler: Scaler,
) {
  const style = createScaledTypography(node, scaler)
  const targetText = (node.uppercase || style.textTransform === 'uppercase') ? text.toUpperCase() : text

  TextEngine.render(context, palette, scaler, {
    text: targetText,
    box,
    style,
    align: node.horizontalAlign ?? style.textAlign ?? 'left',
    verticalAlign: node.verticalAlign ?? 'top',
    maxLines: node.maxLines ?? 3,
    minFontSize: node.minFontSize ? scaler.fontScale(node.minFontSize) : scaler.fontScale(12),
    autoScale: node.autoFit ?? true,
    enableEllipsis: node.ellipsis ?? false,
  })
}

export function renderHashtag(
  context: CanvasRenderingContext2D,
  node: TextNode,
  text: string,
  box: Box,
  palette: ColorPalette,
  scaler: Scaler,
) {
  const style = createScaledTypography(node, scaler)
  const paddedBox = {
    x: box.x + scaler.horizontalScale(20),
    y: box.y + scaler.verticalScale(10),
    width: box.width - scaler.horizontalScale(40),
    height: box.height - scaler.verticalScale(20),
  }

  TextEngine.render(context, palette, scaler, {
    text: text.toUpperCase(),
    box: paddedBox,
    style,
    align: 'center',
    verticalAlign: 'middle',
    maxLines: node.maxLines ?? 3,
    minFontSize: node.minFontSize ? scaler.fontScale(node.minFontSize) : scaler.fontScale(18),
    autoScale: true,
    enableEllipsis: false,
  })
}

export function renderCandidateName(
  context: CanvasRenderingContext2D,
  node: TextNode,
  text: string,
  box: Box,
  palette: ColorPalette,
  scaler: Scaler,
) {
  const style = createScaledTypography(node, scaler)
  const boxWithMargins = {
    x: box.x,
    y: box.y + scaler.verticalScale(8),
    width: box.width,
    height: Math.max(0, box.height - scaler.verticalScale(16)),
  }

  TextEngine.render(context, palette, scaler, {
    text,
    box: boxWithMargins,
    style,
    align: node.horizontalAlign ?? 'left',
    verticalAlign: 'middle',
    maxLines: node.maxLines ?? 2,
    minFontSize: node.minFontSize ? scaler.fontScale(node.minFontSize) : scaler.fontScale(24),
    autoScale: true,
    enableEllipsis: true,
  })
}

export function renderCandidateNumber(
  context: CanvasRenderingContext2D,
  node: TextNode,
  text: string,
  box: Box,
  palette: ColorPalette,
  scaler: Scaler,
) {
  const style = {
    ...createScaledTypography(node, scaler),
    fontWeight: 900,
  }

  TextEngine.render(context, palette, scaler, {
    text,
    box,
    style,
    align: node.horizontalAlign ?? 'left',
    verticalAlign: 'middle',
    maxLines: 1,
    minFontSize: node.minFontSize ? scaler.fontScale(node.minFontSize) : scaler.fontScale(48),
    autoScale: true,
    enableEllipsis: false,
  })
}
