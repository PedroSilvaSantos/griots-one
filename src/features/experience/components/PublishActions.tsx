import { Eye, Loader2, Save, Send } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../components/layout/Button'

type PublishActionsProps = {
  previewPath: string
  isSaved: boolean
  saving: boolean
  onSave: () => void
  onPublish: () => void
}

export function PublishActions({ previewPath, isSaved, saving, onSave, onPublish }: PublishActionsProps) {
  const navigate = useNavigate()

  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-white/70 bg-white/80 p-4 shadow-[0_12px_36px_-24px_rgba(16,35,63,0.45)] backdrop-blur-md sm:flex-row dark:border-white/10 dark:bg-[#11151c]/75">
      <Button variant="secondary" className="h-11 w-full justify-center gap-2" onClick={onSave} disabled={saving}>
        {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
        {saving ? 'Salvando...' : isSaved ? 'Salvar Alterações' : 'Salvar'}
      </Button>

      <Button className="h-11 w-full justify-center gap-2" onClick={onPublish} disabled={saving}>
        {saving ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
        {saving ? 'Publicando...' : 'Publicar'}
      </Button>

      <Button variant="ghost" className="h-11 w-full justify-center gap-2" onClick={() => navigate(previewPath)}>
        <Eye size={15} />
        Visualizar
      </Button>
    </section>
  )
}
