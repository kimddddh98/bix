import { Post, POSTS_ENDPOINTS } from '@/api/posts/posts'
import { serverGet } from '@/api/serverFetch'
import PostDetailModal from '@/components/posts/PostDetailModal'
import { postsKey } from '@/const/query-key/postsKey'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function PostDetailPage({ params }: PageProps) {
  const { id } = await params
  const queryClinet = new QueryClient()

  queryClinet.prefetchQuery({
    queryKey: postsKey.post(Number(id)),
    queryFn: async ({ queryKey }) => {
      const [, postId] = queryKey
      return serverGet<Post>(`${POSTS_ENDPOINTS.POST_LIST}/${postId}`)
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
      <PostDetailModal />
    </HydrationBoundary>
  )
}
