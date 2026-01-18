import { rotateToken } from '@/api/auth/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const cookieStore = await cookies() //
  const refreshToken = cookieStore.get('refreshToken')


  if (refreshToken?.value) {
    const data = await rotateToken(refreshToken.value)

    const cookieStore = await cookies()
    cookieStore.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    })

    return NextResponse.json(data)
  }

  return NextResponse.json(
    { message: '로그인에 실패했습니다.' },
    { status: 401 }
  )
}
