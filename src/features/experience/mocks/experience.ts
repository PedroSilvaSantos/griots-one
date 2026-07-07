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
    brand: {
      logo: '',
      hero: '',
      background: '',
      frame: '',
    },
    theme: {
      primary: '#10233f',
      secondary: '#365f93',
      accent: '#0f766e',
      button: '#10233f',
      radius: 16,
    },
    content: {
      title: 'Experiencia digital para gerar engajamento real.',
      subtitle: 'Publique uma landing premium e acompanhe resultados em tempo real.',
      cta: 'Quero participar',
      features: 'Galeria, analytics, compartilhamento e assets em um unico fluxo.',
      footer: 'Griots Studio 2026',
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
