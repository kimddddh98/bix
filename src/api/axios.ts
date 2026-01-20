import URL from '@/const/urls.const'
import { useAuthStore } from '@/store/auth/authStore'
import axios from 'axios'
import { logout, rotateTokenApi } from './auth/auth'

export const http = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

http.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().accessToken

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    if (config.url && !config.url.startsWith(URL.apiRouteUrl)) {
      config.url = URL.baseUrl + config.url
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config
    console.log('시작', error)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const data = await rotateTokenApi()
        const { accessToken } = data
        if (useAuthStore.getState().hasHydrated) {
          useAuthStore.getState().actions.setAccessToken(accessToken)
        }
        originalRequest.headers.Authorization = `Bearer ${accessToken}`
        console.log('originalRequest', originalRequest)
        return http(originalRequest)
      } catch (error) {
        console.log('catch', error)

        if (useAuthStore.getState().hasHydrated) {
          useAuthStore.getState().actions.logout()
        }
        return Promise.reject(error)
      }
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      await logout()
      if (useAuthStore.getState().hasHydrated) {
        useAuthStore.getState().actions.logout()
      }
      window.location.href = '/signin'
      // alert('로그인이 만료되었습니다. 다시 로그인 해주세요.')
    }

    return Promise.reject(error)
  }
)

export default http
