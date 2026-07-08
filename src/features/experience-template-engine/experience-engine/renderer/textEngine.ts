import { getColor, getShadow, type ColorPalette } from '../design-system'
import type { Scaler } from '../core/scale'
import type { HorizontalAlign, TypographyStyle, VerticalAlign } from '../core/types'

type TextBox = {
  x: number
  y: number
  width: number
  height: number
}

type FitTextInput = {
  text: string
  style: TypographyStyle
  maxWidth: number
  maxHeight: number
  maxLines: number
  minFontSize: number
}

type RenderTextInput = {
  text: string
  box: TextBox
  style: TypographyStyle
  align: HorizontalAlign
  verticalAlign: VerticalAlign
  maxLines: number
  minFontSize: number
  autoScale: boolean
  enableEllipsis: boolean
}

function drawLetterSpacedText(
  context: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  letterSpacing: number,
) {
  if (letterSpacing === 0) {
    context.fillText(text, x, y)
    return
  }

  let cursor = x
  Array.from(text).forEach((char) => {
    context.fillText(char, cursor, y)
    cursor += context.measureText(char).width + letterSpacing
  })
}

function splitLongWord(
  context: CanvasRenderingContext2D,
  word: string,
  maxWidth: number,
  letterSpacing: number,
) {
  const chunks: string[] = []
  let current = ''

  Array.from(word).forEach((char) => {
    const candidate = `${current}${char}`
    const candidateWidth = context.measureText(candidate).width + Math.max(0, candidate.length - 1) * letterSpacing

    if (candidateWidth > maxWidth && current) {
      chunks.push(current)
      current = char
      return
    }

    current = candidate
  })

  if (current) chunks.push(current)
  return chunks
}

function horizontalOffset(align: HorizontalAlign, x: number, width: number, textWidth: number) {
  if (align === 'center') return x + (width - textWidth) / 2
  if (align === 'right') return x + width - textWidth
  return x
}

function verticalOffset(align: VerticalAlign, y: number, height: number, contentHeight: number) {
  if (align === 'middle') return y + (height - contentHeight) / 2
  if (align === 'bottom') return y + height - contentHeight
  return y
}

function ellipsis(
  context: CanvasRenderingContext2D,
  line: string,
  maxWidth: number,
  letterSpacing: number,
) {
  const lineWidth = context.measureText(line).width + Math.max(0, line.length - 1) * letterSpacing
  if (lineWidth <= maxWidth) return line

  let trimmed = line
  while (trimmed.length) {
    const candidate = `${trimmed.trimEnd()}...`
    const candidateWidth = context.measureText(candidate).width + Math.max(0, candidate.length - 1) * letterSpacing
    if (candidateWidth <= maxWidth) return candidate
    trimmed = trimmed.slice(0, -1)
  }

  return '...'
}

