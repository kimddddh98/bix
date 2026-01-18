'use client'
import { useAuthStore } from '@/store/auth/authStore'
import React from 'react'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const accessToken = useAuthStore((state) => state.accessToken)
  return (
    <div>
      여기는 레이아웃 {accessToken}
      {children}
    </div>
  )
}
