import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, MessageCircle, AtSign } from 'lucide-react'
import { useStore } from '../../store'

const DAYS_ORDER = [
  { key: 'lundi', label: 'Lun' },
  { key: 'mardi', label: 'Mar' },
  { key: 'mercredi', label: 'Mer' },
  { key: 'jeudi', label: 'Jeu' },
  { key: 'vendredi', label: 'Ven' },
  { key: 'samedi', label: 'Sam' },
  { key: 'dimanche', label: 'Dim' },
]

function formatScheduleHours(schedule: Record<string, { open: boolean; start: string; end: string }>): string[] {
  const lines: string[] = []
  let i = 0
  while (i < DAYS_ORDER.length) {
    const current = schedule[DAYS_ORDER[i].key]
    let j = i + 1
    while (j < DAYS_ORDER.length) {
      const next = schedule[DAYS_ORDER[j].key]
      if (current.open !== next.open || (current.open && (current.start !== next.start || current.end !== next.end))) break
      j++
    }
    const range = i === j - 1
      ? DAYS_ORDER[i].label
      : `${DAYS_ORDER[i].label} — ${DAYS_ORDER[j - 1].label}`
    lines.push(current.open ? `${range} : ${current.start} – ${current.end}` : `${range} : Fermé`)
    i = j
  }
  return lines
}

export default function Contact() {
  const { state } = useStore()
  const { contact } = state
  const hoursLines = formatScheduleHours(state.schedule)

  return (
    <section id="contact" className="py-24 px-4 bg-beige-200/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-light italic mb-3">Nous trouver</h2>
          <div className="w-12 h-px mx-auto" style={{ backgroundColor: state.accentColor }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-beige-50 rounded-2xl p-8 space-y-6"
          >
            <div className="flex items-start gap-3">
              <MapPin size={20} style={{ color: state.accentColor }} className="mt-1 shrink-0" />
              <div>
                <p className="font-medium mb-1">Adresse</p>
                <p className="text-brown-500">{contact.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone size={20} style={{ color: state.accentColor }} className="mt-1 shrink-0" />
              <div>
                <p className="font-medium mb-1">Téléphone</p>
                <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="text-brown-500 hover:text-brown-900">
                  {contact.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock size={20} style={{ color: state.accentColor }} className="mt-1 shrink-0" />
              <div>
                <p className="font-medium mb-1">Horaires</p>
                {hoursLines.map((h, i) => (
                  <p key={i} className="text-brown-500 text-sm">{h}</p>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              {contact.whatsapp && (
                <a
                  href={`https://wa.me/${contact.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm transition-opacity hover:opacity-90"
                  style={{ backgroundColor: '#25D366' }}
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              )}
              <a
                href={`tel:${contact.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-white px-5 py-2.5 rounded-full text-sm transition-opacity hover:opacity-90"
                style={{ backgroundColor: state.accentColor }}
              >
                <Phone size={16} />
                Appeler
              </a>
              {contact.instagram && (
                <a
                  href={`https://instagram.com/${contact.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 border border-beige-300 px-4 py-2.5 rounded-full text-sm hover:bg-beige-50 transition-colors"
                >
                  <AtSign size={16} />
                  {contact.instagram}
                </a>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-beige-300 rounded-2xl flex items-center justify-center min-h-[300px]"
          >
            <div className="text-center text-brown-500">
              <MapPin size={48} className="mx-auto mb-3 opacity-40" />
              <p className="font-serif italic text-lg">24 rue de la Paix</p>
              <p className="text-sm">75002 Paris</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
