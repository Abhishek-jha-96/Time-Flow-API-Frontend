// stores/authStore.ts
import { create } from 'zustand'

interface AuthState {
  isLoggedIn: boolean
  setLoggedIn: (val: boolean) => void
}

export const useAuthStore = create<AuthState>(set => ({
  isLoggedIn: false,
  setLoggedIn: val => set({ isLoggedIn: val }),
}))