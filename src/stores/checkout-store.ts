import { create } from "zustand";

type States = {
  name: string,
  adress: {
    street: string
    number: string
    complement?: string | undefined
    district: string,
    city: string,
    state: string
  }
}

type Actions = {
  setName: (name: States['name']) => void
  setAdress: (name: States['adress']) => void
}

const initialState: States = {
  name: '',
  adress: {
    street: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    state: ''
  }
}

export const useCheckoutStore = create<States & Actions>()(set => ({
  ...initialState,
  setName: (name) => set(state => ({ ...state, name })),
  setAdress: (adress) => set(state => ({ ...state, adress }))
}))