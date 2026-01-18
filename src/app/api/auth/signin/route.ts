import { signIn, SignInRequestParams } from '@/api/auth/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = (await request.json()) as SignInRequestParams

  const data = await signIn(body)

  if (data.refreshToken) {
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
