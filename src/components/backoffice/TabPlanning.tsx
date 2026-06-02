import { useState } from 'react'
import { Plus, X, Globe, Phone as PhoneIcon } from 'lucide-react'
import { useStore } from '../../store'
import type { Appointment } from '../../types'

export default function TabPlanning() {
  const { state, addAppointment, cancelAppointment } = useStore()
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState({ date: '', time: '', clientName: '', clientPhone: '', prestation: '' })

  const sorted = [...state.appointments].sort((a, b) => {
    const da = `${a.date}T${a.time}`
    const db = `${b.date}T${b.time}`
    return da.localeCompare(db)
  })

  function handleAdd() {
    if (!draft.date || !draft.time || !draft.clientName || !draft.prestation) return
    const appt: Appointment = {
      id: Date.now().toString(),
      ...draft,
      source: 'Téléphone',
    }
    addAppointment(appt)
    setDraft({ date: '', time: '', clientName: '', clientPhone: '', prestation: '' })
    setAdding(false)
  }

  function formatDate(dateStr: string) {
    try {
      return new Date(dateStr).toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
    } catch {
      return dateStr
    }
  }

  return (
    <div className="space-y-4">
      {sorted.length === 0 && (
        <p className="text-center text-brown-500 py-8">Aucun rendez-vous pour le moment</p>
      )}

      {sorted.map(a => (
        <div key={a.id} className="bg-white rounded-xl p-4 border border-beige-300 flex items-center gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{a.clientName}</span>
              {a.source === 'En ligne' ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 flex items-center gap-1">
                  <Globe size={10} /> En ligne
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-beige-200 text-brown-500 flex items-center gap-1">
                  <PhoneIcon size={10} /> Tél.
                </span>
              )}
            </div>
            <p className="text-sm text-brown-500">
              {a.prestation} — {formatDate(a.date)} à {a.time}
            </p>
          </div>
          <button onClick={() => cancelAppointment(a.id)} className="text-red-400 hover:text-red-600">
            <X size={18} />
          </button>
        </div>
      ))}

      {adding ? (
        <div className="bg-white rounded-xl p-4 border border-dashed border-beige-400 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <input type="date" value={draft.date} onChange={e => setDraft({ ...draft, date: e.target.value })}
              className="px-3 py-2 rounded-lg border border-beige-300 text-sm" />
            <input type="time" value={draft.time} onChange={e => setDraft({ ...draft, time: e.target.value })}
              className="px-3 py-2 rounded-lg border border-beige-300 text-sm" />
          </div>
          <input placeholder="Nom de la cliente" value={draft.clientName} onChange={e => setDraft({ ...draft, clientName: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-beige-300 text-sm" />
          <input placeholder="Téléphone" value={draft.clientPhone} onChange={e => setDraft({ ...draft, clientPhone: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-beige-300 text-sm" />
          <select value={draft.prestation} onChange={e => setDraft({ ...draft, prestation: e.target.value })}
            className="w-full px-3 py-2 rounded-lg border border-beige-300 text-sm bg-white">
            <option value="">Choisir un soin</option>
            {state.prestations.map(p => (
              <option key={p.id} value={p.name}>{p.name}</option>
            ))}
          </select>
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
          Ajouter un rendez-vous
        </button>
      )}
    </div>
  )
}
