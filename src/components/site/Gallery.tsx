import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useStore } from '../../store'

interface SliderProps {
  label: string
  index: number
}

function BeforeAfterSlider({ label, index }: SliderProps) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const hues = [30, 20, 40]
  const beforeColor = `hsl(${hues[index % 3]}, 25%, 75%)`
  const afterColor = `hsl(${hues[index % 3]}, 40%, 60%)`

  function handleMove(clientX: number) {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.max(2, Math.min(98, x)))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div
        ref={containerRef}
        className="relative h-64 md:h-80 cursor-col-resize select-none touch-none"
        onPointerDown={(e) => {
          (e.target as HTMLElement).setPointerCapture(e.pointerId)
          handleMove(e.clientX)
        }}
        onPointerMove={(e) => {
          if (e.buttons > 0) handleMove(e.clientX)
        }}
      >
        <div className="absolute inset-0 flex items-end justify-center pb-4 text-white/70 text-sm font-serif italic"
          style={{ backgroundColor: afterColor }}>
          Après
        </div>
        <div className="absolute inset-0 flex items-end justify-center pb-4 text-white/70 text-sm font-serif italic"
          style={{ backgroundColor: beforeColor, clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          Avant
        </div>
        <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-brown-900 text-xs font-medium px-3 py-1 rounded-full shadow-sm z-10">
          {label}
        </div>
        <div className="absolute top-0 bottom-0 w-0.5 bg-white/80" style={{ left: `${pos}%` }}>
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-brown-500">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 7H1M10 7h3M4 7L6 5M4 7l2 2M10 7l-2-2M10 7l-2 2" />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const { state } = useStore()
  const items = [
    { label: 'Soin du visage' },
    { label: 'Manucure' },
    { label: 'Épilation' },
  ]

  return (
    <section id="galerie" className="py-24 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-light italic mb-3">Avant / Après</h2>
          <div className="w-12 h-px mx-auto mb-4" style={{ backgroundColor: state.accentColor }} />
          <p className="text-brown-500 font-light">Découvrez les résultats de nos soins</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <BeforeAfterSlider key={i} label={item.label} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
