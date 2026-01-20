import { rotateToken } from '@/api/auth/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
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

      cookieStore.set('accessToken', data.accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
      })

      return NextResponse.json(data)
    }
  } catch (error: any) {
    if (error.response) {
      const response = NextResponse.json(error, {
        status: error.response.status,
      })
      if (error.response.status === 401 || error.response.status === 403) {
        response.cookies.set('refreshToken', '', {
          path: '/',
          maxAge: 0,
        })
        response.cookies.set('accessToken', '', {
          path: '/',
          maxAge: 0,
        })
      }
      return response
    }
  }
  return NextResponse.json(
    { message: '로그인이 만료되었습니다.' },
    { status: 401 }
  )
}
