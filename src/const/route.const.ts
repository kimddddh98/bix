export const ROUTES = {
  POSTS: '/',
  POST_BASE: '/post',
  POST: (id: number) => `${ROUTES.POST_BASE}/${id}`,
  WRITE_POST: '/write',
  EDIT_POST: (id: number) => `${ROUTES.POST_BASE}/${id}/edit`,
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
} as const

export type RouteKeyType = keyof typeof ROUTES
export const ROUTES_KEY: Record<RouteKeyType, RouteKeyType> = {
  POSTS: 'POSTS',
  POST_BASE: 'POST_BASE',
  POST: 'POST',
  EDIT_POST: 'EDIT_POST',
  WRITE_POST: 'WRITE_POST',
  SIGN_IN: 'SIGN_IN',
  SIGN_UP: 'SIGN_UP',
} as const

export const PROTECTED_ROUTES = [
  ROUTES.POSTS,
  ROUTES.POST_BASE,
  ROUTES.WRITE_POST,
] as const

export const PUBLIC_ROUTES = [ROUTES.SIGN_IN, ROUTES.SIGN_UP] as const
