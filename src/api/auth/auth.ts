import URL from '@/const/urls.const'
import http, { httpServer } from '../axios'
// import URL from '@/const/urls.const'

export const AUTH_BASE = '/auth'

// next 서버 호출 및 토큰 쿠키에 저장 용도 route handler auth baseUrl
export const SERVER_AUTH_BASE = `${URL.apiRouteUrl}/auth`

export const AUTH_ENDPOINTS = {
  SIGN_IN: `${AUTH_BASE}/signin`,
  SERVER_SIGNIN: `${SERVER_AUTH_BASE}/signin`,
  SIGN_UP: `${AUTH_BASE}/signup`,
  ROTEATE_TOKEN: `${AUTH_BASE}/refresh`,
  SERVER_ROTEATE_TOKEN: `${SERVER_AUTH_BASE}/refresh`,
  SERVER_LOGOUT: `${SERVER_AUTH_BASE}/logout`,
} as const

export interface SignUpRequestParams {
  /* 
    username : 이메일
   */
  username: string
  /* 
    name : 사용자 이름
   */
  name: string
  /* 
    password & confirmPassword: 8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합
  */
  password: string
  confirmPassword: string
}

export type SignInRequestParams = Pick<
  SignUpRequestParams,
  'username' | 'password'
>

export interface SignInResponse {
  accessToken: string
  refreshToken: string
}

const signIn = async (params: SignInRequestParams) => {
  const response = await httpServer.post<SignInResponse>(
    AUTH_ENDPOINTS.SIGN_IN,
    params
  )
  return response.data
}

const signInApi = async (params: SignInRequestParams) => {
  const response = await http.post<SignInResponse>(
    AUTH_ENDPOINTS.SERVER_SIGNIN,
    params
  )
  return response.data
}

const signUp = async (params: SignUpRequestParams) => {
  const response = await http.post(AUTH_ENDPOINTS.SIGN_UP, params)
  return response.data
}

const rotateToken = async (refreshToken: string) => {
  const response = await httpServer.post<SignInResponse>(
    AUTH_ENDPOINTS.ROTEATE_TOKEN,
    {
      refreshToken,
    }
  )
  return response
}

const rotateTokenApi = async () => {
  const response = await http.post<SignInResponse>(
    AUTH_ENDPOINTS.SERVER_ROTEATE_TOKEN
  )
  return response.data
}

const logout = async () => {
  const response = await http.post(AUTH_ENDPOINTS.SERVER_LOGOUT)
  return response.data
}

export { signIn, signUp, signInApi, rotateToken, rotateTokenApi, logout }
