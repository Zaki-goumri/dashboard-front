import {atom} from 'jotai'


interface Idata {
    name: string
    value: number
  }
export const userAtom = atom(null)

export const isAuthorizedAtom = atom('')

export const cartAtom = atom(null)

export const housingAtom = atom<Idata[]>([])
