export type NavLink = {
  id: string
  label: string
}

export type FeatureItem = {
  title: string
  description: string
}

export type StepItem = {
  title: string
  description: string
}

export type PlanItem = {
  name: string
  price: string
  period: string
  description: string
  highlighted?: boolean
  features: string[]
}

export const navLinks: NavLink[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'features', label: 'Recursos' },
  { id: 'how-it-works', label: 'Como Funciona' },
  { id: 'pricing', label: 'Planos' },
  { id: 'contato', label: 'Contato' },
]

export const featureItems: FeatureItem[] = [
  {
    title: 'Workspace unificado',
    description:
      'Operação, métricas, atendimento e growth em um único painel com contexto compartilhado.',
  },
  {
    title: 'Fluxos inteligentes',
    description:
      'Automatize cadências, handoffs e alertas com regras visuais para reduzir tarefas operacionais.',
  },
  {
    title: 'Insights em tempo real',
    description:
      'Dashboards vivos com leitura de comportamento e performance para decidir em minutos.',
  },
  {
    title: 'Escala com consistência',
    description:
      'Padronize processos e qualidade de entrega com playbooks que evoluem junto ao time.',
  },
]

export const stepItems: StepItem[] = [
  {
    title: 'Conecte seus canais',
    description:
      'Integre CRM, billing, analytics e suporte em poucos minutos, sem retrabalho.',
  },
  {
    title: 'Modele sua operação',
    description:
      'Configure funis, permissões e rituais da equipe com componentes de fluxo reutilizáveis.',
  },
  {
    title: 'Escale com previsibilidade',
    description:
      'Acompanhe metas, SLAs e receita em painéis claros para agir antes de qualquer gargalo.',
  },
]

export const pricingPlans: PlanItem[] = [
  {
    name: 'Starter',
    price: 'R$ 149',
    period: '/mês',
    description: 'Para equipes pequenas validarem operações com velocidade.',
    features: [
      'Até 5 usuários',
      'Dashboards essenciais',
      'Automações básicas',
      'Suporte por e-mail',
    ],
  },
  {
    name: 'Growth',
    price: 'R$ 399',
    period: '/mês',
    description: 'Para times em expansão que exigem visibilidade ponta a ponta.',
    highlighted: true,
    features: [
      'Até 20 usuários',
      'Fluxos avançados e SLAs',
      'Relatórios customizados',
      'Suporte prioritário',
    ],
  },
  {
    name: 'Scale',
    price: 'Sob consulta',
    period: '',
    description: 'Para operações maduras com governança e alta complexidade.',
    features: [
      'Usuários ilimitados',
      'SSO e permissões avançadas',
      'Onboarding dedicado',
      'CSM estratégico',
    ],
  },
]
