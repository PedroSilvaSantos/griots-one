import { templateManager } from '../../experience-template-engine/services/templateManager'
import type { ExperienceTemplateId } from '../../experience-template-engine/types/template'
import { toDesignerModel, toEngineTemplate } from '../adapters/templateDesigner.adapter'
import { normalizeDesignerTemplateModel } from './templateDesigner.normalizer'
import { templateDesignerRepository } from './templateDesigner.repository'

export function loadDesignerTemplate(templateId: ExperienceTemplateId) {
  const persisted = templateDesignerRepository.get(templateId)
  if (persisted) {
    const normalized = normalizeDesignerTemplateModel(templateId, persisted)
    const engineTemplate = toEngineTemplate(normalized)
    templateManager.setOverride(templateId, engineTemplate)
    return normalized
  }

  const baseTemplate = templateManager.getBase(templateId)
  return toDesignerModel(baseTemplate)
}

export function applyDesignerTemplate(templateId: ExperienceTemplateId) {
  const persisted = templateDesignerRepository.get(templateId)
  if (!persisted) {
    templateManager.clearOverride(templateId)
    return
  }

  const normalized = normalizeDesignerTemplateModel(templateId, persisted)
  templateManager.setOverride(templateId, toEngineTemplate(normalized))
}

export function saveDesignerTemplate(templateId: ExperienceTemplateId, model: ReturnType<typeof loadDesignerTemplate>) {
  const normalized = normalizeDesignerTemplateModel(templateId, model)
  templateDesignerRepository.save(templateId, normalized)
  templateManager.setOverride(templateId, toEngineTemplate(normalized))
}
