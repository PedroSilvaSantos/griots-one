import type { ExperienceTemplateId } from '../../experience-template-engine/experience-engine/core/types'
import type { DesignerStoredTemplate, DesignerTemplateModel } from '../types/designer'

const STORAGE_KEY = 'griots.template-designer'

type TemplateDesignerRepository = {
  get(templateId: ExperienceTemplateId): DesignerTemplateModel | null
  save(templateId: ExperienceTemplateId, model: DesignerTemplateModel): void
}

function readAll(): DesignerStoredTemplate[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as DesignerStoredTemplate[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function saveAll(entries: DesignerStoredTemplate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries))
}

class LocalStorageTemplateDesignerRepository implements TemplateDesignerRepository {
  get(templateId: ExperienceTemplateId) {
    return readAll().find((entry) => entry.templateId === templateId)?.model ?? null
  }

  save(templateId: ExperienceTemplateId, model: DesignerTemplateModel) {
    const entries = readAll()
    const next: DesignerStoredTemplate = {
      templateId,
      model,
      updatedAt: new Date().toISOString(),
    }

    const index = entries.findIndex((entry) => entry.templateId === templateId)
    if (index >= 0) {
      entries[index] = next
    } else {
      entries.push(next)
    }

    saveAll(entries)
  }
}

export const templateDesignerRepository: TemplateDesignerRepository = new LocalStorageTemplateDesignerRepository()
