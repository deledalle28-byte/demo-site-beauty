import { useState } from 'react'
import { Palette, Scissors, Calendar, Star, RotateCcw } from 'lucide-react'
import { useStore } from '../../store'
import Login from './Login'
import TabIdentity from './TabIdentity'
import TabPrestations from './TabPrestations'
import TabPlanning from './TabPlanning'
import TabAvis from './TabAvis'

type Tab = 'identity' | 'prestations' | 'planning' | 'avis'

const tabs: { key: Tab; label: string; icon: typeof Palette }[] = [
  { key: 'identity', label: 'Identité', icon: Palette },
  { key: 'prestations', label: 'Prestations', icon: Scissors },
  { key: 'planning', label: 'Planning', icon: Calendar },
  { key: 'avis', label: 'Avis', icon: Star },
]

export default function BackOffice() {
  const { state, resetDemo } = useStore()
  const [loggedIn, setLoggedIn] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('identity')

  if (!loggedIn) return <Login onLogin={() => setLoggedIn(true)} />

  return (
    <div className="min-h-screen bg-beige-100">
      <header className="bg-beige-50 border-b border-beige-300/50 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl italic" style={{ color: state.accentColor }}>Espace Pro</h1>
            <p className="text-xs text-brown-500">{state.brandName}</p>
          </div>
          <button
            onClick={resetDemo}
            className="flex items-center gap-2 text-sm text-brown-500 hover:text-brown-900 border border-beige-300 px-3 py-1.5 rounded-full transition-colors"
          >
            <RotateCcw size={14} />
            Réinitialiser la démo
          </button>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors"
              style={{
                backgroundColor: activeTab === t.key ? state.accentColor : '#FBF6EE',
                color: activeTab === t.key ? 'white' : '#8A7E6F',
              }}
            >
              <t.icon size={16} />
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'identity' && <TabIdentity />}
        {activeTab === 'prestations' && <TabPrestations />}
        {activeTab === 'planning' && <TabPlanning />}
        {activeTab === 'avis' && <TabAvis />}
      </div>
    </div>
  )
}
