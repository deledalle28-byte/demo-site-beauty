import { useState } from 'react'
import { Plus, Trash2, Star } from 'lucide-react'
import { useStore } from '../../store'
import type { Avis } from '../../types'

export default function TabAvis() {
  const { state, addAvis, removeAvis } = useStore()
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ name: '', rating: 5, text: '' })

  function handleAdd() {
    if (!draft.name || !draft.text) return
    const a: Avis = { id: Date.now().toString(), ...draft }
    addAvis(a)
    setDraft({ name: '', rating: 5, text: '' })
    setAdding(false)
  }

  return (
    <div className="space-y-4">
      {state.avis.map(a => (
        <div key={a.id} className="bg-white rounded-xl p-4 border border-beige-300 flex items-start gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{a.name}</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={12} fill={s <= a.rating ? state.accentColor : 'none'} stroke={state.accentColor} />
                ))}
              </div>
            </div>
            <p className="text-sm text-brown-500">{a.text}</p>
          </div>
          <button onClick={() => removeAvis(a.id)} className="text-red-400 hover:text-red-600 shrink-0">
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      {adding ? (
        <div className="bg-white rounded-xl p-4 border border-dashed border-beige-400 space-y-3">
          <input placeholder="Prénom" value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-beige-300 text-sm" />
          <div className="flex items-center gap-1">
            <span className="text-sm text-brown-500 mr-2">Note :</span>
            {[1, 2, 3, 4, 5].map(s => (
              <button key={s} onClick={() => setDraft({ ...draft, rating: s })}>
                <Star size={20} fill={s <= draft.rating ? state.accentColor : 'none'} stroke={state.accentColor} />
              </button>
            ))}
          </div>
          <textarea placeholder="Avis" value={draft.text} onChange={e => setDraft({ ...draft, text: e.target.value })}
            rows={2} className="w-full px-3 py-2 rounded-lg border border-beige-300 text-sm resize-none" />
          <div className="flex gap-2">
            <button onClick={handleAdd} className="text-white px-4 py-2 rounded-full text-sm" style={{ backgroundColor: state.accentColor }}>
              Ajouter
            </button>
            <button onClick={() => setAdding(false)} className="text-sm text-brown-500 hover:text-brown-900">Annuler</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)}
          className="w-full border border-dashed border-beige-400 rounded-xl p-4 text-brown-500 hover:text-brown-900 flex items-center justify-center gap-2 transition-colors">
          <Plus size={18} />
          Ajouter un avis
        </button>
      )}
    </div>
  )
}
