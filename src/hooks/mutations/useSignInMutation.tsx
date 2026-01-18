import { signInApi } from '@/api/auth/auth'
import { useAuthActions } from '@/store/auth/authStore'
import { useMutation } from '@tanstack/react-query'

const useSignInMutation = () => {
  const { setAccessToken } = useAuthActions()
  return useMutation({
    mutationFn: signInApi,
    onSuccess(data) {
      setAccessToken(data.accessToken)
    },
  })
}

export default useSignInMutation
