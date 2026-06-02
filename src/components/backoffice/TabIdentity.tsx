import { useStore } from '../../store'

const COLORS = ['#A6815C', '#8B6F4E', '#B5936B', '#C9A882', '#7D6B5D', '#9E7B6B', '#B08D7A', '#6B7D5D']

export default function TabIdentity() {
  const { state, setBrandName, setSlogan, setAccentColor } = useStore()

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Nom de la marque</label>
        <input
          type="text"
          value={state.brandName}
          onChange={e => setBrandName(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Slogan</label>
        <input
          type="text"
          value={state.slogan}
          onChange={e => setSlogan(e.target.value)}
          className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none focus:border-accent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Couleur d'accent</label>
        <div className="flex gap-3 flex-wrap">
          {COLORS.map(c => (
            <button
              key={c}
              onClick={() => setAccentColor(c)}
              className="w-10 h-10 rounded-full transition-transform hover:scale-110"
              style={{
                backgroundColor: c,
                outline: state.accentColor === c ? `3px solid ${c}` : 'none',
                outlineOffset: '3px',
              }}
            />
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <input
            type="color"
            value={state.accentColor}
            onChange={e => setAccentColor(e.target.value)}
            className="w-8 h-8 rounded border-0 cursor-pointer"
          />
          <span className="text-sm text-brown-500 font-mono">{state.accentColor}</span>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-beige-300">
        <p className="text-xs text-brown-500 mb-2">Aperçu en direct</p>
        <p className="font-serif text-2xl italic" style={{ color: state.accentColor }}>{state.brandName}</p>
        <p className="text-sm text-brown-500">{state.slogan}</p>
      </div>
    </div>
  )
}
