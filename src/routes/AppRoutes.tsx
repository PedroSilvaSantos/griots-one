import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ExperienceLanding } from '../features/experience/ExperienceLanding'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { Analytics } from '../pages/Analytics'
import { Dashboard } from '../pages/Dashboard'
import { ExperienceBuilder } from '../pages/ExperienceBuilder'
import { Experiences } from '../pages/Experiences'
import { Home } from '../pages/Home'
import { Login } from '../pages/Login'
import { NotFound } from '../pages/NotFound'
import { Settings } from '../pages/Settings'

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/demo/:slug" element={<ExperienceLanding />} />

        <Route path="/admin" element={<DashboardLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="experiences" element={<Experiences />} />
          <Route path="experiences/new" element={<ExperienceBuilder />} />
          <Route path="experiences/:id/edit" element={<ExperienceBuilder />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
