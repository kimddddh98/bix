const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL
const API_ROUTE_URL = process.env.NEXT_PUBLIC_API_ROUTE_URL
export const URL = {
  baseUrl: API_BASE_URL,
  apiRouteUrl: API_ROUTE_URL,
} as const

export default URL
