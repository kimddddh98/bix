'use client'

import { rotateTokenApi } from '@/api/auth/auth'
import useAuth from '@/hooks/auth/useAuth'

const Header = () => {
  const { onLogout } = useAuth()
  return (
    <header className="sticky top-0 z-10 border-b border-b-black/10 bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <span className="text-cc text-ccbs-green text-xl font-bold">
          빅스페이먼츠
        </span>
        <button
          type="button"
          onClick={rotateTokenApi}
          className="bg-primary hover:bg-primary-hover rounded-lg px-3 py-2 text-sm font-medium text-white"
        >
          로그아웃
        </button>
      </div>
    </header>
  )
}

export default Header
