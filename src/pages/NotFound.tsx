import { useNavigate } from 'react-router-dom'
import { Button } from '../components/layout/Button'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="grid min-h-screen place-items-center px-6">
      <div className="w-full max-w-xl rounded-3xl border border-white/70 bg-white/80 p-10 text-center shadow-[0_18px_50px_-30px_rgba(16,35,63,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1421]/80">
        <p className="font-display text-7xl text-[var(--brand-ink)] dark:text-slate-100">404</p>
        <h1 className="mt-4 font-display text-3xl text-[var(--brand-ink)] dark:text-slate-100">
          Pagina nao encontrada
        </h1>
        <p className="mt-3 text-sm text-[var(--brand-muted)] dark:text-slate-400">
          O caminho que voce tentou acessar nao existe mais ou foi movido.
        </p>
        <Button className="mt-8 h-11 px-7 text-sm uppercase tracking-[0.12em]" onClick={() => navigate('/')}>
          Voltar para Home
        </Button>
      </div>
    </div>
  )
}
