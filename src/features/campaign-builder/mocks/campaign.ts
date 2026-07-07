import type { Campaign, CampaignCategory, CampaignStatus } from '../types/campaign'

export const CAMPAIGNS_STORAGE_KEY = 'griots.campaigns.v1'

export const campaignCategories: CampaignCategory[] = ['Campanha Politica', 'Evento', 'Empresa', 'Esporte']

export const campaignStatuses: CampaignStatus[] = ['Rascunho', 'Publicado']

export const createEmptyCampaign = (): Campaign => ({
  id: '',
  name: '',
  slug: '',
  category: 'Campanha Politica',
  status: 'Rascunho',
  logo: '',
  hero: '',
  frame: '',
  background: '',
  colors: {
    primary: '#10233f',
    secondary: '#365f93',
    accent: '#0f766e',
    button: '#10233f',
  },
  texts: {
    heroTitle: 'A campanha digital que conecta pessoas e causa.',
    heroSubtitle: 'Crie, publique e escale sua comunicacao com agilidade.',
    cta: 'Quero participar',
    features: 'Downloads, compartilhamento e analytics em tempo real.',
    footer: 'Griots One 2026',
  },
  socials: {
    instagram: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    website: '',
  },
  settings: {
    download: true,
    share: true,
    analytics: true,
    pricing: true,
    hero: true,
  },
})
