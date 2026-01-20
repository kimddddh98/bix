import URL from '@/const/urls.const'
import { cookies } from 'next/headers'

type FetchOptions = Omit<RequestInit, 'headers'> & {
  headers?: HeadersInit & Record<string, string>
}

export async function serverFetch<T = unknown>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')
  const url = endpoint.startsWith('/api')
    ? endpoint
    : `${URL.baseUrl}${endpoint}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    // 토큰이 있으면 Authorization 헤더 추가
    Authorization: accessToken?.value ? `Bearer ${accessToken.value}` : '',
    ...options.headers,
  }

  const response = await fetch(url, {
    ...options,
    method: options.method || 'GET',
    headers,
    cache: options.cache || 'no-store',
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}))
    throw new Error(
      `serverFetch 실패: ${response.status} ${response.statusText}`,
      {
        cause: {
          status: response.status,
          statusText: response.statusText,
          data: errorData,
        },
      }
    )
  }

  const data = await response.json()
  return data as T
}

export async function serverGet<T = unknown>(
  endpoint: string,
  options?: Omit<FetchOptions, 'method'>
): Promise<T> {
  return serverFetch<T>(endpoint, { ...options, method: 'GET' })
}
