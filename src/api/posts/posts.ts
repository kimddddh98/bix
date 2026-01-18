import http from '../axios'

export const POSTS_ENDPOINTS = {
  POST_LIST: '/boards',
} as const

export interface Posts {}

const getPostList = async () => {
  const response = await http.get<BaseResponse<Posts[]>>(
    POSTS_ENDPOINTS.POST_LIST
  )
  return response.data
}

export { getPostList }
