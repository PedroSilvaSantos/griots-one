export type CampaignCategory = 'Campanha Politica' | 'Evento' | 'Empresa' | 'Esporte'

export type CampaignStatus = 'Rascunho' | 'Publicado'

export interface Campaign {
  id: string
  name: string
  slug: string
  category: CampaignCategory
  status: CampaignStatus
  logo: string
  hero: string
  frame: string
  background: string
  colors: {
    primary: string
    secondary: string
    accent: string
    button: string
  }
  texts: {
    heroTitle: string
    heroSubtitle: string
    cta: string
    features: string
    footer: string
  }
  socials: {
    instagram: string
    facebook: string
    youtube: string
    tiktok: string
    website: string
  }
  settings: {
    download: boolean
    share: boolean
    analytics: boolean
    pricing: boolean
    hero: boolean
  }
}
