import { useCallback, useEffect, useMemo, useState } from 'react'
import { CAMPAIGNS_STORAGE_KEY, createEmptyCampaign } from '../mocks/campaign'
import type { Campaign } from '../types/campaign'

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

  return `cmp-${Date.now()}`
}

function readCampaigns() {
  const raw = localStorage.getItem(CAMPAIGNS_STORAGE_KEY)

  if (!raw) return [] as Campaign[]

  try {
    const parsed = JSON.parse(raw) as Campaign[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return [] as Campaign[]
  }
}

function writeCampaigns(campaigns: Campaign[]) {
  localStorage.setItem(CAMPAIGNS_STORAGE_KEY, JSON.stringify(campaigns))
}

export function useCampaign(campaignId?: string) {
  const [campaign, setCampaign] = useState<Campaign>(createEmptyCampaign)
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    const campaigns = readCampaigns()

    if (!campaignId) {
      setCampaign(createEmptyCampaign())
      setIsSaved(false)
      return
    }

    const existing = campaigns.find((item) => item.id === campaignId)

    if (existing) {
      setCampaign(existing)
      setIsSaved(true)
      return
    }

    setCampaign(createEmptyCampaign())
    setIsSaved(false)
  }, [campaignId])

  const updateField = useCallback(<K extends keyof Campaign>(field: K, value: Campaign[K]) => {
    setCampaign((current) => ({ ...current, [field]: value }))
  }, [])

  const updateColors = useCallback(<K extends keyof Campaign['colors']>(field: K, value: Campaign['colors'][K]) => {
    setCampaign((current) => ({
      ...current,
      colors: {
        ...current.colors,
        [field]: value,
      },
    }))
  }, [])

  const updateTexts = useCallback(<K extends keyof Campaign['texts']>(field: K, value: Campaign['texts'][K]) => {
    setCampaign((current) => ({
      ...current,
      texts: {
        ...current.texts,
        [field]: value,
      },
    }))
  }, [])

  const updateSocials = useCallback(
    <K extends keyof Campaign['socials']>(field: K, value: Campaign['socials'][K]) => {
      setCampaign((current) => ({
        ...current,
        socials: {
          ...current.socials,
          [field]: value,
        },
      }))
    },
    [],
  )

  const updateSettings = useCallback(
    <K extends keyof Campaign['settings']>(field: K, value: Campaign['settings'][K]) => {
      setCampaign((current) => ({
        ...current,
        settings: {
          ...current.settings,
          [field]: value,
        },
      }))
    },
    [],
  )

  const updateAsset = useCallback((field: 'logo' | 'hero' | 'frame' | 'background', value: string) => {
    setCampaign((current) => ({
      ...current,
      [field]: value,
    }))
  }, [])

  const updateAssetFile = useCallback(async (field: 'logo' | 'hero' | 'frame' | 'background', file: File) => {
    const dataUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => resolve(String(reader.result ?? ''))
      reader.onerror = () => reject(new Error('file-read-error'))
      reader.readAsDataURL(file)
    })

    setCampaign((current) => ({
      ...current,
      [field]: dataUrl,
    }))
  }, [])

  const saveCampaign = useCallback(
    (nextStatus?: Campaign['status']) => {
      const slug = slugify(campaign.slug || campaign.name)
      const nextId = campaign.id || createId()
      const normalized: Campaign = {
        ...campaign,
        id: nextId,
        slug,
        status: nextStatus ?? campaign.status,
      }

      const campaigns = readCampaigns()
      const index = campaigns.findIndex((item) => item.id === nextId)

      if (index >= 0) {
        campaigns[index] = normalized
      } else {
        campaigns.unshift(normalized)
      }

      writeCampaigns(campaigns)
      setCampaign(normalized)
      setIsSaved(true)

      return normalized
    },
    [campaign],
  )

  const previewPath = useMemo(() => `/demo/${slugify(campaign.slug || campaign.name || 'dr-viralata')}`, [campaign.name, campaign.slug])

  return {
    campaign,
    isSaved,
    previewPath,
    updateField,
    updateColors,
    updateTexts,
    updateSocials,
    updateSettings,
    updateAsset,
    updateAssetFile,
    saveCampaign,
  }
}
