import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PROTECTED_ROUTES, ROUTES } from './const/route.const'

export default function proxy(request: NextRequest) {
  const { nextUrl, cookies } = request
  console.log('프록시 동작')
  const refreshToken = cookies.get('refreshToken')
  console.log('refreshToken', refreshToken)

  if (nextUrl.pathname === ROUTES.SIGN_IN && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (nextUrl.pathname === ROUTES.HOME && !refreshToken) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

// Optional: Define paths for the proxy to run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
