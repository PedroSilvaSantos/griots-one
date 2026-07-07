import { Button } from '../components/layout/Button'

export function Settings() {
  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
        <h2 className="font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">Settings</h2>
        <p className="mt-2 text-sm text-[var(--brand-muted)] dark:text-slate-400">
          Configure preferncias principais da conta.
        </p>
      </section>

      <form className="grid grid-cols-1 gap-4 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md md:grid-cols-2 dark:border-white/10 dark:bg-[#11151c]/75">
        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Nome da Empresa</span>
          <input
            type="text"
            defaultValue="Griots One"
            className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Logo</span>
          <input
            type="text"
            defaultValue="https://cdn.griots.one/logo.svg"
            className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Tema</span>
          <select className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100">
            <option>System</option>
            <option>Light</option>
            <option>Dark</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Dominio</span>
          <input
            type="text"
            defaultValue="app.griots.one"
            className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
          />
        </label>

        <label className="space-y-2 md:col-span-2">
          <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Idioma</span>
          <select className="h-11 w-full rounded-xl border border-[#d8e2ea] bg-white px-3 text-sm text-[var(--brand-ink)] outline-none ring-[var(--brand-ink)]/20 transition focus:ring-2 dark:border-white/10 dark:bg-[#101622] dark:text-slate-100">
            <option>Portugues (Brasil)</option>
            <option>English</option>
            <option>Espanol</option>
          </select>
        </label>

        <div className="md:col-span-2">
          <Button type="button" className="h-11 px-7 text-sm uppercase tracking-[0.12em]">
            Salvar
          </Button>
        </div>
      </form>
    </div>
  )
}
