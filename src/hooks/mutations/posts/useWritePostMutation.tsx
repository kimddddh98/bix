import { writePost } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const useWritePostMutation = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: writePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: postsKey.postList(),
      })
      router.back()
    },
  })
}
export default useWritePostMutation
