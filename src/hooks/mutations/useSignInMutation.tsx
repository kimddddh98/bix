import { signInApi } from '@/api/auth/auth'
import { useMutation } from '@tanstack/react-query'

const useSignInMutation = () => {
  return useMutation({
    mutationFn: signInApi,
  })
}

export default useSignInMutation
