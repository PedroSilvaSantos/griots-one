type ImagePreviewProps = {
  preview: string
  onRemove: () => void
  loading: boolean
}

export function ImagePreview({ preview, onRemove, loading }: ImagePreviewProps) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-2xl border border-[#d8e2ea] bg-white dark:border-white/10 dark:bg-[#101622]">
        <img src={preview} alt="Preview da imagem" className="h-56 w-full object-cover sm:h-72" />
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onRemove}
          disabled={loading}
          className="rounded-full border border-rose-200 px-4 py-2 text-xs font-semibold uppercase tracking-[0.08em] text-rose-600 transition-colors hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-rose-500/30 dark:text-rose-300 dark:hover:bg-rose-500/10"
        >
          Remover imagem
        </button>
      </div>
    </div>
  )
}
