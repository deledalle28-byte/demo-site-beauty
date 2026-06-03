import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, User, Check, ChevronLeft, CalendarPlus } from 'lucide-react'
import { useStore } from '../../store'
import { generateICS } from './ics'
import type { Appointment, WeekSchedule, DaySchedule } from '../../types'

type Step = 'prestation' | 'date' | 'time' | 'info' | 'confirm'

const DAY_KEYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']

function getNext7Days(schedule: WeekSchedule) {
  const days: { date: string; label: string; dayName: string }[] = []
  const formatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' })
  for (let i = 1; days.length < 6 && i <= 14; i++) {
    const d = new Date()
    d.setDate(d.getDate() + i)
    const dayKey = DAY_KEYS[d.getDay()]
    if (!schedule[dayKey]?.open) continue
    days.push({
      date: d.toISOString().split('T')[0],
      label: formatter.format(d),
      dayName: new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(d),
    })
  }
  return days
}

function generateSlots(day: DaySchedule, interval: number): string[] {
  if (!day.open) return []
  const slots: string[] = []
  const [sh, sm] = day.start.split(':').map(Number)
  const [eh, em] = day.end.split(':').map(Number)
  const [bsh, bsm] = day.breakStart.split(':').map(Number)
  const [beh, bem] = day.breakEnd.split(':').map(Number)
  const startMin = sh * 60 + sm
  const endMin = eh * 60 + em
  const breakStartMin = bsh * 60 + bsm
  const breakEndMin = beh * 60 + bem

  for (let m = startMin; m < endMin; m += interval) {
    if (m >= breakStartMin && m < breakEndMin) continue
    const h = Math.floor(m / 60)
    const min = m % 60
    slots.push(`${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`)
  }
  return slots
}

