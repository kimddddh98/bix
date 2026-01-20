'use client'
import { logout } from '@/api/auth/auth'
import http from '@/api/axios'
import Header from '@/components/common/Header'
import useAuth from '@/hooks/auth/useAuth'
import { useAuthStore } from '@/store/auth/authStore'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { getRotateToken } = useAuth()
  const accessToken = useAuthStore((state) => state.accessToken)
  const hasHydrated = useAuthStore((state) => state.hasHydrated)

  const checkToken = async () => {
    try {
      await getRotateToken()
    } catch (e) {
      logout()
      router.replace('/signin')
    }
  }

  useEffect(() => {
    if (!hasHydrated) return
    if (!accessToken) {
      checkToken()
    }
  }, [hasHydrated])

  return (
    <div>
      <Header />

      {children}
    </div>
  )
}