export const TextEngine = {
  measureText(context: CanvasRenderingContext2D, text: string) {
    return context.measureText(text).width
  },

  maximumWidth(box: TextBox) {
    return box.width
  },

  maximumHeight(box: TextBox) {
    return box.height
  },

  wrapText(
    context: CanvasRenderingContext2D,
    text: string,
    maxWidth: number,
    letterSpacing = 0,
  ) {
    const lines: string[] = []
    const paragraphs = text.split(/\n+/)

    paragraphs.forEach((paragraph) => {
      const words = paragraph.split(/\s+/).filter(Boolean)
      if (!words.length) {
        lines.push('')
        return
      }

      let line = ''
      words.forEach((word) => {
        const safeWords = splitLongWord(context, word, maxWidth, letterSpacing)
        safeWords.forEach((safeWord, safeWordIndex) => {
          const candidate = line ? `${line} ${safeWord}` : safeWord
          const candidateWidth = context.measureText(candidate).width + Math.max(0, candidate.length - 1) * letterSpacing

          if (candidateWidth > maxWidth && line) {
            lines.push(line)
            line = safeWord
            return
          }

          line = candidate

          const isLastSafeWord = safeWordIndex === safeWords.length - 1
          if (!isLastSafeWord && line) {
            lines.push(line)
            line = ''
          }
        })
      })

      if (line) lines.push(line)
    })

    return lines
  },

  fitText(context: CanvasRenderingContext2D, input: FitTextInput) {
    const {
      text,
      style,
      maxWidth,
      maxHeight,
      maxLines,
      minFontSize,
    } = input

    let fontSize = style.fontSize

    while (fontSize >= minFontSize) {
      const ratio = fontSize / style.fontSize
      const lineHeight = style.lineHeight * ratio
      const letterSpacing = style.letterSpacing * ratio

      context.font = `${style.fontWeight} ${fontSize}px ${style.fontFamily}`
      const lines = this.wrapText(context, text, maxWidth, letterSpacing)

      if (lines.length <= maxLines && lines.length * lineHeight <= maxHeight) {
        return {
          style: {
            ...style,
            fontSize,
            lineHeight,
            letterSpacing,
          },
          lines,
        }
      }

      fontSize -= 1
    }

    const ratio = minFontSize / style.fontSize
    context.font = `${style.fontWeight} ${minFontSize}px ${style.fontFamily}`
    return {
      style: {
        ...style,
        fontSize: minFontSize,
        lineHeight: style.lineHeight * ratio,
        letterSpacing: style.letterSpacing * ratio,
      },
      lines: this.wrapText(context, text, maxWidth, style.letterSpacing * ratio),
    }
  },

  autoScale(context: CanvasRenderingContext2D, input: FitTextInput) {
    return this.fitText(context, input)
  },

  center(align: HorizontalAlign, verticalAlignValue: VerticalAlign, box: TextBox, textWidth: number, contentHeight: number) {
    return {
      x: horizontalOffset(align, box.x, box.width, textWidth),
      y: verticalOffset(verticalAlignValue, box.y, box.height, contentHeight),
    }
  },

  stroke(
    context: CanvasRenderingContext2D,
    value: string,
    x: number,
    y: number,
    strokeToken: TypographyStyle['stroke'],
    strokeWidth: number,
    palette: ColorPalette,
  ) {
    if (!strokeToken || strokeWidth <= 0) return
    context.strokeStyle = getColor(strokeToken, palette)
    context.lineWidth = strokeWidth
    context.lineJoin = 'round'
    context.strokeText(value, x, y)
  },

  shadow(context: CanvasRenderingContext2D, shadowToken: TypographyStyle['shadow'], scaler: Scaler, palette: ColorPalette) {
    if (!shadowToken) return
    const shadow = getShadow(shadowToken, palette)
    context.shadowColor = shadow.color
    context.shadowBlur = scaler.scale(shadow.blur)
    context.shadowOffsetX = scaler.horizontalScale(shadow.offsetX)
    context.shadowOffsetY = scaler.verticalScale(shadow.offsetY)
  },

  ellipsis,

  render(
    context: CanvasRenderingContext2D,
    palette: ColorPalette,
    scaler: Scaler,
    input: RenderTextInput,
  ) {
    const {
      text,
      box,
      style,
      align,
      verticalAlign,
      maxLines,
      minFontSize,
      autoScale,
      enableEllipsis,
    } = input

    const fitted = autoScale
      ? this.autoScale(context, {
          text,
          style,
          maxWidth: this.maximumWidth(box),
          maxHeight: this.maximumHeight(box),
          maxLines,
          minFontSize,
        })
      : {
          style,
          lines: this.wrapText(context, text, this.maximumWidth(box), style.letterSpacing),
        }

    const lines = fitted.lines.slice(0, maxLines)
    if (!lines.length) return

    context.save()
    context.font = `${fitted.style.fontWeight} ${fitted.style.fontSize}px ${fitted.style.fontFamily}`
    context.fillStyle = getColor(fitted.style.color, palette)
    context.textBaseline = 'top'
    context.textAlign = 'left'
    context.imageSmoothingEnabled = true
    context.imageSmoothingQuality = 'high'

    this.shadow(context, fitted.style.shadow, scaler, palette)

    const blockHeight = lines.length * fitted.style.lineHeight
    const initialY = verticalOffset(verticalAlign, box.y, box.height, blockHeight)

    lines.forEach((line, index) => {
      const lineValue = enableEllipsis && index === lines.length - 1
        ? this.ellipsis(context, line, box.width, fitted.style.letterSpacing)
        : line

      const width = this.measureText(context, lineValue) + Math.max(0, lineValue.length - 1) * fitted.style.letterSpacing
      const centered = this.center(align, 'top', { ...box, y: initialY + index * fitted.style.lineHeight }, width, fitted.style.lineHeight)

      this.stroke(
        context,
        lineValue,
        centered.x,
        centered.y,
        fitted.style.stroke,
        fitted.style.strokeWidth ?? 0,
        palette,
      )

      drawLetterSpacedText(context, lineValue, centered.x, centered.y, fitted.style.letterSpacing)
    })

    context.restore()
  },
}
