import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useExperience } from '../hooks/useExperience'
import { BrandIdentity } from './BrandIdentity'
import { LandingContent } from './LandingContent'
import { ThemeEditor } from './ThemeEditor'
import { FeedbackModal } from '../../../components/feedback/FeedbackModal'
import { ExperienceTemplateEngine } from '../../../features/experience-template-engine'

type ExperienceFormProps = {
  experienceId?: string
}

type FeedbackState = {
  isOpen: boolean
  type: 'success' | 'error'
  title: string
  message: string
  confirmText: string
  cancelText?: string
  onConfirm: () => void
}

export function ExperienceForm({ experienceId }: ExperienceFormProps) {
  const navigate = useNavigate()
  const [feedbackModal, setFeedbackModal] = useState<FeedbackState>({
    isOpen: false,
    type: 'success',
    title: '',
    message: '',
    confirmText: '',
    cancelText: undefined,
    onConfirm: () => {},
  })
  const {
    experience,
    isSaved,
    previewPath,
    updateField,
    updateBrand,
    updateBrandFile,
    updateTheme,
    updateContent,
    updateSocial,
    updateSetting,
    saveExperience,
    saving,
  } = useExperience(experienceId)

  const closeModal = () => {
    setFeedbackModal((current) => ({ ...current, isOpen: false }))
  }

  const openSaveModal = (nextExperienceId?: string) => {
    setFeedbackModal({
      isOpen: true,
      type: 'success',
      title: 'Alterações salvas com sucesso!',
      message: 'Suas alterações foram salvas e já estão disponíveis para futuras edições.',
      confirmText: 'OK',
      onConfirm: () => {
        if (nextExperienceId) {
          navigate(`/admin/experiences/${nextExperienceId}/edit`, { replace: true })
        }

        closeModal()
      },
    })
  }

  const openPublishModal = (publishedUrl: string) => {
    setFeedbackModal({
      isOpen: true,
      type: 'success',
      title: 'Landing Page publicada!',
      message: 'Sua Landing Page foi publicada com sucesso e já pode ser acessada pelos visitantes.',
      confirmText: 'Visualizar Landing Page',
      cancelText: 'Fechar',
      onConfirm: () => {
        window.open(publishedUrl, '_blank', 'noopener,noreferrer')
        closeModal()
      },
    })
  }

  const handleSave = async (nextStatus: 'draft' | 'published') => {
    try {
      const response = await saveExperience(nextStatus)

      if (!response || (response.status !== 200 && response.status !== 201)) {
        return
      }

      const publishedUrl = `/demo/${response.experience.slug}`

      if (nextStatus === 'published') {
        openPublishModal(publishedUrl)
        return
      }

      openSaveModal(experienceId ? undefined : response.experience.id)
    } catch (reason) {
      setFeedbackModal({
        isOpen: true,
        type: 'error',
        title: 'Nao foi possivel salvar',
        message: reason instanceof Error ? reason.message : 'Falha ao salvar experiencia.',
        confirmText: 'Fechar',
        onConfirm: closeModal,
      })
      return
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">
          {experienceId ? 'Editar Experiencia' : 'Nova Experiencia'}
        </h1>

        <button
          type="button"
          onClick={() => navigate('/admin/experiences')}
          className="rounded-full border border-[#d8e2ea] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#151e2b]"
        >
          Voltar para Experiencias
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <LandingContent
            experience={experience}
            onFieldChange={updateField}
            onContentChange={updateContent}
            onSocialChange={updateSocial}
            onSettingChange={updateSetting}
          />

          <BrandIdentity experience={experience} onBrandChange={updateBrand} onBrandFileChange={updateBrandFile} />

          <ThemeEditor experience={experience} onThemeChange={updateTheme} />
        </div>

        <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <ExperienceTemplateEngine
            experience={experience}
            previewPath={previewPath}
            isSaved={isSaved}
            saving={saving}
            onSaveDraft={() => {
              void handleSave('draft')
            }}
            onPublish={() => {
              void handleSave('published')
            }}
            onUploadImage={(file) => updateBrandFile('candidatePhoto', file)}
          />
        </div>
      </div>

      <FeedbackModal
        isOpen={feedbackModal.isOpen}
        type={feedbackModal.type}
        title={feedbackModal.title}
        message={feedbackModal.message}
        confirmText={feedbackModal.confirmText}
        cancelText={feedbackModal.cancelText}
        onConfirm={feedbackModal.onConfirm}
        onClose={closeModal}
      />
    </div>
  )
}
