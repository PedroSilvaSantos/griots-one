import { Navbar } from '../components/layout/Navbar'
import { Cases } from '../components/sections/Cases'
import { DashboardPreview } from '../components/sections/DashboardPreview'
import { Features } from '../components/sections/Features'
import { Hero } from '../components/sections/Hero'
import { HowItWorks } from '../components/sections/HowItWorks'
import { TrustedBy } from '../components/sections/TrustedBy'

export function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <TrustedBy />
        <DashboardPreview />
        <Cases />
      </main>
    </div>
  )
}
