import { writePost, Posts, CategoryKey } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useWritePostMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: writePost,
    onSuccess: (data, variables) => {
      const { id } = data
      if (variables.category) {
        const newPost: Posts = {
          id,
          title: variables.title,
          category: variables.category as CategoryKey,
          createdAt: new Date().toISOString(),
        }

        queryClient.setQueryData<InfiniteData<PagenationResponse<Posts[]>>>(
          postsKey.postList(),
          (olddata) => {
            if (!olddata || olddata.pages.length === 0) return olddata

            const lastPageIndex = olddata.pages.length - 1
            const lastPage = olddata.pages[lastPageIndex]

            const updatedPages = [...olddata.pages]
            updatedPages[lastPageIndex] = {
              ...lastPage,
              content: [...lastPage.content, newPost],
            }

            return {
              ...olddata,
              pages: updatedPages,
            }
          }
        )
      }
      router.back()
    },
  })
}
export default useWritePostMutation
