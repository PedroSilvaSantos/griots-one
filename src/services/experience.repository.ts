import { createEmptyExperience } from '../features/experience/mocks/experience'
import type { Experience } from '../features/experience/types/experience'

const STORAGE_KEY = 'griots.experiences'

function sanitizePersistedExperience(experience: Experience): Experience {
  return {
    ...createEmptyExperience(),
    ...experience,
    brand: {
      ...createEmptyExperience().brand,
      ...experience.brand,
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
