import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  hasHydrated: boolean
  actions: AuthActions
}

interface AuthActions {
  login: () => void
  logout: () => Promise<void>
  setAccessToken: (accessToken: string) => void
  setHasHydrated: (value: boolean) => void
}
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      hasHydrated: false,
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
        setHasHydrated: (value: boolean) => set({ hasHydrated: value }),
      },
    }),
    {
      name: 'auth-storage',
      partialize(state) {
        return { accessToken: state.accessToken }
      },
      onRehydrateStorage: () => (state) => {
        state?.actions.setHasHydrated(true)
      },
    }
  )
)

export const useAuthActions = () => useAuthStore((state) => state.actions)
