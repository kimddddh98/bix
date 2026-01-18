import { SignInRequestParams, SignUpRequestParams } from '@/api/auth/auth'
import useSignInMutation from '../mutations/useSignInMutation'
import { useRouter } from 'next/navigation'
import { useAuthActions } from '@/store/auth/authStore'
import useSignUpMutation from '../mutations/useSignUpMutation'

const useAuth = () => {
  const { setAccessToken } = useAuthActions()
  const router = useRouter()
  const signInMutation = useSignInMutation()
  const signUpMutation = useSignUpMutation()

  const onSubmitLogin = async (value: SignInRequestParams) => {
    signInMutation.mutate(value, {
      onSuccess(data) {
        router.push('/')
        setAccessToken(data.accessToken)
      },
    })
  }

  const onSubmitSignUp = async (value: SignUpRequestParams) => {
    signUpMutation.mutate(value, {
      onSuccess(data, variables) {
        onSubmitLogin(variables)
      },
    })
  }

  return {
    onSubmitLogin,
    onSubmitSignUp,
  }
}

export default useAuth
