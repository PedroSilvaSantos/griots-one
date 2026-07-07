import { useCallback, useEffect, useMemo, useState } from 'react'
import { EXPERIENCES_STORAGE_KEY, createEmptyExperience } from '../mocks/experience'
import type { Experience } from '../types/experience'

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

function readExperiences() {
  const raw = localStorage.getItem(EXPERIENCES_STORAGE_KEY)

  if (!raw) return [] as Experience[]

  try {
    const parsed = JSON.parse(raw) as Experience[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return [] as Experience[]
  }
}

function writeExperiences(experiences: Experience[]) {
  localStorage.setItem(EXPERIENCES_STORAGE_KEY, JSON.stringify(experiences))
}

export function useExperience(experienceId?: string) {
  const [experience, setExperience] = useState<Experience>(createEmptyExperience)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const experiences = readExperiences()

    if (!experienceId) {
      setExperience(createEmptyExperience())
      setIsSaved(false)
      return
    }

    const existing = experiences.find((item) => item.id === experienceId)

    if (existing) {
      setExperience(existing)
      setIsSaved(true)
      return
    }

    setExperience(createEmptyExperience())
    setIsSaved(false)
  }, [experienceId])

  const updateField = useCallback(<K extends keyof Experience>(field: K, value: Experience[K]) => {
    setExperience((current) => ({
      ...current,
      [field]: value,
    }))
  }, [])

  const updateBrand = useCallback(<K extends keyof Experience['brand']>(field: K, value: Experience['brand'][K]) => {
    setExperience((current) => ({
      ...current,
      brand: {
        ...current.brand,
        [field]: value,
      },
    }))
  }, [])

  const updateBrandFile = useCallback(async (field: keyof Experience['brand'], file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => resolve(String(reader.result ?? ''))
      reader.onerror = () => reject(new Error('file-read-error'))
      reader.readAsDataURL(file)
    })

    setExperience((current) => ({
      ...current,
      brand: {
        ...current.brand,
        [field]: dataUrl,
      },
    }))
  }, [])

  const updateTheme = useCallback(<K extends keyof Experience['theme']>(field: K, value: Experience['theme'][K]) => {
    setExperience((current) => ({
      ...current,
      theme: {
        ...current.theme,
        [field]: value,
      },
    }))
  }, [])

  const updateContent = useCallback(
    <K extends keyof Experience['content']>(field: K, value: Experience['content'][K]) => {
      setExperience((current) => ({
        ...current,
        content: {
          ...current.content,
          [field]: value,
        },
      }))
    },
    [],
  )

  const updateSocial = useCallback(<K extends keyof Experience['social']>(field: K, value: Experience['social'][K]) => {
    setExperience((current) => ({
      ...current,
      social: {
        ...current.social,
        [field]: value,
      },
    }))
  }, [])

  const updateSetting = useCallback(
    <K extends keyof Experience['settings']>(field: K, value: Experience['settings'][K]) => {
      setExperience((current) => ({
        ...current,
        settings: {
          ...current.settings,
          [field]: value,
        },
      }))
    },
    [],
  )

  const saveExperience = useCallback(
    (nextStatus?: Experience['status']) => {
      const now = new Date().toISOString()
      const slug = slugify(experience.slug || experience.name)
      const nextId = experience.id || createId()
      const normalized: Experience = {
        ...experience,
        id: nextId,
        slug,
        status: nextStatus ?? experience.status,
        createdAt: experience.createdAt || now,
        updatedAt: now,
      }

      const experiences = readExperiences()
      const index = experiences.findIndex((item) => item.id === nextId)

      if (index >= 0) {
        experiences[index] = normalized
      } else {
        experiences.unshift(normalized)
      }

      writeExperiences(experiences)
      setExperience(normalized)
      setIsSaved(true)

      return normalized
    },
    [experience],
  )

  const previewPath = useMemo(
    () => `/demo/${slugify(experience.slug || experience.name || 'griots-experience')}`,
    [experience.name, experience.slug],
  )

  return {
    experience,
    isSaved,
    previewPath,
    updateField,
    updateBrand,
    updateBrandFile,
    updateTheme,
    updateContent,
    updateSocial,
    updateSetting,
    saveExperience,
  }
}
