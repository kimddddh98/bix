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
      <header className="sticky top-0 z-10 border-b border-b-black/10 bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <span className="text-cc text-ccbs-green text-xl font-bold">
            빅스페이먼츠
          </span>
          <button
            type="button"
            className="bg-primary hover:bg-primary-hover rounded-lg px-3 py-2 text-sm font-medium text-white"
          >
            로그아웃
          </button>
        </div>
      </header>
      {children}
    </div>
  )
}
