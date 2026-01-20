import Header from '@/components/common/Header'
import Protected from '@/components/common/ProtectedLayout'
import { cookies } from 'next/headers'

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')
  return (
    <div>
      <Header />
      <Protected accessToken={accessToken?.value ?? null}>{children}</Protected>
    </div>
  )
}
