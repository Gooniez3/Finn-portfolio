import { useState } from 'react'
import { About } from './components/About'
import { Awards } from './components/Awards'
import { Capabilities } from './components/Capabilities'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Finn } from './components/Finn'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Now } from './components/Now'
import { Work } from './components/Work'
import { ThemeProvider } from './context/theme'
import { useLenis } from './hooks/useLenis'

function Waves() {
  return (
    <div className="waves">
      <svg viewBox="0 0 1440 900" preserveAspectRatio="none" aria-hidden>
        <path d="M-40 220C180 80 380 360 620 240C860 120 1080 300 1480 180" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.18" />
        <path d="M-40 520C220 400 420 680 680 540C940 400 1160 620 1480 500" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.12" />
        <path d="M-40 780C260 640 480 900 760 760C1040 620 1220 840 1480 740" fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.1" />
      </svg>
    </div>
  )
}

function Shell() {
  const [finnOpen, setFinnOpen] = useState(false)
  useLenis()

  return (
    <>
      <Waves />
      <div className="relative z-10">
        <Nav onAsk={() => setFinnOpen(true)} />
        <main>
          <Hero onAsk={() => setFinnOpen(true)} />
          <Now />
          <Work />
          <Capabilities />
          <About />
          <Experience />
          <Awards />
          <Contact />
        </main>
        <Footer />
      </div>
      <Finn open={finnOpen} onOpen={() => setFinnOpen(true)} onClose={() => setFinnOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  )
}
