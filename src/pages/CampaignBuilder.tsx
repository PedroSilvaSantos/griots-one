import { Navigate, useParams } from 'react-router-dom'

export function CampaignBuilder() {
  const { id } = useParams<{ id: string }>()

  if (id) return <Navigate to={`/admin/experiences/${id}/edit`} replace />

  return <Navigate to="/admin/experiences/new" replace />
}
