import { getTemplateConfig, listTemplateConfigs } from '../experience-engine/templates/template.registry'
import type { ExperienceTemplateConfig, ExperienceTemplateId } from '../types/template'

export class TemplateManager {
  list(): ExperienceTemplateConfig[] {
    return listTemplateConfigs()
  }

  get(templateId: ExperienceTemplateId): ExperienceTemplateConfig {
    return getTemplateConfig(templateId)
  }
}

export const templateManager = new TemplateManager()
