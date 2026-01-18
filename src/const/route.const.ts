export const ROUTES = {
  HOME: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
} as const

export type RouteKeyType = keyof typeof ROUTES
export const ROUTES_KEY: Record<RouteKeyType, RouteKeyType> = {
  HOME: 'HOME',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
} as const

export const PROTECTED_ROUTES = [ROUTES.HOME] as const

export const PUBLIC_ROUTES = [ROUTES.SIGN_IN, ROUTES.SIGN_UP] as const
