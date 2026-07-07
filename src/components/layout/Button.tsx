import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../services/cn'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
}

export function Button({ children, className, variant = 'primary', ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide transition-all duration-200',
        variant === 'primary' &&
          'bg-[var(--brand-ink)] text-[var(--brand-white)] hover:translate-y-[-1px] hover:bg-[#0d213d]',
        variant === 'secondary' &&
          'bg-[var(--brand-white)] text-[var(--brand-ink)] ring-1 ring-[var(--stroke)] hover:bg-[#f8fafb]',
        variant === 'ghost' &&
          'bg-transparent text-[var(--brand-ink)] ring-1 ring-transparent hover:ring-[var(--stroke)]',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  )
}