export default function BookingEngine() {
  const { state, addAppointment } = useStore()
  const [step, setStep] = useState<Step>('prestation')
  const [selectedPrestation, setSelectedPrestation] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')

  const days = useMemo(() => getNext7Days(state.schedule), [state.schedule])
  const prestation = state.prestations.find(p => p.id === selectedPrestation)

  const slots = useMemo(() => {
    if (!selectedDate) return []
    const d = new Date(selectedDate)
    const dayKey = DAY_KEYS[d.getDay()]
    const daySched = state.schedule[dayKey]
    if (!daySched) return []
    return generateSlots(daySched, state.slotInterval)
  }, [selectedDate, state.schedule, state.slotInterval])

  const busySlots = useMemo(() => {
    return new Set(
      state.appointments
        .filter(a => a.date === selectedDate)
        .map(a => a.time)
    )
  }, [selectedDate, state.appointments])

  function handleConfirm() {
    if (!prestation) return
    const appt: Appointment = {
      id: Date.now().toString(),
      date: selectedDate,
      time: selectedTime,
      clientName: `${firstName} ${lastName}`,
      clientPhone: phone,
      prestation: prestation.name,
      source: 'En ligne',
    }
    addAppointment(appt)
    setStep('confirm')
  }

  function handleICS() {
    if (!prestation) return
    generateICS({
      summary: `${prestation.name} — ${state.brandName}`,
      date: selectedDate,
      time: selectedTime,
      durationMin: prestation.duration,
      location: state.contact.address,
      description: `RDV ${prestation.name} (${prestation.duration} min) chez ${state.brandName}`,
    })
  }

  function reset() {
    setStep('prestation')
    setSelectedPrestation('')
    setSelectedDate('')
    setSelectedTime('')
    setFirstName('')
    setLastName('')
    setPhone('')
  }

  const steps: { key: Step; icon: typeof Calendar; label: string }[] = [
    { key: 'prestation', icon: Check, label: 'Soin' },
    { key: 'date', icon: Calendar, label: 'Date' },
    { key: 'time', icon: Clock, label: 'Heure' },
    { key: 'info', icon: User, label: 'Coordonnées' },
  ]

  const stepOrder: Step[] = ['prestation', 'date', 'time', 'info', 'confirm']
  const stepIndex = stepOrder.indexOf(step)

  return (
    <section id="reservation" className="py-24 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-light italic mb-3">Réservation en ligne</h2>
          <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: state.accentColor }} />
          <p className="text-brown-500 font-light">Réservez votre soin en quelques clics</p>
        </div>

        {step !== 'confirm' && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {steps.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors"
                  style={{
                    backgroundColor: stepIndex >= i ? state.accentColor : '#E7DCCB',
                    color: stepIndex >= i ? 'white' : '#8A7E6F',
                  }}
                >
                  {i + 1}
                </div>
                <span className="text-sm text-brown-500 hidden sm:inline">{s.label}</span>
                {i < steps.length - 1 && <div className="w-8 h-px bg-beige-300" />}
              </div>
            ))}
          </div>
        )}

        <div className="bg-beige-50 rounded-2xl p-6 md:p-8 shadow-sm">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {step === 'prestation' && (
                <div className="space-y-3">
                  <h3 className="font-serif text-xl mb-4">Choisissez votre soin</h3>
                  {state.prestations.map(p => (
                    <button
                      key={p.id}
                      onClick={() => { setSelectedPrestation(p.id); setStep('date') }}
                      className="w-full text-left p-4 rounded-xl border transition-all hover:shadow-sm flex items-center justify-between"
                      style={{
                        borderColor: selectedPrestation === p.id ? state.accentColor : '#E7DCCB',
                        backgroundColor: selectedPrestation === p.id ? state.accentColor + '10' : 'white',
                      }}
                    >
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-sm text-brown-500">{p.duration} min</p>
                      </div>
                      <span className="font-serif text-lg" style={{ color: state.accentColor }}>{p.price} €</span>
                    </button>
                  ))}
                </div>
              )}

              {step === 'date' && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setStep('prestation')} className="text-brown-500 hover:text-brown-900">
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="font-serif text-xl">Choisissez une date</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {days.map(d => (
                      <button
                        key={d.date}
                        onClick={() => { setSelectedDate(d.date); setStep('time') }}
                        className="p-3 rounded-xl border text-center transition-all hover:shadow-sm"
                        style={{
                          borderColor: selectedDate === d.date ? state.accentColor : '#E7DCCB',
                          backgroundColor: selectedDate === d.date ? state.accentColor + '10' : 'white',
                        }}
                      >
                        <p className="text-sm capitalize font-medium">{d.dayName}</p>
                        <p className="text-xs text-brown-500 capitalize">{d.label}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 'time' && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setStep('date')} className="text-brown-500 hover:text-brown-900">
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="font-serif text-xl">Choisissez un horaire</h3>
                  </div>
                  {slots.length === 0 ? (
                    <p className="text-brown-500 text-center py-8">Aucun créneau disponible ce jour</p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2">
                      {slots.map(s => {
                        const busy = busySlots.has(s)
                        return (
                          <button
                            key={s}
                            disabled={busy}
                            onClick={() => { setSelectedTime(s); setStep('info') }}
                            className="py-3 rounded-xl border text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-sm"
                            style={{
                              borderColor: selectedTime === s ? state.accentColor : '#E7DCCB',
                              backgroundColor: selectedTime === s ? state.accentColor + '10' : 'white',
                            }}
                          >
                            {busy ? <span className="line-through">{s}</span> : s}
                          </button>
                        )
                      })}
                    </div>
                  )}
                  {busySlots.size > 0 && (
                    <p className="text-xs text-brown-500 mt-3">Les créneaux barrés sont déjà pris</p>
                  )}
                </div>
              )}

              {step === 'info' && (
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <button onClick={() => setStep('time')} className="text-brown-500 hover:text-brown-900">
                      <ChevronLeft size={20} />
                    </button>
                    <h3 className="font-serif text-xl">Vos coordonnées</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Prénom"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none focus:border-accent"
                      />
                      <input
                        type="text"
                        placeholder="Nom"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none focus:border-accent"
                      />
                    </div>
                    <input
                      type="tel"
                      placeholder="Téléphone"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none focus:border-accent"
                    />
                    <button
                      onClick={handleConfirm}
                      disabled={!firstName || !lastName || !phone}
                      className="w-full text-white py-3 rounded-full font-medium transition-opacity hover:opacity-90 disabled:opacity-40"
                      style={{ backgroundColor: state.accentColor }}
                    >
                      Confirmer le rendez-vous
                    </button>
                  </div>
                </div>
              )}

              {step === 'confirm' && prestation && (
                <div className="text-center py-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                    style={{ backgroundColor: state.accentColor + '20' }}
                  >
                    <Check size={32} style={{ color: state.accentColor }} />
                  </motion.div>
                  <h3 className="font-serif text-2xl italic mb-2">Rendez-vous confirmé !</h3>
                  <div className="bg-white rounded-xl p-4 mb-6 text-left space-y-2 text-sm">
                    <p><span className="text-brown-500">Soin :</span> {prestation.name}</p>
                    <p><span className="text-brown-500">Date :</span> {new Date(selectedDate).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                    <p><span className="text-brown-500">Heure :</span> {selectedTime}</p>
                    <p><span className="text-brown-500">Durée :</span> {prestation.duration} min</p>
                    <p><span className="text-brown-500">Nom :</span> {firstName} {lastName}</p>
                  </div>
                  <button
                    onClick={handleICS}
                    className="w-full flex items-center justify-center gap-2 text-white py-3 rounded-full font-medium transition-opacity hover:opacity-90 mb-3"
                    style={{ backgroundColor: state.accentColor }}
                  >
                    <CalendarPlus size={18} />
                    Ajouter à mon agenda
                  </button>
                  <p className="text-xs text-brown-500 mb-4">Un rappel automatique vous sera envoyé la veille</p>
                  <button onClick={reset} className="text-sm underline underline-offset-4 text-brown-500 hover:text-brown-900">
                    Prendre un autre rendez-vous
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
