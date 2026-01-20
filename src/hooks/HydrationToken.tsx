'use client'

import { useAuthActions, useAuthStore } from '@/store/auth/authStore'
import { useEffect } from 'react'

type Props = {
  accessToken: string | null
}

export default function HydrationToken({ accessToken }: Props) {
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  const { setAccessToken } = useAuthActions()

  useEffect(() => {
    if (!hasHydrated) return
    if (accessToken) {
      setAccessToken(accessToken)
    }
  }, [hasHydrated, accessToken, setAccessToken])

  return null
}
