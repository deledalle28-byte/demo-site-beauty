import { motion } from 'framer-motion'
import { Bell, Mail, MessageSquare } from 'lucide-react'
import { useStore } from '../../store'

export default function Reminders() {
  const { state } = useStore()

  return (
    <section className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-light italic mb-3">Rappels automatiques</h2>
          <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: state.accentColor }} />
          <p className="text-brown-500 font-light">Vos clientes ne manquent plus jamais un rendez-vous</p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-8 justify-center">
          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-72 bg-beige-50 rounded-[2rem] p-4 shadow-lg border border-beige-300/50"
          >
            <div className="w-20 h-1 bg-beige-300 rounded-full mx-auto mb-4" />
            <div className="space-y-3">
              <div className="bg-white rounded-xl p-3 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: state.accentColor + '20' }}>
                  <MessageSquare size={14} style={{ color: state.accentColor }} />
                </div>
                <div>
                  <p className="text-xs text-brown-500 mb-1">SMS — Rappel RDV</p>
                  <p className="text-sm">
                    Bonjour Marie ! Rappel : votre RDV « Soin du visage » demain à 14h chez {state.brandName}. À bientôt ✨
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: state.accentColor + '20' }}>
                  <Mail size={14} style={{ color: state.accentColor }} />
                </div>
                <div>
                  <p className="text-xs text-brown-500 mb-1">Email — Confirmation</p>
                  <p className="text-sm">
                    Votre rendez-vous est confirmé pour demain à 14h. Pensez à arriver 5 min en avance.
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-xl p-3 shadow-sm flex items-start gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: state.accentColor + '20' }}>
                  <Bell size={14} style={{ color: state.accentColor }} />
                </div>
                <div>
                  <p className="text-xs text-brown-500 mb-1">Push — J-1</p>
                  <p className="text-sm">N'oubliez pas votre soin demain ! 💆‍♀️</p>
                </div>
              </div>
            </div>
            <div className="w-28 h-1 bg-beige-300 rounded-full mx-auto mt-4" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-sm space-y-4"
          >
            <h3 className="text-2xl font-serif italic">Moins de no-shows, plus de revenus</h3>
            <p className="text-brown-500 font-light leading-relaxed">
              Vos clientes reçoivent un SMS et un email la veille de leur rendez-vous. Résultat : jusqu'à 60% de rendez-vous manqués en moins.
            </p>
            <div className="flex items-center gap-2 text-sm" style={{ color: state.accentColor }}>
              <Bell size={16} />
              <span className="font-medium">Entièrement automatique</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
