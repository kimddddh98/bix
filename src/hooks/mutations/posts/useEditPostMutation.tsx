import {
  CategoryKey,
  editPost,
  Post,
  Posts,
  WritePostRequsetParams,
} from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useEditPostMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: WritePostRequsetParams & { id: number }) => {
      const { id, ...p } = params
      return editPost(id, p)
    },
    onSuccess: async (data, variables) => {
      router.back()

      await queryClient.invalidateQueries({
        queryKey: postsKey.post(variables.id),
      })

      const post = queryClient.getQueryData<Post>(postsKey.post(variables.id))
      if (post && variables.category) {
        queryClient.setQueryData<InfiniteData<PagenationResponse<Posts[]>>>(
          postsKey.postList(),
          (olddata) => {
            if (!olddata) return olddata

            const updatedPages = olddata.pages.map((page) => {
              const updatedContent = page.content.map((post) => {
                if (post.id === variables.id) {
                  return {
                    ...post,
                    title: variables.title,
                    category: variables.category as CategoryKey,
                  }
                }
                return post
              })

              return {
                ...page,
                content: updatedContent,
              }
            })
            return {
              ...olddata,
              pages: updatedPages,
            }
          }
        )
      }
    },
  })
}
export default useEditPostMutation
