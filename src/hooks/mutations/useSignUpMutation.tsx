import { signUp } from '@/api/auth/auth'
import { useMutation } from '@tanstack/react-query'

const useSignUpMutation = () => {
  return useMutation({
    mutationFn: signUp,
  })
}

export default useSignUpMutation
