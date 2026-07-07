import { useImageUpload } from '../hooks/useImageUpload'
import { ImagePreview } from './ImagePreview'

export function ImageUploader() {
  const { file, preview, error, loading, selectImage, removeImage, reset } = useImageUpload()

  return (
    <section className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_10px_28px_-20px_rgba(16,35,63,0.45)] backdrop-blur-md dark:border-white/10 dark:bg-[#11151c]/75 sm:p-6">
      <div className="space-y-2">
        <h2 className="font-display text-3xl text-[var(--brand-ink)] dark:text-slate-100">Upload de imagem</h2>
        <p className="text-sm text-[var(--brand-muted)] dark:text-slate-400">
          Envie uma imagem para preparar futuras etapas de crop, canvas, overlay PNG, template engine e download.
        </p>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-[var(--brand-muted)] dark:text-slate-400">
            Arquivo
          </span>
          <input
            type="file"
            accept=".png,.jpg,.jpeg,.webp,image/png,image/jpeg,image/webp"
            onChange={(event) => {
              const selected = event.target.files?.[0]
              if (selected) {
                void selectImage(selected)
              }
            }}
            className="block w-full rounded-xl border border-[#d8e2ea] bg-white px-3 py-2 text-sm text-[var(--brand-ink)] file:mr-3 file:rounded-full file:border-0 file:bg-[var(--brand-ink)] file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-[0.08em] file:text-white hover:file:bg-[#1b3963] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100"
          />
        </label>

        <p className="text-xs text-[var(--brand-muted)] dark:text-slate-400">Formatos: PNG, JPG, JPEG e WEBP. Limite: 10MB.</p>

        {error ? (
          <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
            {error}
          </div>
        ) : null}

        {loading ? (
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--brand-muted)] dark:text-slate-400">
            Carregando imagem...
          </p>
        ) : null}

        {file ? (
          <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--brand-muted)] dark:text-slate-400">
            Arquivo selecionado: {file.name}
          </p>
        ) : null}

        {preview ? <ImagePreview preview={preview} onRemove={removeImage} loading={loading} /> : null}

        <div className="flex justify-end">
          <button
            type="button"
            onClick={reset}
            className="rounded-full border border-[#d8e2ea] px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:text-slate-100 dark:hover:bg-[#151e2b]"
          >
            Limpar
          </button>
        </div>
      </div>
    </section>
  )
}
