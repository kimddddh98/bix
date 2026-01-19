import { getPostList } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useInfiniteQuery, useQuery } from '@tanstack/react-query'

const usePostListQuery = () => {
  return useInfiniteQuery({
    queryFn: getPostList,
    queryKey: postsKey.postList(),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      if (lastPage.last) return undefined
      return lastPage.number + 1
    },
    select: (data) => data.pages.flatMap((r) => r.content),
  })
}

export default usePostListQuery
