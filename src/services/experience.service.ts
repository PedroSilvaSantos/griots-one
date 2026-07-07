import { createEmptyExperience, experienceCategories } from '../features/experience/mocks/experience'
import type { Experience } from '../features/experience/types/experience'

const STORAGE_KEY = 'griots.experiences'

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '')
}

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `exp-${Date.now()}`
}

function normalizeStatus(status: string) {
  if (status === 'Publicado' || status === 'published') return 'published' as const
  return 'draft' as const
}

function parseStoredExperiences(): Experience[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return []

  try {
    const parsed = JSON.parse(raw) as Experience[]
    if (!Array.isArray(parsed)) return []

    return parsed.map((item) => ({
      ...createEmptyExperience(),
      ...item,
      status: normalizeStatus(String(item.status ?? 'draft')),
    }))
  } catch {
    return []
  }
}

function persist(experiences: Experience[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(experiences))
}

function ensureValidCategory(category: string): asserts category is Experience['category'] {
  if (!experienceCategories.includes(category as Experience['category'])) {
    throw new Error('Categoria invalida.')
  }
}

function ensureValidName(name: string) {
  if (!name.trim()) {
    throw new Error('Nome da experiencia e obrigatorio.')
  }
}

function ensureUniqueSlug(experiences: Experience[], slug: string, id?: string) {
  const duplicated = experiences.find((item) => item.slug === slug && item.id !== id)
  if (duplicated) {
    throw new Error('Slug ja utilizado. Escolha outro.')
  }
}

export function getExperiences(): Experience[] {
  return parseStoredExperiences()
}

export function getExperienceById(id: string): Experience | null {
  if (!id) return null
  return parseStoredExperiences().find((item) => item.id === id) ?? null
}

export function getExperienceBySlug(slug: string): Experience | null {
  if (!slug) return null
  return parseStoredExperiences().find((item) => item.slug === slug) ?? null
}

export function createExperience(payload: Experience): Experience {
  ensureValidName(payload.name)
  ensureValidCategory(payload.category)

  const experiences = parseStoredExperiences()
  const now = new Date().toISOString()
  const slug = slugify(payload.slug || payload.name)

  ensureUniqueSlug(experiences, slug)

  const next: Experience = {
    ...payload,
    id: createId(),
    slug,
    status: normalizeStatus(payload.status),
    createdAt: now,
    updatedAt: now,
  }

  persist([next, ...experiences])
  return next
}

export function updateExperience(payload: Experience): Experience {
  if (!payload.id) {
    throw new Error('ID da experiencia e obrigatorio para atualizar.')
  }

  ensureValidName(payload.name)
  ensureValidCategory(payload.category)

  const experiences = parseStoredExperiences()
  const index = experiences.findIndex((item) => item.id === payload.id)
  if (index < 0) {
    throw new Error('Experiencia nao encontrada para atualizacao.')
  }

  const slug = slugify(payload.slug || payload.name)
  ensureUniqueSlug(experiences, slug, payload.id)

  const updated: Experience = {
    ...payload,
    slug,
    status: normalizeStatus(payload.status),
    updatedAt: new Date().toISOString(),
  }

  experiences[index] = updated
  persist(experiences)
  return updated
}

export function deleteExperience(id: string): void {
  const experiences = parseStoredExperiences()
  persist(experiences.filter((item) => item.id !== id))
}
