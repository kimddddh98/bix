'use client'
import { useAuthStore } from '@/store/auth/authStore'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const accessToken = useAuthStore((state) => state.accessToken)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  useEffect(() => {
    if (!hasHydrated) return
    if (accessToken) {
      router.replace('/')
    }
  }, [hasHydrated])

  return children
}
