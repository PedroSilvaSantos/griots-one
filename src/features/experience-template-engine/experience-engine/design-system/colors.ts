import type { ColorToken } from '../core/types'

export type ColorPalette = Record<ColorToken, string>

export const baseColors: ColorPalette = {
  Primary: '#10233f',
  Secondary: '#365f93',
  Background: '#eef3f6',
  Surface: '#ffffff',
  White: '#ffffff',
  Black: '#000000',
  Border: '#d5dde4',
  Accent: '#0f766e',
  Danger: '#dc2626',
  Success: '#16a34a',
  BackgroundStart: '#eef3f6',
  BackgroundEnd: '#dfe8f4',
  Text: '#10233f',
  MutedText: '#526173',
  OnPrimary: '#ffffff',
  Shadow: 'rgba(16, 35, 63, 0.18)',
}
