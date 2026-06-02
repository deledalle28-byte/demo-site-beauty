import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeftRight } from 'lucide-react'
import Header from './components/site/Header'
import Hero from './components/site/Hero'
import Prestations from './components/site/Prestations'
import Gallery from './components/site/Gallery'
import BookingEngine from './components/booking/BookingEngine'
import Avis from './components/site/Avis'
import Loyalty from './components/site/Loyalty'
import Contact from './components/site/Contact'
import Reminders from './components/site/Reminders'
import Footer from './components/site/Footer'
import BackOffice from './components/backoffice/BackOffice'
import { useStore } from './store'

function PublicSite() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Prestations />
        <Gallery />
        <BookingEngine />
        <Avis />
        <Loyalty />
        <Reminders />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  const [view, setView] = useState<'site' | 'pro'>('site')
  const { state } = useStore()

  function toggleView() {
    setView(v => v === 'site' ? 'pro' : 'site')
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="min-h-screen">
      <div style={{ display: view === 'site' ? 'block' : 'none' }}>
        <PublicSite />
      </div>
      <div style={{ display: view === 'pro' ? 'block' : 'none' }}>
        <BackOffice />
      </div>

      <motion.button
        onClick={toggleView}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-[100] flex items-center gap-2.5 text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl text-sm font-medium backdrop-blur-sm"
        style={{ backgroundColor: state.accentColor + 'ee' }}
      >
        <ArrowLeftRight size={16} />
        {view === 'site' ? 'Espace pro' : 'Voir le site'}
      </motion.button>
    </div>
  )
}
