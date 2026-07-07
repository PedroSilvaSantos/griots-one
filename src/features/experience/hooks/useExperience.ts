import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  createExperience,
  getExperienceById,
  updateExperience,
} from '../../../services/experience.service'
import { createEmptyExperience } from '../mocks/experience'
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

export function useExperience(experienceId?: string) {
  const [experience, setExperience] = useState<Experience>(createEmptyExperience)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    if (!experienceId) {
      setExperience(createEmptyExperience())
      setIsSaved(false)
      setError('')
      return
    }

    const existing = getExperienceById(experienceId)

    if (existing) {
      setExperience(existing)
      setIsSaved(true)
      setError('')
      return
    }

    setExperience(createEmptyExperience())
    setIsSaved(false)
    setError('Experiencia nao encontrada.')
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
      const payload: Experience = {
        ...experience,
        slug: slugify(experience.slug || experience.name),
        status: nextStatus ?? experience.status,
      }

      try {
        const saved = experience.id ? updateExperience(payload) : createExperience(payload)
        setExperience(saved)
        setIsSaved(true)
        setError('')

        return saved
      } catch (reason) {
        setError(reason instanceof Error ? reason.message : 'Falha ao salvar experiencia.')
        return null
      }
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
    error,
    clearError: () => setError(''),
  }
}
