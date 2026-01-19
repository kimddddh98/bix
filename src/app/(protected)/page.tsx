import { getCartegory } from '@/api/posts/posts'
import PostList from '@/components/posts/PostList'
import { postsKey } from '@/const/query-key/postsKey'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

export default function Page() {
  const queryClient = new QueryClient()
  queryClient.prefetchQuery({
    queryFn: getCartegory,
    queryKey: postsKey.categories(),
  })

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
      {/* Post List */}
      <HydrationBoundary state={dehydrate(queryClient)}>
        <PostList />
      </HydrationBoundary>
    </div>
  )
}
