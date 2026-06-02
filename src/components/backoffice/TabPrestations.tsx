import { useState } from 'react'
import { Plus, Trash2, Edit3, Check, X } from 'lucide-react'
import { useStore } from '../../store'
import type { Prestation } from '../../types'

export default function TabPrestations() {
  const { state, addPrestation, updatePrestation, removePrestation } = useStore()
  const [editing, setEditing] = useState<string | null>(null)
  const [draft, setDraft] = useState({ name: '', duration: 60, price: 0 })
  const [adding, setAdding] = useState(false)
  const [newDraft, setNewDraft] = useState({ name: '', duration: 60, price: 0 })

  function startEdit(p: Prestation) {
    setEditing(p.id)
    setDraft({ name: p.name, duration: p.duration, price: p.price })
  }

  function saveEdit(id: string) {
    updatePrestation(id, draft)
    setEditing(null)
  }

  function handleAdd() {
    if (!newDraft.name) return
    const p: Prestation = { id: Date.now().toString(), ...newDraft }
    addPrestation(p)
    setNewDraft({ name: '', duration: 60, price: 0 })
    setAdding(false)
  }

  return (
    <div className="space-y-4">
      {state.prestations.map(p => (
        <div key={p.id} className="bg-white rounded-xl p-4 border border-beige-300 flex items-center gap-3">
          {editing === p.id ? (
            <>
              <div className="flex-1 space-y-2">
                <input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-beige-300 text-sm" />
                <div className="flex gap-2">
                  <input type="number" value={draft.duration} onChange={e => setDraft({ ...draft, duration: Number(e.target.value) })}
                    className="w-20 px-3 py-2 rounded-lg border border-beige-300 text-sm" />
                  <span className="self-center text-sm text-brown-500">min</span>
                  <input type="number" value={draft.price} onChange={e => setDraft({ ...draft, price: Number(e.target.value) })}
                    className="w-20 px-3 py-2 rounded-lg border border-beige-300 text-sm" />
                  <span className="self-center text-sm text-brown-500">€</span>
                </div>
              </div>
              <button onClick={() => saveEdit(p.id)} className="text-green-600 hover:text-green-700"><Check size={18} /></button>
              <button onClick={() => setEditing(null)} className="text-brown-500 hover:text-brown-900"><X size={18} /></button>
            </>
          ) : (
            <>
              <div className="flex-1">
                <p className="font-medium">{p.name}</p>
                <p className="text-sm text-brown-500">{p.duration} min — {p.price} €</p>
              </div>
              <button onClick={() => startEdit(p)} className="text-brown-500 hover:text-brown-900"><Edit3 size={16} /></button>
              <button onClick={() => removePrestation(p.id)} className="text-red-400 hover:text-red-600"><Trash2 size={16} /></button>
            </>
          )}
        </div>
      ))}

      {adding ? (
        <div className="bg-white rounded-xl p-4 border border-dashed border-beige-400 space-y-2">
          <input placeholder="Nom du soin" value={newDraft.name} onChange={e => setNewDraft({ ...newDraft, name: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-beige-300 text-sm" />
          <div className="flex gap-2">
            <input type="number" value={newDraft.duration} onChange={e => setNewDraft({ ...newDraft, duration: Number(e.target.value) })}
              className="w-20 px-3 py-2 rounded-lg border border-beige-300 text-sm" />
            <span className="self-center text-sm text-brown-500">min</span>
            <input type="number" value={newDraft.price} onChange={e => setNewDraft({ ...newDraft, price: Number(e.target.value) })}
              className="w-20 px-3 py-2 rounded-lg border border-beige-300 text-sm" />
            <span className="self-center text-sm text-brown-500">€</span>
          </div>
          <div className="flex gap-2">
            <button onClick={handleAdd} className="bg-accent text-white px-4 py-2 rounded-full text-sm" style={{ backgroundColor: state.accentColor }}>
              Ajouter
            </button>
            <button onClick={() => setAdding(false)} className="text-sm text-brown-500 hover:text-brown-900">Annuler</button>
          </div>
        </div>
      ) : (
        <button onClick={() => setAdding(true)}
          className="w-full border border-dashed border-beige-400 rounded-xl p-4 text-brown-500 hover:text-brown-900 hover:border-beige-400 flex items-center justify-center gap-2 transition-colors">
          <Plus size={18} />
          Ajouter une prestation
        </button>
      )}
    </div>
  )
}
