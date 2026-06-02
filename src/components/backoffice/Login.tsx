import { useState } from 'react'
import { Lock } from 'lucide-react'

interface Props {
  onLogin: () => void
}

export default function Login({ onLogin }: Props) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (password === 'naevo') {
      onLogin()
    } else {
      setError(true)
      setTimeout(() => setError(false), 2000)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-beige-100">
      <div className="bg-beige-50 rounded-2xl p-8 w-full max-w-sm shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-beige-200 flex items-center justify-center mx-auto mb-4">
          <Lock size={24} className="text-brown-500" />
        </div>
        <h2 className="font-serif text-2xl italic mb-1">Espace Pro</h2>
        <p className="text-sm text-brown-500 mb-6">Connectez-vous pour gérer votre institut</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className={`w-full px-4 py-3 rounded-xl border bg-white focus:outline-none transition-colors ${error ? 'border-red-400' : 'border-beige-300 focus:border-accent'}`}
          />
          <button
            type="submit"
            className="w-full bg-accent text-white py-3 rounded-full font-medium transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#A6815C' }}
          >
            Connexion
          </button>
        </form>

        <p className="text-xs text-brown-500 mt-4">
          Indice : le mot de passe est <span className="font-mono bg-beige-200 px-1.5 py-0.5 rounded">naevo</span>
        </p>
      </div>
    </div>
  )
}
