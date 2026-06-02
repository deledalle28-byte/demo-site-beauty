import { motion } from 'framer-motion'
import { Stamp } from 'lucide-react'
import { useStore } from '../../store'

const TOTAL = 5

export default function Loyalty() {
  const { state, addLoyaltyStamp, resetLoyalty } = useStore()
  const stamps = state.loyaltyStamps
  const complete = stamps >= TOTAL

  return (
    <section id="fidelite" className="py-24 px-4">
      <div className="max-w-lg mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light italic mb-3">Carte de Fidélité</h2>
          <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: state.accentColor }} />
          <p className="text-brown-500 mb-8 font-light">1 soin offert tous les {TOTAL} rendez-vous</p>
        </motion.div>

        <div className="bg-beige-50 rounded-2xl p-8 shadow-sm">
          <div className="flex justify-center gap-4 mb-6">
            {Array.from({ length: TOTAL }).map((_, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={i < stamps ? { scale: [1, 1.3, 1], rotate: [0, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
              >
                <Stamp
                  size={36}
                  className="transition-colors"
                  fill={i < stamps ? state.accentColor : 'transparent'}
                  stroke={i < stamps ? state.accentColor : '#D4C5B0'}
                />
              </motion.div>
            ))}
          </div>

          {complete ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              <p className="text-lg font-serif italic mb-3" style={{ color: state.accentColor }}>
                Félicitations ! Votre prochain soin est offert 🎉
              </p>
              <button onClick={resetLoyalty}
                className="text-sm text-brown-500 underline underline-offset-4 hover:text-brown-900">
                Utiliser ma récompense
              </button>
            </motion.div>
          ) : (
            <p className="text-brown-500 text-sm">
              {stamps} / {TOTAL} — Plus que {TOTAL - stamps} visite{TOTAL - stamps > 1 ? 's' : ''} !
            </p>
          )}

          <button
            onClick={addLoyaltyStamp}
            disabled={complete}
            className="mt-6 text-white px-6 py-2 rounded-full text-sm transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ backgroundColor: state.accentColor }}
          >
            Tamponner (démo)
          </button>
        </div>
      </div>
    </section>
  )
}
