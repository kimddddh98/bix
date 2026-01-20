import {
  logout,
  rotateTokenApi,
  SignInRequestParams,
  SignUpRequestParams,
} from '@/api/auth/auth'
import useSignInMutation from '../mutations/useSignInMutation'
import { useRouter } from 'next/navigation'
import { useAuthActions } from '@/store/auth/authStore'
import useSignUpMutation from '../mutations/useSignUpMutation'
import { useQueryClient } from '@tanstack/react-query'

const useAuth = () => {
  const { setAccessToken, logout: authStoreLogout } = useAuthActions()
  const router = useRouter()
  const signInMutation = useSignInMutation()
  const signUpMutation = useSignUpMutation()
  const queryClient = useQueryClient()

  const onSubmitLogin = async (value: SignInRequestParams) => {
    signInMutation.mutate(value, {
      onSuccess(data) {
        router.replace('/')
        setAccessToken(data.accessToken)
      },
    })
  }

  const onSubmitSignUp = async (value: SignUpRequestParams) => {
    signUpMutation.mutate(value, {
      onSuccess(data, variables) {
        onSubmitLogin(variables)
      },
      onError(error: any) {
        if (error?.response?.data) {
          if (error.response.data.username) {
            alert(error.response.data.username.join('/n'))
          }
        } else {
          alert('회원가입에 실패했습니다. 입력된 값을 다시 확인해주세요.')
        }
      },
    })
  }

  const getRotateToken = async () => {
    const data = await rotateTokenApi()
    setAccessToken(data.accessToken)
  }

  const onLogout = async () => {
    await logout()
    authStoreLogout()
    queryClient.clear()
    router.replace('/')
  }

  return {
    onSubmitLogin,
    onSubmitSignUp,
    getRotateToken,
    onLogout,
    isSignUpPending: signUpMutation.isPending,
    isSignInPending: signInMutation.isPending,
  }
}

export default useAuth
