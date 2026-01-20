import { getPostList } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useAuthStore } from '@/store/auth/authStore'
import { useInfiniteQuery } from '@tanstack/react-query'

const usePostListQuery = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useInfiniteQuery({
    queryFn: getPostList,
    queryKey: postsKey.postList(),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined
      return lastPage.number + 1
    },
    select: (data) => data.pages.flatMap((r) => r.content),
    enabled: !!accessToken,
  })
}

export default usePostListQuery
