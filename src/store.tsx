import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { StoreState, Prestation, Avis, Appointment, DaySchedule } from './types'
import { defaultData } from './mock-data'

interface StoreContextType {
  state: StoreState
  setBrandName: (name: string) => void
  setSlogan: (slogan: string) => void
  setAccentColor: (color: string) => void
  addPrestation: (p: Prestation) => void
  updatePrestation: (id: string, p: Partial<Prestation>) => void
  removePrestation: (id: string) => void
  addAvis: (a: Avis) => void
  removeAvis: (id: string) => void
  addAppointment: (a: Appointment) => void
  cancelAppointment: (id: string) => void
  updateDaySchedule: (day: string, schedule: Partial<DaySchedule>) => void
  setSlotInterval: (interval: number) => void
  addLoyaltyStamp: () => void
  resetLoyalty: () => void
  resetDemo: () => void
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<StoreState>(() => structuredClone(defaultData))

  const setBrandName = useCallback((brandName: string) =>
    setState(s => ({ ...s, brandName })), [])

  const setSlogan = useCallback((slogan: string) =>
    setState(s => ({ ...s, slogan })), [])

  const setAccentColor = useCallback((accentColor: string) =>
    setState(s => ({ ...s, accentColor })), [])

  const addPrestation = useCallback((p: Prestation) =>
    setState(s => ({ ...s, prestations: [...s.prestations, p] })), [])

  const updatePrestation = useCallback((id: string, updates: Partial<Prestation>) =>
    setState(s => ({
      ...s,
      prestations: s.prestations.map(p => p.id === id ? { ...p, ...updates } : p),
    })), [])

  const removePrestation = useCallback((id: string) =>
    setState(s => ({ ...s, prestations: s.prestations.filter(p => p.id !== id) })), [])

  const addAvis = useCallback((a: Avis) =>
    setState(s => ({ ...s, avis: [...s.avis, a] })), [])

  const removeAvis = useCallback((id: string) =>
    setState(s => ({ ...s, avis: s.avis.filter(a => a.id !== id) })), [])

  const addAppointment = useCallback((a: Appointment) =>
    setState(s => ({ ...s, appointments: [...s.appointments, a] })), [])

  const cancelAppointment = useCallback((id: string) =>
    setState(s => ({ ...s, appointments: s.appointments.filter(a => a.id !== id) })), [])

  const updateDaySchedule = useCallback((day: string, updates: Partial<DaySchedule>) =>
    setState(s => ({
      ...s,
      schedule: { ...s.schedule, [day]: { ...s.schedule[day], ...updates } },
    })), [])

  const setSlotInterval = useCallback((slotInterval: number) =>
    setState(s => ({ ...s, slotInterval })), [])

  const addLoyaltyStamp = useCallback(() =>
    setState(s => ({ ...s, loyaltyStamps: Math.min(s.loyaltyStamps + 1, 5) })), [])

  const resetLoyalty = useCallback(() =>
    setState(s => ({ ...s, loyaltyStamps: 0 })), [])

  const resetDemo = useCallback(() =>
    setState(structuredClone(defaultData)), [])

  return (
    <StoreContext.Provider value={{
      state, setBrandName, setSlogan, setAccentColor,
      addPrestation, updatePrestation, removePrestation,
      addAvis, removeAvis,
      addAppointment, cancelAppointment,
      updateDaySchedule, setSlotInterval,
      addLoyaltyStamp, resetLoyalty, resetDemo,
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
