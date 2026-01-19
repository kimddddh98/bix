import { getPost } from '@/api/posts/posts'
import PostDetail from '@/components/posts/PostDetail'
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
    <div className="min-h-screen bg-white">
      <HydrationBoundary state={dehydrate(queryClinet)}>
        <PostDetail />
      </HydrationBoundary>
    </div>
  )
}
