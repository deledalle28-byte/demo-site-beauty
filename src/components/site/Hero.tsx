import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useStore } from '../../store'

export default function Hero() {
  const { state } = useStore()

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center text-center px-4 overflow-hidden">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(ellipse at 50% 35%, ${state.accentColor}30 0%, transparent 65%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: `radial-gradient(ellipse at 80% 80%, ${state.accentColor}20 0%, transparent 50%)`,
        }}
      />

      <div className="relative z-10 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 0.15, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl"
          style={{ backgroundColor: state.accentColor }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm tracking-[0.3em] uppercase text-brown-500 mb-6 font-light"
        >
          Bienvenue chez
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light italic mb-4 leading-[1.1]"
        >
          {state.brandName}
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-16 h-px mx-auto mb-5"
          style={{ backgroundColor: state.accentColor }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-brown-500 mb-10 font-light"
        >
          {state.slogan}
        </motion.p>

        <motion.a
          href="#reservation"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="inline-block text-white px-8 py-3.5 rounded-full text-lg font-light tracking-wide shadow-md hover:shadow-lg transition-shadow"
          style={{ backgroundColor: state.accentColor }}
        >
          Réserver un soin
        </motion.a>
      </div>

      <motion.a
        href="#prestations"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brown-500/50 hover:text-brown-500 transition-colors"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={28} />
        </motion.div>
      </motion.a>
    </section>
  )
}
