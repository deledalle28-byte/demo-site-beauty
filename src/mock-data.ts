import type { StoreState } from './types'

export const defaultData: StoreState = {
  brandName: 'Belle Époque',
  slogan: 'Institut de beauté & bien-être',
  accentColor: '#A6815C',
  prestations: [
    { id: '1', name: 'Soin du visage hydratant', duration: 60, price: 55 },
    { id: '2', name: 'Épilation jambes complètes', duration: 45, price: 35 },
    { id: '3', name: 'Manucure semi-permanent', duration: 50, price: 39 },
    { id: '4', name: 'Massage relaxant', duration: 30, price: 30 },
  ],
  avis: [
    { id: '1', name: 'Sophie M.', rating: 5, text: 'Un moment de pur bonheur. Le soin du visage est divin, je recommande à 100% !' },
    { id: '2', name: 'Camille D.', rating: 5, text: 'Cadre magnifique et équipe adorable. Ma manucure est parfaite depuis 3 semaines.' },
    { id: '3', name: 'Nathalie R.', rating: 5, text: 'Le massage relaxant est exactement ce qu\'il me fallait. Je reviendrai très vite !' },
    { id: '4', name: 'Léa B.', rating: 4, text: 'Très bon institut, propre et accueillant. Les prix sont justes pour la qualité.' },
  ],
  appointments: [
    { id: '1', date: getDateStr(0), time: '10:00', clientName: 'Marie Dupont', clientPhone: '06 12 34 56 78', prestation: 'Soin du visage hydratant', source: 'Téléphone' },
    { id: '2', date: getDateStr(0), time: '14:30', clientName: 'Julie Martin', clientPhone: '06 98 76 54 32', prestation: 'Manucure semi-permanent', source: 'Téléphone' },
    { id: '3', date: getDateStr(1), time: '11:00', clientName: 'Claire Bernard', clientPhone: '06 55 44 33 22', prestation: 'Massage relaxant', source: 'Téléphone' },
  ],
  gallery: [
    { id: '1', before: '', after: '', label: 'Soin du visage' },
    { id: '2', before: '', after: '', label: 'Manucure' },
    { id: '3', before: '', after: '', label: 'Épilation' },
  ],
  contact: {
    address: '24 rue de la Paix, 75002 Paris',
    phone: '01 42 00 00 00',
    instagram: '@belle.epoque.paris',
    tiktok: '@belleepoque',
    hours: [
      'Lundi — Vendredi : 9h – 19h',
      'Samedi : 9h – 17h',
      'Dimanche : Fermé',
    ],
  },
  loyaltyStamps: 2,
}

function getDateStr(daysFromNow: number): string {
  const d = new Date()
  d.setDate(d.getDate() + daysFromNow)
  return d.toISOString().split('T')[0]
}
