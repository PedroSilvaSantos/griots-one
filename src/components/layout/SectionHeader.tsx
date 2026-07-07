import type { ReactNode } from 'react'
import { cn } from '../../services/cn'

type SectionHeaderProps = {
  eyebrow?: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div className={cn('space-y-4', align === 'center' && 'mx-auto max-w-3xl text-center')}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-muted)]">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl leading-tight text-[var(--brand-ink)] sm:text-4xl">{title}</h2>
      {description ? <p className="text-base text-[var(--brand-muted)] sm:text-lg">{description}</p> : null}
    </div>
  )
}
