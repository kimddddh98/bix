'use client'
import { logout } from '@/api/auth/auth'
import http from '@/api/axios'
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
      console.log(e)
      logout()
      router.replace('/signin')
    }
  }
  const test = async () => {
    const res = await http.post('/api/test')
  }

  useEffect(() => {
    if (!hasHydrated) return
    if (!accessToken) {
      checkToken()
    }
  }, [accessToken, hasHydrated])

  return (
    <div>
      여기는 레이아웃 {accessToken}
      <button className="border" onClick={test}>
        재발급 버튼
      </button>
      {children}
    </div>
  )
}
