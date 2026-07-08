import type { Experience } from '../../../experience/types/experience'
import type {
  BorderToken,
  ColorToken,
  ExperienceEngineThemeId,
  LayoutRegion,
  RadiusToken,
  ShadowToken,
  SpacingToken,
  TypographyStyle,
  TypographyToken,
} from '../core/types'
import { resolveDataSource } from '../core/data'
import { baseColors, type ColorPalette } from './colors'
import { spacing } from './spacing'
import { radius } from './radius'
import { shadows } from './shadows'
import { borders } from './borders'
import { typography } from './typography'
import { politicalTheme } from './themes/political.theme'
import { premiumTheme } from './themes/premium.theme'
import { minimalTheme } from './themes/minimal.theme'

const themeById: Record<ExperienceEngineThemeId, Partial<ColorPalette>> = {
  political: politicalTheme,
  premium: premiumTheme,
  minimal: minimalTheme,
}

export type { ColorPalette }

export function getThemePalette(themeId: ExperienceEngineThemeId, experience: Experience): ColorPalette {
  const dynamicOverrides: Partial<ColorPalette> = {
    Primary: String(resolveDataSource('theme.primary', experience) || ''),
    Secondary: String(resolveDataSource('theme.secondary', experience) || ''),
    Accent: String(resolveDataSource('theme.accent', experience) || ''),
    BackgroundStart: String(resolveDataSource('theme.backgroundStart', experience) || ''),
    BackgroundEnd: String(resolveDataSource('theme.backgroundEnd', experience) || ''),
    Text: String(resolveDataSource('theme.text', experience) || ''),
    MutedText: String(resolveDataSource('theme.mutedText', experience) || ''),
    Surface: String(resolveDataSource('theme.surface', experience) || ''),
    Border: String(resolveDataSource('theme.frame', experience) || ''),
    OnPrimary: String(resolveDataSource('theme.onPrimary', experience) || ''),
    Shadow: String(resolveDataSource('theme.shadow', experience) || ''),
  }

  return {
    ...baseColors,
    ...themeById[themeId],
    ...Object.fromEntries(Object.entries(dynamicOverrides).filter(([, value]) => Boolean(value))),
  }
}

export function getTypography(token: TypographyToken): TypographyStyle {
  return typography[token]
}

export function getColor(token: ColorToken, palette: ColorPalette): string {
  return palette[token]
}

export function getSpacing(token: SpacingToken): number {
  return spacing[token]
}

export function getRadius(token: RadiusToken): number {
  return radius[token]
}

export function getShadow(token: ShadowToken, palette?: ColorPalette) {
  const shadow = shadows[token]
  if (!palette || token === 'none') {
    return shadow
  }

  return {
    ...shadow,
    color: palette.Shadow,
  }
}

export function getBorder(token: BorderToken): number {
  return borders[token]
}

export function getRegionPadding(region: LayoutRegion): number {
  return region.padding ? getSpacing(region.padding) : 0
}
