import { writePost } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useWritePostMutation = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: writePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKey.postList(),
      })
    },
  })
}
export default useWritePostMutation
