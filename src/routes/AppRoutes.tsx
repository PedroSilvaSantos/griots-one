import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Analytics } from '../pages/Analytics'
import { Dashboard } from '../pages/Dashboard'
import { DemoDrViralata } from '../pages/DemoDrViralata'
import { ExperienceBuilder } from '../pages/ExperienceBuilder'
import { Experiences } from '../pages/Experiences'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { NotFound } from '../pages/NotFound'
import { Settings } from '../pages/Settings'

function LegacyCampaignEditRedirect() {
  const { id = '' } = useParams<{ id: string }>()

  return <Navigate to={`/admin/experiences/${id}/edit`} replace />
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/demo/:slug" element={<DemoDrViralata />} />

        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="experiences/new" element={<ExperienceBuilder />} />
          <Route path="experiences/:id/edit" element={<ExperienceBuilder />} />
          <Route path="campaigns" element={<Navigate to="/admin/experiences" replace />} />
          <Route path="campaigns/new" element={<Navigate to="/admin/experiences/new" replace />} />
          <Route path="campaigns/:id/edit" element={<LegacyCampaignEditRedirect />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
