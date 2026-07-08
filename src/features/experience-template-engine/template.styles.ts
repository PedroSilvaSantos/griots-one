import type { ExperienceTemplateSource } from './types/template'

export const templateStyles = {
  colors: {
    backgroundStart: '#eef3f6',
    backgroundEnd: '#dfe8f4',
    frame: '#d5dde4',
    surface: '#ffffff',
    primary: '#10233f',
    secondary: '#365f93',
    accent: '#0f766e',
    text: '#10233f',
    mutedText: '#526173',
    onPrimary: '#ffffff',
    shadow: 'rgba(16, 35, 63, 0.16)',
  },
  spacing: {
    outerMargin: 54,
    contentPaddingX: 120,
    contentPaddingY: 72,
    elementGap: 20,
    sectionGap: 42,
  },
  radius: {
    outer: 42,
    frame: 38,
    badge: 999,
    card: 28,
    image: 36,
  },
  typography: {
    badge: 20,
    title: 54,
    subtitle: 28,
    body: 20,
    small: 18,
    logo: 22,
  },
} as const

export type HorizontalAlignment = 'left' | 'center' | 'right'
export type VerticalAlignment = 'top' | 'middle' | 'bottom'

export function measureText(context: CanvasRenderingContext2D, text: string) {
  return context.measureText(text).width
}

export function autoWrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number) {
  const paragraphs = text.split(/\n+/)
  const lines: string[] = []

  paragraphs.forEach((paragraph) => {
    const words = paragraph.split(/\s+/).filter(Boolean)
    if (!words.length) {
      lines.push('')
      return
    }

    let currentLine = ''

    words.forEach((word) => {
      const candidate = currentLine ? `${currentLine} ${word}` : word

      if (measureText(context, candidate) > maxWidth && currentLine) {
        lines.push(currentLine)
        currentLine = word
        return
      }

      currentLine = candidate
    })

    if (currentLine) {
      lines.push(currentLine)
    }
  })

  return lines.filter((line, index, array) => !(line === '' && array[index - 1] === ''))
}

export function calculateFontSize(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxFontSize: number,
  fontFamily = 'Manrope',
  minFontSize = 12,
) {
  let fontSize = maxFontSize

  while (fontSize > minFontSize) {
    context.font = `${fontSize}px ${fontFamily}`
    if (measureText(context, text) <= maxWidth) {
      return fontSize
    }

    fontSize -= 1
  }

  return minFontSize
}

export function fitText(
  context: CanvasRenderingContext2D,
  text: string,
  maxWidth: number,
  maxFontSize: number,
  fontFamily = 'Manrope',
  minFontSize = 12,
) {
  const fontSize = calculateFontSize(context, text, maxWidth, maxFontSize, fontFamily, minFontSize)
  context.font = `${fontSize}px ${fontFamily}`
  return { fontSize, text }
}

export function horizontalAlign(alignment: HorizontalAlignment, x: number, boxWidth: number, textWidth: number) {
  if (alignment === 'center') return x + (boxWidth - textWidth) / 2
  if (alignment === 'right') return x + boxWidth - textWidth
  return x
}

export function verticalAlign(alignment: VerticalAlignment, y: number, boxHeight: number, textHeight: number) {
  if (alignment === 'middle') return y + (boxHeight - textHeight) / 2
  if (alignment === 'bottom') return y + boxHeight - textHeight
  return y
}

export function resolveExperienceSource(source: ExperienceTemplateSource, experience: unknown) {
  return source.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in current) {
      return (current as Record<string, unknown>)[key]
    }

    return ''
  }, experience)
}
