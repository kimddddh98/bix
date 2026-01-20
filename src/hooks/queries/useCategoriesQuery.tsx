import { getCartegory } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useAuthStore } from '@/store/auth/authStore'
import { useQuery } from '@tanstack/react-query'

const useCategoriesQuery = () => {
  const accessToken = useAuthStore((state) => state.accessToken)

  return useQuery({
    queryFn: getCartegory,
    queryKey: postsKey.categories(),
    enabled: !!accessToken,
  })
}

export default useCategoriesQuery
