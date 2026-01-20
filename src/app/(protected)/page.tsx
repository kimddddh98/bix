import { Category, Posts, POSTS_ENDPOINTS } from '@/api/posts/posts'
import { serverGet } from '@/api/serverFetch'
import PostList from '@/components/posts/PostList'
import { postsKey } from '@/const/query-key/postsKey'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default async function Page() {
  const queryClient = new QueryClient()

  queryClient.prefetchQuery({
    queryFn: async () => serverGet<Category>(POSTS_ENDPOINTS.CATEGORY),
    queryKey: postsKey.categories(),
  })

  queryClient.prefetchInfiniteQuery({
    queryKey: postsKey.postList(),
    queryFn: async ({ pageParam = 0 }) => {
      const res = await serverGet<PagenationResponse<Posts>>(
        `${POSTS_ENDPOINTS.POST_LIST}?page=${pageParam}&size=20`
      )
      return res
    },
    initialPageParam: 0,
  })

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostList />
      </HydrationBoundary>
    </div>
  )
}
