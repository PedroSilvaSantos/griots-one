import { ImageUp } from 'lucide-react'
import { memo, useRef } from 'react'
import type { Experience } from '../../experience/types/experience'
import { Button } from '../../../components/layout/Button'

type ExperienceAssetsProps = {
  experience: Experience
  onUploadImage: (file: File) => Promise<void>
}

export const ExperienceAssets = memo(function ExperienceAssets({ experience, onUploadImage }: ExperienceAssetsProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  const assets = [
    { label: 'Foto principal', value: experience.brand.candidatePhoto },
    { label: 'Logo', value: experience.brand.logo },
    { label: 'Logo secundario', value: experience.brand.secondaryLogo },
    { label: 'Frame', value: experience.brand.frame },
    { label: 'Foto candidato', value: experience.brand.userPhoto },
  ]

  return (
    <div className="space-y-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={async (event) => {
          const file = event.target.files?.[0]
          if (!file) return
          await onUploadImage(file)
          event.target.value = ''
        }}
      />

      <Button variant="secondary" className="h-9 w-full gap-2 text-xs uppercase tracking-[0.1em]" onClick={() => fileInputRef.current?.click()}>
        <ImageUp size={13} />
        Upload
      </Button>

      {assets.map((asset) => (
        <div key={asset.label} className="rounded-lg border border-[#d8e2ea] bg-white px-2 py-2 text-xs dark:border-white/10 dark:bg-[#0f1621]">
          <p className="font-semibold text-[var(--brand-ink)] dark:text-slate-100">{asset.label}</p>
          <p className="mt-1 truncate text-[var(--brand-muted)] dark:text-slate-400">{asset.value ? 'Configurado' : 'Nao configurado'}</p>
        </div>
      ))}
    </div>
  )
})
