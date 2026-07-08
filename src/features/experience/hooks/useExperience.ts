import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
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

function isQuotaExceededError(reason: unknown) {
  return (
    reason instanceof DOMException &&
    (reason.name === 'QuotaExceededError' || reason.name === 'NS_ERROR_DOM_QUOTA_REACHED')
  )
}

async function fileToOptimizedDataUrl(file: File) {
  const imageUrl = URL.createObjectURL(file)

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const element = new Image()

      element.onload = () => resolve(element)
      element.onerror = () => reject(new Error('file-read-error'))
      element.src = imageUrl
    })

    const maxDimension = 1280
    const scale = Math.min(1, maxDimension / Math.max(image.width, image.height))
    const width = Math.max(1, Math.round(image.width * scale))
    const height = Math.max(1, Math.round(image.height * scale))

    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height

    const context = canvas.getContext('2d')
    if (!context) {
      throw new Error('file-read-error')
    }

    context.drawImage(image, 0, 0, width, height)

    return canvas.toDataURL('image/webp', 0.82)
  } finally {
    URL.revokeObjectURL(imageUrl)
  }
}

export function useExperience(experienceId?: string) {
  const [experience, setExperience] = useState<Experience>(createEmptyExperience)
  const [isSaved, setIsSaved] = useState(false)
  const [error, setError] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const experienceRef = useRef(experience)
  const pendingUploadsRef = useRef<Promise<void>[]>([])

  useEffect(() => {
    experienceRef.current = experience
  }, [experience])

  const commitExperience = useCallback((nextExperience: Experience) => {
    experienceRef.current = nextExperience
    setExperience(nextExperience)
  }, [])

  useEffect(() => {
    if (!experienceId) {
      const nextExperience = createEmptyExperience()
      commitExperience(nextExperience)
      setIsSaved(false)
      setError('')
      return
    }

    const existing = getExperienceById(experienceId)

    if (existing) {
      commitExperience(existing)
      setIsSaved(true)
      setError('')
      return
    }

    const nextExperience = createEmptyExperience()
    commitExperience(nextExperience)
    setIsSaved(false)
    setError('Experiencia nao encontrada.')
  }, [commitExperience, experienceId])

  const updateField = useCallback(<K extends keyof Experience>(field: K, value: Experience[K]) => {
    const next = {
      ...experienceRef.current,
      [field]: value,
    }

    commitExperience(next)
  }, [commitExperience])

  const updateBrand = useCallback(<K extends keyof Experience['brand']>(field: K, value: Experience['brand'][K]) => {
    const next = {
      ...experienceRef.current,
      brand: {
        ...experienceRef.current.brand,
        [field]: value,
      },
    }

    commitExperience(next)
  }, [commitExperience])

  const updateBrandFile = useCallback(async (field: keyof Experience['brand'], file: File) => {
    const uploadPromise = fileToOptimizedDataUrl(file)

    const applyPromise = uploadPromise.then((dataUrl) => {
      const next = {
        ...experienceRef.current,
        brand: {
          ...experienceRef.current.brand,
          [field]: dataUrl,
        },
      }

      commitExperience(next)
    })

    pendingUploadsRef.current = [...pendingUploadsRef.current, applyPromise]

    try {
      await applyPromise
    } finally {
      pendingUploadsRef.current = pendingUploadsRef.current.filter((pending) => pending !== applyPromise)
    }
  }, [commitExperience])

  const updateTheme = useCallback(<K extends keyof Experience['theme']>(field: K, value: Experience['theme'][K]) => {
    const next = {
      ...experienceRef.current,
      theme: {
        ...experienceRef.current.theme,
        [field]: value,
      },
    }

    commitExperience(next)
  }, [commitExperience])

  const updateContent = useCallback(
    <K extends keyof Experience['content']>(field: K, value: Experience['content'][K]) => {
      const next = {
        ...experienceRef.current,
        content: {
          ...experienceRef.current.content,
          [field]: value,
        },
      }

      commitExperience(next)
    },
    [commitExperience],
  )

  const updateSocial = useCallback(<K extends keyof Experience['social']>(field: K, value: Experience['social'][K]) => {
    const next = {
      ...experienceRef.current,
      social: {
        ...experienceRef.current.social,
        [field]: value,
      },
    }

    commitExperience(next)
  }, [commitExperience])

  const updateSetting = useCallback(
    <K extends keyof Experience['settings']>(field: K, value: Experience['settings'][K]) => {
      const next = {
        ...experienceRef.current,
        settings: {
          ...experienceRef.current.settings,
          [field]: value,
        },
      }

      commitExperience(next)
    },
    [commitExperience],
  )

  const saveExperience = useCallback(
    async (nextStatus?: Experience['status']) => {
      await Promise.all(pendingUploadsRef.current)

      const currentExperience = experienceRef.current
      const payload: Experience = {
        ...currentExperience,
        slug: slugify(currentExperience.slug || currentExperience.name),
        status: nextStatus ?? currentExperience.status,
      }

      setSaving(true)
      setError('')

      try {
        console.info('Iniciando salvamento', { experienceId: currentExperience.id || null, status: payload.status })
        console.info('Payload enviado', payload)

        const response = currentExperience.id ? await updateExperience(payload) : await createExperience(payload)

        console.info('Resposta recebida', response)

        commitExperience(response.experience)
        setIsSaved(true)

        return response
      } catch (reason) {
        console.error('Erro ao salvar', reason)
        if (isQuotaExceededError(reason)) {
          setError('Nao foi possivel salvar: o armazenamento local atingiu o limite.')
          throw new Error('Nao foi possivel salvar: o armazenamento local atingiu o limite.')
        }

        setError(reason instanceof Error ? reason.message : 'Falha ao salvar experiencia.')
        throw reason instanceof Error ? reason : new Error('Falha ao salvar experiencia.')
      } finally {
        setSaving(false)
      }
    },
    [commitExperience],
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
    saving,
    clearError: () => setError(''),
  }
}
