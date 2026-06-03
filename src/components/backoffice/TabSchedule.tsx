import { Clock } from 'lucide-react'
import { useStore } from '../../store'

const DAYS = [
  { key: 'lundi', label: 'Lundi' },
  { key: 'mardi', label: 'Mardi' },
  { key: 'mercredi', label: 'Mercredi' },
  { key: 'jeudi', label: 'Jeudi' },
  { key: 'vendredi', label: 'Vendredi' },
  { key: 'samedi', label: 'Samedi' },
  { key: 'dimanche', label: 'Dimanche' },
]

const INTERVALS = [15, 30, 45, 60]

export default function TabSchedule() {
  const { state, updateDaySchedule, setSlotInterval } = useStore()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium text-lg">Horaires de travail</h3>
          <p className="text-sm text-brown-500">Définissez vos jours et heures d'ouverture</p>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-brown-500">Créneaux de</label>
          <select
            value={state.slotInterval}
            onChange={e => setSlotInterval(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg border border-beige-300 text-sm bg-white"
          >
            {INTERVALS.map(i => (
              <option key={i} value={i}>{i} min</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        {DAYS.map(({ key, label }) => {
          const day = state.schedule[key]
          return (
            <div key={key} className="bg-white rounded-xl p-4 border border-beige-300">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateDaySchedule(key, { open: !day.open })}
                    className="w-10 h-6 rounded-full relative transition-colors"
                    style={{ backgroundColor: day.open ? state.accentColor : '#D4C5B0' }}
                  >
                    <div
                      className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform"
                      style={{ left: day.open ? '18px' : '2px' }}
                    />
                  </button>
                  <span className="font-medium">{label}</span>
                </div>
                {!day.open && (
                  <span className="text-sm text-brown-500 italic">Fermé</span>
                )}
              </div>

              {day.open && (
                <div className="grid grid-cols-2 gap-4 pl-13">
                  <div>
                    <label className="text-xs text-brown-500 mb-1 block">Ouverture</label>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-brown-500" />
                      <input
                        type="time"
                        value={day.start}
                        onChange={e => updateDaySchedule(key, { start: e.target.value })}
                        className="px-3 py-1.5 rounded-lg border border-beige-300 text-sm bg-white"
                      />
                      <span className="text-brown-500 text-sm">→</span>
                      <input
                        type="time"
                        value={day.end}
                        onChange={e => updateDaySchedule(key, { end: e.target.value })}
                        className="px-3 py-1.5 rounded-lg border border-beige-300 text-sm bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-brown-500 mb-1 block">Pause</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={day.breakStart}
                        onChange={e => updateDaySchedule(key, { breakStart: e.target.value })}
                        className="px-3 py-1.5 rounded-lg border border-beige-300 text-sm bg-white"
                      />
                      <span className="text-brown-500 text-sm">→</span>
                      <input
                        type="time"
                        value={day.breakEnd}
                        onChange={e => updateDaySchedule(key, { breakEnd: e.target.value })}
                        className="px-3 py-1.5 rounded-lg border border-beige-300 text-sm bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="bg-beige-50 rounded-xl p-4 border border-beige-300">
        <p className="text-xs text-brown-500 mb-2">Résumé affiché sur le site</p>
        {DAYS.map(({ key, label }) => {
          const day = state.schedule[key]
          return (
            <p key={key} className="text-sm text-brown-900">
              <span className="inline-block w-24 font-medium">{label}</span>
              {day.open
                ? `${day.start} – ${day.breakStart} / ${day.breakEnd} – ${day.end}`
                : 'Fermé'}
            </p>
          )
        })}
      </div>
    </div>
  )
}
