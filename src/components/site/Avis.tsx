import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useStore } from '../../store'

export default function Avis() {
  const { state } = useStore()
  const [current, setCurrent] = useState(0)

  const avg = state.avis.length
    ? (state.avis.reduce((s, a) => s + a.rating, 0) / state.avis.length).toFixed(1)
    : '0'

  useEffect(() => {
    if (state.avis.length <= 1) return
    const id = setInterval(() => setCurrent(c => (c + 1) % state.avis.length), 5000)
    return () => clearInterval(id)
  }, [state.avis.length])

  if (!state.avis.length) return null

  const avis = state.avis[current % state.avis.length]

  return (
    <section id="avis" className="py-24 px-4 bg-beige-200/50">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light italic mb-3">Ce qu'elles en disent</h2>
          <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: state.accentColor }} />
        </motion.div>

        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="text-3xl font-serif font-medium" style={{ color: state.accentColor }}>{avg}</span>
          <div className="flex">
            {[1, 2, 3, 4, 5].map(s => (
              <Star key={s} size={18} fill={s <= Math.round(Number(avg)) ? state.accentColor : 'none'} stroke={state.accentColor} />
            ))}
          </div>
          <span className="text-brown-500 text-sm ml-1">sur 127 avis</span>
        </div>

        <div className="relative min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={avis.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-center gap-0.5 mb-4">
                {[1, 2, 3, 4, 5].map(s => (
                  <Star key={s} size={16} fill={s <= avis.rating ? state.accentColor : 'none'} stroke={state.accentColor} />
                ))}
              </div>
              <p className="text-lg italic text-brown-900 mb-4 font-light leading-relaxed">
                « {avis.text} »
              </p>
              <p className="text-brown-500 font-medium">{avis.name}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-4 mt-6">
          <button onClick={() => setCurrent(c => (c - 1 + state.avis.length) % state.avis.length)}
            className="w-10 h-10 rounded-full border border-beige-300 flex items-center justify-center hover:bg-beige-50 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <div className="flex gap-2">
            {state.avis.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)}
                className="w-2 h-2 rounded-full transition-colors"
                style={{ backgroundColor: i === current % state.avis.length ? state.accentColor : '#D4C5B0' }}
              />
            ))}
          </div>
          <button onClick={() => setCurrent(c => (c + 1) % state.avis.length)}
            className="w-10 h-10 rounded-full border border-beige-300 flex items-center justify-center hover:bg-beige-50 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  )
}
