import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useStore } from '../../store'

const links = [
  { label: 'Prestations', href: '#prestations' },
  { label: 'Galerie', href: '#galerie' },
  { label: 'Avis', href: '#avis' },
  { label: 'Fidélité', href: '#fidelite' },
  { label: 'Contact', href: '#contact' },
]

export default function Header() {
  const { state } = useStore()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className="sticky top-0 z-50 transition-all duration-300"
      style={{
        backdropFilter: 'blur(12px)',
        backgroundColor: scrolled ? 'rgba(239,230,217,0.95)' : 'rgba(239,230,217,0.7)',
        boxShadow: scrolled ? '0 1px 8px rgba(66,58,48,0.08)' : 'none',
        borderBottom: '1px solid rgba(212,197,176,0.4)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-serif text-2xl font-medium tracking-tight" style={{ color: state.accentColor }}>
          {state.brandName}
        </a>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-brown-500 hover:text-brown-900 transition-colors relative after:absolute after:bottom-[-2px] after:left-0 after:w-0 after:h-[1.5px] after:transition-all after:duration-300 hover:after:w-full"
              style={{ '--tw-after-bg': state.accentColor } as React.CSSProperties}
            >
              {l.label}
            </a>
          ))}
          <a
            href="#reservation"
            className="text-sm text-white px-5 py-2 rounded-full transition-all hover:opacity-90 hover:shadow-md"
            style={{ backgroundColor: state.accentColor }}
          >
            Réserver
          </a>
        </nav>

        <button className="md:hidden text-brown-900 p-1" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden bg-beige-50/95 backdrop-blur-sm border-t border-beige-300/40"
          >
            <div className="px-4 pb-4">
              {links.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block py-3.5 text-brown-500 hover:text-brown-900 border-b border-beige-200/60 last:border-0"
                >
                  {l.label}
                </motion.a>
              ))}
              <a
                href="#reservation"
                onClick={() => setOpen(false)}
                className="block mt-4 text-center text-white py-3 rounded-full transition-opacity hover:opacity-90"
                style={{ backgroundColor: state.accentColor }}
              >
                Réserver
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
