import type { TemplateFont } from '../types/template'

const loadedFamilies = new Set<string>()

export async function ensureFontsLoaded(fonts: TemplateFont[]): Promise<void> {
  if (typeof document === 'undefined' || !fonts.length) return

  await Promise.all(
    fonts.map(async ({ family, weight, style = 'normal' }) => {
      const fontKey = `${style}-${weight}-${family}`
      if (loadedFamilies.has(fontKey)) return

      if ('fonts' in document && document.fonts?.load) {
        await document.fonts.load(`${style} ${weight} 24px ${family}`)
      }

      loadedFamilies.add(fontKey)
    }),
  )

  if ('fonts' in document && document.fonts?.ready) {
    await document.fonts.ready
  }
}
