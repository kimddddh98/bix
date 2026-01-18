import { signUp } from '@/api/auth/auth'
import { useMutation } from '@tanstack/react-query'
import useSignInMutation from './useSignInMutation'

const useSignUpMutation = () => {
  const signInMutation = useSignInMutation()
  return useMutation({
    mutationFn: signUp,
    onSuccess(data, variables) {
      signInMutation.mutate(variables)
    },
  })
}

export default useSignUpMutation
