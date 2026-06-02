export interface Prestation {
  id: string
  name: string
  duration: number
  price: number
}

export interface Avis {
  id: string
  name: string
  rating: number
  text: string
}

export interface Appointment {
  id: string
  date: string
  time: string
  clientName: string
  clientPhone: string
  prestation: string
  source: 'En ligne' | 'Téléphone'
}

export interface GalleryItem {
  id: string
  before: string
  after: string
  label: string
}

export interface StoreState {
  brandName: string
  slogan: string
  accentColor: string
  prestations: Prestation[]
  avis: Avis[]
  appointments: Appointment[]
  gallery: GalleryItem[]
  contact: {
    address: string
    phone: string
    instagram: string
    tiktok: string
    hours: string[]
  }
  loyaltyStamps: number
}
