import type { ExperienceTemplateConfig, ExperienceTemplateId } from '../core/types'
import { supportFrameTemplateEngineConfig } from './support-frame/support-frame.template'

const templateRegistry: Partial<Record<ExperienceTemplateId, ExperienceTemplateConfig>> = {
  'support-frame': supportFrameTemplateEngineConfig,
}

export function getTemplateConfig(templateId: ExperienceTemplateId): ExperienceTemplateConfig {
  return templateRegistry[templateId] ?? supportFrameTemplateEngineConfig
}

export function listTemplateConfigs(): ExperienceTemplateConfig[] {
  return Object.values(templateRegistry)
}
