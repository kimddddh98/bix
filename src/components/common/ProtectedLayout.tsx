'use client'
import { logout } from '@/api/auth/auth'
import Header from '@/components/common/Header'
import { ROUTES } from '@/const/route.const'
import useAuth from '@/hooks/auth/useAuth'
import { useAuthActions, useAuthStore } from '@/store/auth/authStore'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
type ProtectedLayoutProps = {
  accessToken: string | null
  children: React.ReactNode
}

export default function Protected({
  children,
  accessToken: cookieToken,
}: ProtectedLayoutProps) {
  const router = useRouter()
  const { getRotateToken } = useAuth()
  const hasHydrated = useAuthStore((state) => state.hasHydrated)
  const { setAccessToken } = useAuthActions()

  const checkToken = async () => {
    try {
      await getRotateToken()
    } catch (e) {
      logout()
      router.replace(ROUTES.SIGN_IN)
    }
  }

  useEffect(() => {
    if (!hasHydrated) return
    if (cookieToken) {
      setAccessToken(cookieToken)
    } else {
      checkToken()
    }
  }, [hasHydrated])

  return children
}
