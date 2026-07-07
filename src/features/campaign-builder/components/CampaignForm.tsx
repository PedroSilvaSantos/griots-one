import { useNavigate } from 'react-router-dom'
import { CampaignActions } from './CampaignActions'
import { CampaignIdentity } from './CampaignIdentity'
import { CampaignPreview } from './CampaignPreview'
import { CampaignTexts } from './CampaignTexts'
import { CampaignTheme } from './CampaignTheme'
import { useCampaign } from '../hooks/useCampaign'

type CampaignFormProps = {
  campaignId?: string
}

export function CampaignForm({ campaignId }: CampaignFormProps) {
  const navigate = useNavigate()
  const {
    campaign,
    isSaved,
    previewPath,
    updateField,
    updateColors,
    updateTexts,
    updateSocials,
    updateSettings,
    updateAsset,
    updateAssetFile,
    saveCampaign,
  } = useCampaign(campaignId)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h1 className="font-display text-4xl text-[var(--brand-ink)] dark:text-slate-100">
          {campaignId ? 'Editar Campanha' : 'Nova Campanha'}
        </h1>
        <button
          type="button"
          onClick={() => navigate('/admin/campaigns')}
          className="rounded-full border border-[#d8e2ea] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--brand-ink)] transition-colors hover:bg-[#eef4f8] dark:border-white/10 dark:bg-[#101622] dark:text-slate-100 dark:hover:bg-[#151e2b]"
        >
          Voltar para Campaigns
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <CampaignIdentity
            campaign={campaign}
            onFieldChange={updateField}
            onAssetChange={updateAsset}
            onAssetFileChange={updateAssetFile}
          />

          <CampaignTheme campaign={campaign} onColorChange={updateColors} />

          <CampaignTexts
            campaign={campaign}
            onTextChange={updateTexts}
            onSocialChange={updateSocials}
            onSettingChange={updateSettings}
          />
        </div>

        <div className="space-y-4 xl:sticky xl:top-24 xl:self-start">
          <CampaignActions
            previewPath={previewPath}
            isSaved={isSaved}
            onSave={() => {
              const saved = saveCampaign('Rascunho')
              navigate(`/admin/campaigns/${saved.id}/edit`, { replace: true })
            }}
            onPublish={() => {
              const saved = saveCampaign('Publicado')
              navigate(`/admin/campaigns/${saved.id}/edit`, { replace: true })
            }}
          />
          <CampaignPreview campaign={campaign} />
        </div>
      </div>
    </div>
  )
}
