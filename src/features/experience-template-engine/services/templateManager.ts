import { getTemplateConfig, listTemplateConfigs } from '../experience-engine/templates/template.registry'
import type { ExperienceTemplateConfig, ExperienceTemplateId } from '../types/template'

export class TemplateManager {
  private overrides = new Map<ExperienceTemplateId, ExperienceTemplateConfig>()

  list(): ExperienceTemplateConfig[] {
    return listTemplateConfigs().map((template) => this.overrides.get(template.id) ?? template)
  }

  get(templateId: ExperienceTemplateId): ExperienceTemplateConfig {
    return this.overrides.get(templateId) ?? getTemplateConfig(templateId)
  }

  getBase(templateId: ExperienceTemplateId): ExperienceTemplateConfig {
    return getTemplateConfig(templateId)
  }

  setOverride(templateId: ExperienceTemplateId, config: ExperienceTemplateConfig) {
    this.overrides.set(templateId, config)
  }

  clearOverride(templateId: ExperienceTemplateId) {
    this.overrides.delete(templateId)
  }
}

export const templateManager = new TemplateManager()
