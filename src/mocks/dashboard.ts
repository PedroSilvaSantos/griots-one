export type DashboardStat = {
  label: string
  value: string
  trend: string
}

export type ExperienceRow = {
  name: string
  status: 'Ativa' | 'Pausada' | 'Rascunho'
  photos: number
  downloads: number
  conversion: string
}

export type TimelineEvent = {
  period: 'Hoje' | 'Ontem'
  description: string
}

export type ExperienceTypeCard = {
  title: string
  subtitle: string
}

export const dashboardStats: DashboardStat[] = [
  { label: 'Experiencias Ativas', value: '18', trend: '+12%' },
  { label: 'Fotos Geradas', value: '28.420', trend: '+8%' },
  { label: 'Downloads', value: '22.115', trend: '+15%' },
  { label: 'Conversao', value: '82%', trend: '+4%' },
]

export const dashboardBars = [44, 62, 55, 78, 66, 84, 71]

export const experienceRows: ExperienceRow[] = [
  {
    name: 'Dr Vira-Lata',
    status: 'Ativa',
    photos: 4210,
    downloads: 3120,
    conversion: '81%',
  },
  {
    name: 'Outubro Rosa',
    status: 'Ativa',
    photos: 3121,
    downloads: 2210,
    conversion: '78%',
  },
  {
    name: 'Feira Empresarial',
    status: 'Ativa',
    photos: 1120,
    downloads: 850,
    conversion: '75%',
  },
]

export const timelineEvents: TimelineEvent[] = [
  { period: 'Hoje', description: 'Nova experiencia criada' },
  { period: 'Hoje', description: '234 imagens geradas' },
  { period: 'Ontem', description: 'Novo usuario' },
  { period: 'Ontem', description: 'Atualizacao de layout' },
]

export const experienceTypeCards: ExperienceTypeCard[] = [
  { title: '+ Nova Experiencia', subtitle: 'Criar fluxo completo' },
  { title: 'Campanha Politica', subtitle: 'Eleitoral e institucional' },
  { title: 'Evento', subtitle: 'Ingressos e comunicacao' },
  { title: 'Empresa', subtitle: 'Marketing e marca' },
]

export const analyticsFilters = ['7 dias', '30 dias', '90 dias']

export const analyticsBars = [38, 52, 47, 70, 64, 82, 76, 59]
