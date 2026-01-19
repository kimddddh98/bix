import { deletePost } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useDeletePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKey.postList(),
      })
    },
  })
}
export default useDeletePostMutation
