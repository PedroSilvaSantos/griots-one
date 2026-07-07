import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../../services/siteContent'
import { cn } from '../../services/cn'
import { Button } from './Button'
import { Container } from './Container'
import { useActiveSection } from '../../hooks/useActiveSection'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const activeSection = useActiveSection(navLinks.map((link) => link.id))

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--stroke)] bg-white/75 backdrop-blur-md">
      <Container className="flex h-20 items-center justify-between">
        <a href="#hero" className="font-display text-xl font-semibold tracking-tight text-[var(--brand-ink)]">
          Griots One
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-medium transition-colors',
                activeSection === link.id
                  ? 'bg-[var(--brand-ink)] text-[var(--brand-white)]'
                  : 'text-[var(--brand-muted)] hover:text-[var(--brand-ink)]',
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link to="/login">
            <Button variant="ghost">Entrar</Button>
          </Link>
          <Link to="/demo/dr-viralata">
            <Button>Solicitar Demonstracao</Button>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--stroke)] md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Abrir menu"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </Container>

      {open ? (
        <div className="border-t border-[var(--stroke)] bg-white md:hidden">
          <Container className="flex flex-col gap-2 py-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className="rounded-lg px-4 py-3 text-sm font-medium text-[var(--brand-ink)] hover:bg-[var(--brand-surface)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link to="/login" onClick={() => setOpen(false)}>
              <Button variant="ghost" className="mt-2 w-full">
                Entrar
              </Button>
            </Link>
            <Link to="/demo/dr-viralata" onClick={() => setOpen(false)}>
              <Button className="w-full">Solicitar Demonstracao</Button>
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  )
}
