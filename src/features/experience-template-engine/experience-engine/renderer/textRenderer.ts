import {
  type ColorPalette,
} from '../design-system'
import type { Scaler } from '../core/scale'
import type { TextNode } from '../core/types'
import {
  renderCandidateName,
  renderCandidateNumber,
  renderDefaultText,
  renderHashtag,
} from './textComponents'
import type { RenderBox } from './rendering'

export function renderTextNode(
  context: CanvasRenderingContext2D,
  node: TextNode,
  text: string,
  box: RenderBox,
  palette: ColorPalette,
  scaler: Scaler,
) {
  context.save()
  context.globalAlpha = node.opacity ?? 1

  if (node.component === 'hashtag') {
    renderHashtag(context, node, text, box, palette, scaler)
    context.restore()
    return
  }

  if (node.component === 'candidateName') {
    renderCandidateName(context, node, text, box, palette, scaler)
    context.restore()
    return
  }

  if (node.component === 'candidateNumber') {
    renderCandidateNumber(context, node, text, box, palette, scaler)
    context.restore()
    return
  }

  renderDefaultText(context, node, text, box, palette, scaler)
  context.restore()
}
