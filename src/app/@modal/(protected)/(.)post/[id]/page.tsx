import { getPost } from '@/api/posts/posts'
import PostDetail from '@/components/posts/PostDetail'
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
    queryFn: ({ queryKey }) => {
      const [_, postId] = queryKey
      return getPost(postId)
    },
  })

  return (
    <HydrationBoundary state={dehydrate(queryClinet)}>
      <PostDetailModal />
    </HydrationBoundary>
  )
}
