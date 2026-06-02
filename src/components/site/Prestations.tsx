import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { useStore } from '../../store'

export default function Prestations() {
  const { state } = useStore()

  return (
    <section id="prestations" className="py-24 px-4 bg-beige-200/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-light italic mb-3">Nos Prestations</h2>
          <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: state.accentColor }} />
          <p className="text-brown-500 font-light">Des soins sur-mesure pour sublimer votre beauté naturelle</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {state.prestations.map((p, i) => (
            <motion.a
              href="#reservation"
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -2 }}
              className="block bg-beige-50 rounded-2xl p-6 group hover:shadow-lg transition-shadow cursor-pointer no-underline text-inherit"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium mb-1.5 group-hover:text-brown-900 transition-colors">{p.name}</h3>
                  <div className="flex items-center gap-2 text-brown-500 text-sm">
                    <Clock size={14} />
                    <span>{p.duration} min</span>
                  </div>
                </div>
                <div className="text-right flex items-center gap-3">
                  <span className="text-2xl font-serif font-medium" style={{ color: state.accentColor }}>{p.price} €</span>
                  <div className="w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
                    style={{ backgroundColor: state.accentColor + '15', color: state.accentColor }}>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}
