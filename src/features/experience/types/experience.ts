export type ExperienceCategory =
  | 'Campanha'
  | 'Evento'
  | 'Empresa'
  | 'Institucional'
  | 'Esporte'
  | 'Formatura'
  | 'Show'
  | 'Outro'

export type ExperienceStatus = 'Rascunho' | 'Publicado'

export interface Experience {
  id: string
  name: string
  slug: string
  category: ExperienceCategory
  status: ExperienceStatus
  brand: {
    logo: string
    hero: string
    background: string
    frame: string
  }
  theme: {
    primary: string
    secondary: string
    accent: string
    button: string
    radius: number
  }
  content: {
    title: string
    subtitle: string
    cta: string
    features: string
    footer: string
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
