import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { CTA } from '../components/sections/CTA'
import { Demo } from '../components/sections/Demo'
import { Features } from '../components/sections/Features'
import { Hero } from '../components/sections/Hero'
import { HowItWorks } from '../components/sections/HowItWorks'
import { Pricing } from '../components/sections/Pricing'

export function Home() {
  return (
    <div className="relative">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Demo />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
