// proxy.ts in Next.js 16
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  // Your existing logic for rewrites, redirects, headers, etc.
  // return NextResponse.redirect(new URL('', request.url))

  const refreshToken = request.cookies.get('refreshToken')

  if (!refreshToken) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  return NextResponse.next()
}

// Optional: Define paths for the proxy to run on
export const config = {
  matcher: ['/'],
}
