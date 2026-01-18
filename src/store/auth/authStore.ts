import { setAccessToken } from '@/api/auth/auth'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  actions: AuthActions
}

interface AuthActions {
  login: () => void
  logout: () => Promise<void>
  setAccessToken: (accessToken: string) => void
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      user: null,
      actions: {
        login: async () => {},

        logout: async () => {
          set({
            accessToken: null,
          })
        },

        setAccessToken: async (accessToken: string) => {
          set({ accessToken })
        },
      },
    }),
    {
      name: 'auth-storage',
      partialize(state) {
        return { accessToken: state.accessToken }
      },
    }
  )
)

export const useAuthActions = () => useAuthStore((state) => state.actions)
