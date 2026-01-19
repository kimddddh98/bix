import { getPost } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useQuery } from '@tanstack/react-query'

const usePostQuery = (id: number) => {
  return useQuery({
    queryFn: ({ queryKey }) => {
      const [_, postId] = queryKey
      return getPost(postId)
    },
    queryKey: postsKey.post(id),
    enabled: !!id,
  })
}

export default usePostQuery
