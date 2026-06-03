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

export interface DaySchedule {
  open: boolean
  start: string
  end: string
  breakStart: string
  breakEnd: string
}

export type WeekSchedule = Record<string, DaySchedule>

export interface StoreState {
  brandName: string
  slogan: string
  accentColor: string
  prestations: Prestation[]
  avis: Avis[]
  appointments: Appointment[]
  gallery: GalleryItem[]
  schedule: WeekSchedule
  slotInterval: number
  contact: {
    address: string
    phone: string
    whatsapp: string
    instagram: string
    tiktok: string
    hours: string[]
  }
  loyaltyStamps: number
}
