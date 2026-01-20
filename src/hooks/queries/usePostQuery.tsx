import { getPost, Post, Posts } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useAuthStore } from '@/store/auth/authStore'
import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query'

const usePostQuery = (id: number) => {
  const accessToken = useAuthStore((state) => state.accessToken)

  const queryClient = useQueryClient()
  return useQuery({
    queryFn: () => {
      return getPost(id)
    },
    queryKey: postsKey.post(id),
    enabled: !!id && !!accessToken,
    placeholderData: () => {
      const data = queryClient.getQueryData<
        InfiniteData<PagenationResponse<Posts[]>>
      >(postsKey.postList())
      const findData = data?.pages
        .flatMap((r) => r.content)
        .find((post) => post.id === id)
      if (findData) {
        const placeholderPost: Post = {
          id,
          title: findData.title,
          createdAt: findData.createdAt,
          content: '',
          boardCategory: findData.category,
          imageUrl: null,
        }
        return placeholderPost
      }
      return undefined
    },
  })
}

export default usePostQuery
