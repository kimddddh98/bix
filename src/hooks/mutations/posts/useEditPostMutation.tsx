import { editPost, WritePostRequsetParams } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useEditPostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (params: WritePostRequsetParams & { id: number }) => {
      const { id, ...p } = params
      return editPost(id, p)
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: postsKey.post(variables.id),
      })
    },
  })
}
export default useEditPostMutation
