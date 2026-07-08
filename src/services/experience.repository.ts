import { createEmptyExperience } from '../features/experience/mocks/experience'
import type { Experience } from '../features/experience/types/experience'

const STORAGE_KEY = 'griots.experiences'

function sanitizePersistedExperience(experience: Experience): Experience {
  const defaults = createEmptyExperience()
  const isHexColor = (value: unknown) => typeof value === 'string' && /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)

  return {
    ...defaults,
    ...experience,
    brand: {
      ...defaults.brand,
      ...experience.brand,
    },
    theme: {
      ...defaults.theme,
      ...experience.theme,
      surface: isHexColor(experience.theme?.surface) ? String(experience.theme.surface) : defaults.theme.surface,
      frame: isHexColor(experience.theme?.frame) ? String(experience.theme.frame) : defaults.theme.frame,
    },
    content: {
      ...defaults.content,
      ...experience.content,
    },
    template: {
      ...defaults.template,
      ...experience.template,
    },
  }
}

export interface ExperienceRepository {
  getAll(): Experience[]
  saveAll(experiences: Experience[]): void
}

class LocalStorageExperienceRepository implements ExperienceRepository {
  getAll(): Experience[] {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []

    try {
      const parsed = JSON.parse(raw) as Experience[]
      if (!Array.isArray(parsed)) return []

      return parsed.map((item) => sanitizePersistedExperience(item))
    } catch {
      return []
    }
  }

  saveAll(experiences: Experience[]): void {
    const sanitized = experiences.map((item) => sanitizePersistedExperience(item))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized))
  }
}

export const experienceRepository: ExperienceRepository = new LocalStorageExperienceRepository()
