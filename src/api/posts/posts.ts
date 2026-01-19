import { createPostFormData } from '@/utiles'
import http from '../axios'

export const POSTS_ENDPOINTS = {
  POST_LIST: '/boards',
  CATEGORY: '/boards/categories',
} as const

export interface Posts {
  id: number
  title: string
  category: CategoryKey
  createdAt: string
}

export interface Post extends Omit<Posts, 'category'> {
  content: string
  boardCategory: CategoryKey
  imageUrl: string
}

export interface Category {
  NOTICE: string
  FREE: string
  QNA: string
  ETC: string
}

export type CategoryKey = keyof Category

export type WritePostRequsetParams = Pick<Post, 'title' | 'content'> & {
  category: CategoryKey | ''
}

const getPostList = async ({ pageParam = 0 }: { pageParam: number }) => {
  const response = await http.get<PagenationResponse<Posts[]>>(
    POSTS_ENDPOINTS.POST_LIST,
    {
      params: {
        page: pageParam,
        size: 20,
      },
    }
  )
  return response.data
}

const getPost = async (id: number) => {
  const response = await http.get<Post>(POSTS_ENDPOINTS.POST_LIST + `/${id}`)
  return response.data
}

const getCartegory = async () => {
  const response = await http.get<Category>(POSTS_ENDPOINTS.CATEGORY)
  return response.data
}

const writePost = async (params: WritePostRequsetParams) => {
  const formData = createPostFormData(params)

  const response = await http.post<Pick<Posts, 'id'>>(
    POSTS_ENDPOINTS.POST_LIST,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  )
  return response.data
}

const editPost = async (id: number, params: WritePostRequsetParams) => {
  const formData = createPostFormData(params)

  await http.patch<0>(POSTS_ENDPOINTS.POST_LIST + `/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

const deletePost = async (id: number) => {
  const response = await http.delete(POSTS_ENDPOINTS.POST_LIST + `/${id}`)
  return response.data
}

export { getPostList, getCartegory, writePost, getPost, deletePost, editPost }
