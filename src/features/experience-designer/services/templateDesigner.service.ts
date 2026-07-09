import { templateManager } from '../../experience-template-engine/services/templateManager'
import type { ExperienceTemplateId } from '../../experience-template-engine/types/template'
import { toDesignerModel, toEngineTemplate } from '../adapters/templateDesigner.adapter'
import { templateDesignerRepository } from './templateDesigner.repository'

export function loadDesignerTemplate(templateId: ExperienceTemplateId) {
  const persisted = templateDesignerRepository.get(templateId)
  if (persisted) {
    const engineTemplate = toEngineTemplate(persisted)
    templateManager.setOverride(templateId, engineTemplate)
    return persisted
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

  templateManager.setOverride(templateId, toEngineTemplate(persisted))
}

export function saveDesignerTemplate(templateId: ExperienceTemplateId, model: ReturnType<typeof loadDesignerTemplate>) {
  templateDesignerRepository.save(templateId, model)
  templateManager.setOverride(templateId, toEngineTemplate(model))
}
