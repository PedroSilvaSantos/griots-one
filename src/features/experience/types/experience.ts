import type { ExperienceTemplateId } from '../../../features/experience-template-engine/types/template'

export type ExperienceCategory =
  | 'Campanha'
  | 'Evento'
  | 'Empresa'
  | 'Institucional'
  | 'Esporte'
  | 'Formatura'
  | 'Show'
  | 'Outro'

export type ExperienceStatus = 'draft' | 'published'

export interface Experience {
  id: string
  name: string
  slug: string
  category: ExperienceCategory
  status: ExperienceStatus
  template: {
    id: ExperienceTemplateId
  }
  brand: {
    logo: string
    secondaryLogo: string
    userPhoto: string
    candidatePhoto: string
    hero: string
    background: string
    frame: string
  }
  theme: {
    primary: string
    secondary: string
    accent: string
    button: string
    backgroundStart: string
    backgroundEnd: string
    text: string
    mutedText: string
    surface: string
    shadow: string
    onPrimary: string
    frame: string
    radius: number
  }
  content: {
    title: string
    subtitle: string
    cta: string
    features: string
    footer: string
    candidateName: string
    candidateNumber: string
    hashtag: string
    topLeftText: string
    topRightText: string
    bottomLine1: string
    bottomLine2: string
    party: string
  }
  social: {
    instagram: string
    facebook: string
    tiktok: string
    linkedin: string
    website: string
  }
  settings: {
    download: boolean
    share: boolean
    analytics: boolean
    gallery: boolean
  }
  createdAt: string
  updatedAt: string
}
