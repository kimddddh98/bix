import { getPostList } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useQuery } from '@tanstack/react-query'

const usePostListQuery = () => {
  return useQuery({
    queryFn: getPostList,
    queryKey: postsKey.postList(),
  })
}

export default usePostListQuery
