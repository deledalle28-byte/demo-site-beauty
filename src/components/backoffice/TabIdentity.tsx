import { MapPin, Phone, MessageCircle, AtSign } from 'lucide-react'
import { useStore } from '../../store'

const COLORS = ['#A6815C', '#8B6F4E', '#B5936B', '#C9A882', '#7D6B5D', '#9E7B6B', '#B08D7A', '#6B7D5D']

export default function TabIdentity() {
  const { state, setBrandName, setSlogan, setAccentColor, updateContact } = useStore()

  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-medium text-lg mb-4">Marque</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Nom de la marque</label>
            <input
              type="text"
              value={state.brandName}
              onChange={e => setBrandName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Slogan</label>
            <input
              type="text"
              value={state.slogan}
              onChange={e => setSlogan(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none"
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
        </div>
      </div>

      <div className="border-t border-beige-300 pt-6">
        <h3 className="font-medium text-lg mb-4">Coordonnées & réseaux</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 flex items-center gap-2">
              <MapPin size={14} className="text-brown-500" /> Adresse
            </label>
            <input
              type="text"
              value={state.contact.address}
              onChange={e => updateContact({ address: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <Phone size={14} className="text-brown-500" /> Téléphone
              </label>
              <input
                type="tel"
                value={state.contact.phone}
                onChange={e => updateContact({ phone: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <MessageCircle size={14} className="text-brown-500" /> WhatsApp
              </label>
              <input
                type="text"
                value={state.contact.whatsapp}
                onChange={e => updateContact({ whatsapp: e.target.value })}
                placeholder="33612345678"
                className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none"
              />
              <p className="text-xs text-brown-500 mt-1">Numéro international sans + (ex : 33612345678)</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <AtSign size={14} className="text-brown-500" /> Instagram
              </label>
              <input
                type="text"
                value={state.contact.instagram}
                onChange={e => updateContact({ instagram: e.target.value })}
                placeholder="@moncompte"
                className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 flex items-center gap-2">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brown-500">
                  <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
                </svg>
                TikTok
              </label>
              <input
                type="text"
                value={state.contact.tiktok}
                onChange={e => updateContact({ tiktok: e.target.value })}
                placeholder="@moncompte"
                className="w-full px-4 py-3 rounded-xl border border-beige-300 bg-white focus:outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 border border-beige-300">
        <p className="text-xs text-brown-500 mb-2">Aperçu en direct</p>
        <p className="font-serif text-2xl italic" style={{ color: state.accentColor }}>{state.brandName}</p>
        <p className="text-sm text-brown-500 mb-3">{state.slogan}</p>
        <div className="flex flex-wrap gap-2 text-xs text-brown-500">
          <span className="bg-beige-100 px-2 py-1 rounded-full">{state.contact.phone}</span>
          <span className="bg-beige-100 px-2 py-1 rounded-full">{state.contact.instagram}</span>
          {state.contact.tiktok && <span className="bg-beige-100 px-2 py-1 rounded-full">{state.contact.tiktok}</span>}
        </div>
      </div>
    </div>
  )
}
