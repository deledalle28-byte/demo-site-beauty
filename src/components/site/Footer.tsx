import { useStore } from '../../store'

export default function Footer() {
  const { state } = useStore()

  return (
    <footer className="bg-brown-900 text-beige-300 py-12 px-4">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <p className="font-serif text-2xl italic text-beige-50">{state.brandName}</p>
        <p className="text-sm">{state.contact.address} — {state.contact.phone}</p>
        <div className="border-t border-beige-400/20 pt-4 mt-4 flex flex-col md:flex-row items-center justify-center gap-2 text-xs text-beige-400">
          <span>© {new Date().getFullYear()} {state.brandName} — Tous droits réservés (démo)</span>
          <span className="hidden md:inline">·</span>
          <span>Mentions légales (fictives)</span>
          <span className="hidden md:inline">·</span>
          <a href="https://naevo.fr" target="_blank" rel="noopener noreferrer" className="hover:text-beige-50 transition-colors" style={{ color: state.accentColor }}>
            Réalisé par Naevo
          </a>
        </div>
      </div>
    </footer>
  )
}
