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

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const data = await rotateTokenApi()
        const { accessToken } = data

        useAuthStore.getState().actions.setAccessToken(accessToken)
        originalRequest.headers.Authorization = `Bearer ${accessToken}`

        return http(originalRequest)
      } catch (error) {
        useAuthStore.getState().actions.logout()
        return Promise.reject(error)
      }
    }
    if (error.response?.status === 401 || error.response?.status === 403) {
      await logout()
      useAuthStore.getState().actions.logout()
      window.location.href = '/signin'
    }

    return Promise.reject(error)
  }
)

export default http
