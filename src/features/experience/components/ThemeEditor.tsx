import type { Experience } from '../types/experience'

type ThemeEditorProps = {
  experience: Experience
  onThemeChange: <K extends keyof Experience['theme']>(field: K, value: Experience['theme'][K]) => void
}

const colorFields = [
  { key: 'primary' as const, label: 'Cor Primaria' },
  { key: 'secondary' as const, label: 'Cor Secundaria' },
  { key: 'accent' as const, label: 'Cor de Destaque' },
  { key: 'button' as const, label: 'Cor do Botao' },
]

export function ThemeEditor({ experience, onThemeChange }: ThemeEditorProps) {
  return (
    <section className="space-y-4 rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75">
      <h2 className="font-display text-2xl text-[var(--brand-ink)] dark:text-slate-100">Tema</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {colorFields.map((field) => (
          <label key={field.key} className="space-y-2">
            <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">{field.label}</span>
            <div className="flex items-center gap-2 rounded-xl border border-[#d8e2ea] bg-white px-3 dark:border-white/10 dark:bg-[#101622]">
              <input
                type="color"
                value={experience.theme[field.key]}
                onChange={(event) => onThemeChange(field.key, event.target.value)}
                className="h-10 w-10 cursor-pointer border-none bg-transparent p-0"
              />
              <input
                value={experience.theme[field.key]}
                onChange={(event) => onThemeChange(field.key, event.target.value)}
                className="h-11 w-full bg-transparent text-sm text-[var(--brand-ink)] outline-none dark:text-slate-100"
              />
            </div>
          </label>
        ))}
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-[var(--brand-ink)] dark:text-slate-200">Raio da Borda</span>
        <input
          type="range"
          min={4}
          max={36}
          value={experience.theme.radius}
          onChange={(event) => onThemeChange('radius', Number(event.target.value))}
          className="h-2 w-full cursor-pointer accent-[var(--brand-ink)]"
        />
        <p className="text-xs text-[var(--brand-muted)] dark:text-slate-400">{experience.theme.radius}px</p>
      </label>
    </section>
  )
}
