'use client'
import { logout } from '@/api/auth/auth'
import { useAuthActions } from '@/store/auth/authStore'

export default function Page() {
  const { logout: authLogout } = useAuthActions()
  const test = async () => {
    logout()
    authLogout()
  }
  return <div onClick={() => test()}>홈</div>
}
