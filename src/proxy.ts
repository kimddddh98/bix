import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PROTECTED_ROUTES, PUBLIC_ROUTES, ROUTES } from './const/route.const'

export default function proxy(request: NextRequest) {
  const { nextUrl, cookies } = request
  const refreshToken = cookies.get('refreshToken')

  if (
    PUBLIC_ROUTES.some((route) => nextUrl.pathname.startsWith(route)) &&
    refreshToken
  ) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  if (
    PROTECTED_ROUTES.some((route) =>
      route === '/'
        ? nextUrl.pathname === '/'
        : nextUrl.pathname.startsWith(route)
    ) &&
    !refreshToken
  ) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

// Optional: Define paths for the proxy to run on
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
