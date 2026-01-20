import { signInApi } from '@/api/auth/auth'
import { useMutation } from '@tanstack/react-query'

const useSignInMutation = () => {
  return useMutation({
    mutationFn: signInApi,
    onError(error: any) {
      if (error.response?.data?.message) {
        alert(error.response?.data?.message)
      } else {
        alert('아이디와 비밀번호를 다시 확인해주세요.')
      }
    },
  })
}

export default useSignInMutation
