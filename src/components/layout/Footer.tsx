import { Container } from './Container'

export function Footer() {
  return (
    <footer className="border-t border-[var(--stroke)] bg-white/70 py-10">
      <Container className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-[var(--brand-muted)]">© 2026 Griots One. Operação inteligente para SaaS.</p>
        <div className="flex items-center gap-5 text-sm text-[var(--brand-muted)]">
          <a href="#">Termos</a>
          <a href="#">Privacidade</a>
          <a href="#">Status</a>
        </div>
      </Container>
    </footer>
  )
}
