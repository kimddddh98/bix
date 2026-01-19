import { deletePost, Posts } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useDeletePostMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: (_, id) => {
      queryClient.setQueryData<InfiniteData<PagenationResponse<Posts[]>>>(
        postsKey.postList(),
        (olddata) => {
          if (!olddata) return olddata

          const updatedPages = olddata.pages.map((page) => {
            const filteredContent = page.content.filter(
              (post) => post.id !== id
            )

            return {
              ...page,
              content: filteredContent,
            }
          })

          return {
            ...olddata,
            pages: updatedPages,
          }
        }
      )
      router.replace('/')
    },
  })
}
export default useDeletePostMutation
