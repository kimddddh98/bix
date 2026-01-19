import {
  CategoryKey,
  editPost,
  Post,
  Posts,
  WritePostRequsetParams,
} from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
        queryClient.setQueryData<BaseResponse<Posts[]>>(
          postsKey.postList(),
          (olddata) => {
            if (olddata) {
              const posts = olddata?.content
              if (posts) {
                const updatedPosts = posts.map((r) => {
                  if (r.id === variables.id) {
                    return {
                      ...r,
                      title: variables.title,
                      category: variables.category as CategoryKey,
                    }
                  }
                  return r
                })
                return { content: updatedPosts }
              }
            }
          }
        )
      }
    },
  })
}
export default useEditPostMutation
