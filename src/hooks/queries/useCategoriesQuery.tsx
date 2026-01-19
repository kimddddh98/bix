import { getCartegory } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useQuery } from '@tanstack/react-query'

const useCategoriesQuery = () => {
  return useQuery({
    queryFn: getCartegory,
    queryKey: postsKey.categories(),
  })
}

export default useCategoriesQuery
