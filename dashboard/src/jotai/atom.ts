import { employees } from '@/components/employeeForm'
import { HebergementFormData } from '@/components/hebergement'
import { reservationsData } from '@/components/resarvationsComponent'
import {atom} from 'jotai'


interface Idata {
    name: string
    value: number
  }
export const userAtom = atom(null)

export const isAuthorizedAtom = atom('')

export const cartAtom = atom(null)

export const housingAtom = atom<Idata[]>([])
export const isVisible = atom(false)


export const updateHousingAtom =  atom<HebergementFormData  | null>(null)
export const updateReservationsAtom =  atom<reservationsData | null>(null)
export const updateEmpolyeeAtom =  atom<employees | null>(null)
