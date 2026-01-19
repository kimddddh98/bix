import http from '../axios'

export const POSTS_ENDPOINTS = {
  POST_LIST: '/boards',
  CATEGORY: '/boards/categories',
} as const

export interface Posts {
  id: number
  title: string
  category: string
  createdAt: string
}

export interface Post extends Omit<Posts, 'category'> {
  content: string
  boardCategory: string
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

const getPostList = async () => {
  const response = await http.get<BaseResponse<Posts[]>>(
    POSTS_ENDPOINTS.POST_LIST
  )
  return response.data
}

const getCartegory = async () => {
  const response = await http.get<Category>(POSTS_ENDPOINTS.CATEGORY)
  return response.data
}

const writePost = async (params: WritePostRequsetParams) => {
  const formData = new FormData()

  formData.append(
    'request',
    new Blob([JSON.stringify(params)], {
      type: 'application/json',
    })
  )

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

export { getPostList, getCartegory, writePost }
