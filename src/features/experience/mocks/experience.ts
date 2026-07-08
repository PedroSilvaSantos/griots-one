import type { Experience, ExperienceCategory, ExperienceStatus } from '../types/experience'

export const experienceCategories: ExperienceCategory[] = [
  'Campanha',
  'Evento',
  'Empresa',
  'Institucional',
  'Esporte',
  'Formatura',
  'Show',
  'Outro',
]

export const experienceStatuses: ExperienceStatus[] = ['draft', 'published']

export function createEmptyExperience(): Experience {
  const now = new Date().toISOString()

  return {
    id: '',
    name: '',
    slug: '',
    category: 'Campanha',
    status: 'draft',
    template: {
      id: 'support-frame',
    },
    brand: {
      logo: '',
      secondaryLogo: '',
      userPhoto: '',
      candidatePhoto: '',
      hero: '',
      background: '',
      frame: '',
    },
    theme: {
      primary: '#10233f',
      secondary: '#365f93',
      accent: '#0f766e',
      button: '#10233f',
      backgroundStart: '#eef3f6',
      backgroundEnd: '#dfe8f4',
      text: '#10233f',
      mutedText: '#526173',
      surface: '#ffffff',
      shadow: 'rgba(16, 35, 63, 0.16)',
      onPrimary: '#ffffff',
      frame: '#d5dde4',
      radius: 16,
    },
    content: {
      title: 'Experiencia digital para gerar engajamento real.',
      subtitle: 'Publique uma landing premium e acompanhe resultados em tempo real.',
      cta: 'Quero participar',
      features: 'Galeria, analytics, compartilhamento e assets em um unico fluxo.',
      footer: 'Griots Studio 2026',
      candidateName: '',
      candidateNumber: '',
      hashtag: '',
      topLeftText: '',
      topRightText: '',
      bottomLine1: '',
      bottomLine2: '',
      party: '',
    },
    social: {
      instagram: '',
      facebook: '',
      tiktok: '',
      linkedin: '',
      website: '',
    },
    settings: {
      download: true,
      share: true,
      analytics: true,
      gallery: true,
    },
    createdAt: now,
    updatedAt: now,
  }
}
