import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/layout/Button'

export function Login() {
  const navigate = useNavigate()

  return (
    <div className="grid min-h-screen place-items-center bg-[radial-gradient(circle_at_10%_0%,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_100%_0%,rgba(14,165,233,0.2),transparent_40%),linear-gradient(180deg,#ecf3fb_0%,#f4f8fc_100%)] px-5 dark:bg-[radial-gradient(circle_at_10%_0%,rgba(59,130,246,0.28),transparent_35%),radial-gradient(circle_at_100%_0%,rgba(14,165,233,0.23),transparent_40%),linear-gradient(180deg,#070b12_0%,#0b111b_100%)]">
      <motion.form
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.45 }}
        onSubmit={(event) => {
          event.preventDefault()
          navigate('/admin/dashboard')
        }}
        className="w-full max-w-md rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_18px_50px_-30px_rgba(16,35,63,0.55)] backdrop-blur-xl dark:border-white/10 dark:bg-[#0d1421]/80"
      >
        <p className="text-center font-display text-3xl text-[var(--brand-ink)] dark:text-slate-100">Griots One</p>
        <p className="mt-2 text-center text-sm text-[var(--brand-muted)] dark:text-slate-400">
          Acesse seu painel de demonstracao
        </p>

        <div className="mt-8 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Email</span>
            <input
              type="email"
              required
              placeholder="pedro@griots.one"
              className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#121a28] dark:text-slate-100"
            />
          </label>

          <label className="block space-y-2">
            <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Senha</span>
            <input
              type="password"
              required
              placeholder="••••••••"
              className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#121a28] dark:text-slate-100"
            />
          </label>
        </div>

        <Button type="submit" className="mt-7 h-11 w-full text-sm uppercase tracking-[0.12em]">
          Entrar
        </Button>
      </motion.form>
    </div>
  )
}
