import { useMemo } from 'react'
import type { Experience } from './types/experience'
import { getExperienceBySlug } from '../../services/experience.service'

type UseExperienceLoaderResult = {
  experience: Experience | null
  notFound: boolean
}

export function useExperienceLoader(slug: string): UseExperienceLoaderResult {
  return useMemo(() => {
    if (!slug) return { experience: null, notFound: true }

    const experience = getExperienceBySlug(slug)
    if (!experience) {
      return { experience: null, notFound: true }
    }

    return { experience, notFound: false }
  }, [slug])
}
