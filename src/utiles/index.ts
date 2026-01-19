import { WritePostRequsetParams } from '@/api/posts/posts'
import dayjs from 'dayjs'

const createPostFormData = (params: WritePostRequsetParams): FormData => {
  const formData = new FormData()
  formData.append(
    'request',
    new Blob([JSON.stringify(params)], {
      type: 'application/json',
    })
  )
  return formData
}

const formatPostDate = (dateString: string) => {
  const date = dayjs(dateString)
  const now = dayjs()

  if (date.isSame(now, 'day')) {
    return date.format('HH:mm')
  }

  return date.format('YYYY-MM-DD HH:mm')
}
export { formatPostDate, createPostFormData }
