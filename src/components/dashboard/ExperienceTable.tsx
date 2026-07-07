import type { ExperienceRow } from '../../mocks/dashboard'

type ExperienceTableProps = {
  rows: ExperienceRow[]
}

export function ExperienceTable({ rows }: ExperienceTableProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[#dce5ec] bg-white dark:border-white/10 dark:bg-[#10161f]">
      <div className="grid grid-cols-[1.3fr_0.8fr_0.7fr_0.7fr_0.5fr] border-b border-[#dce5ec] bg-[#f3f7fb] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.09em] text-[var(--brand-muted)] dark:border-white/10 dark:bg-[#0f1722] dark:text-slate-400">
        <p>Experiencia</p>
        <p>Status</p>
        <p className="text-right">Fotos</p>
        <p className="text-right">Downloads</p>
        <p className="text-right">Conversao</p>
      </div>

      <div className="divide-y divide-[#edf3f7] dark:divide-white/10">
        {rows.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-[1.3fr_0.8fr_0.7fr_0.7fr_0.5fr] items-center px-4 py-3 text-sm text-[var(--brand-ink)] dark:text-slate-200"
          >
            <p className="font-semibold">{row.name}</p>
            <span className="inline-flex w-fit rounded-full bg-[#dcf7ef] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0f766e] dark:bg-emerald-500/15 dark:text-emerald-300">
              {row.status}
            </span>
            <p className="text-right font-semibold">{row.photos}</p>
            <p className="text-right font-semibold">{row.downloads}</p>
            <p className="text-right font-semibold">{row.conversion}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
