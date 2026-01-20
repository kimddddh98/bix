import { signIn, SignInRequestParams } from '@/api/auth/auth'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignInRequestParams

    const data = await signIn(body)

    if (data.refreshToken && data.accessToken) {
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
    }
    return NextResponse.json(data)
  } catch (error: any) {
    if (error?.response) {
      return NextResponse.json(error.response.data, {
        status: error.status,
      })
    }
    return NextResponse.json(error, {
      status: 500,
    })
  }
}
