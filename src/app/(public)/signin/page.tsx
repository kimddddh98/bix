'use client'

import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { SignInRequestParams } from '@/api/auth/auth'
import useAuth from '@/hooks/auth/useAuth'

export default function SignIn() {
  const { onSubmitLogin, isSignInPending } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInRequestParams>({
    mode: 'onSubmit',
  })

  const onSubmit = async (value: SignInRequestParams) => {
    onSubmitLogin(value)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-semibold">로그인</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">이메일</label>
            <div>
              <input
                type="email"
                placeholder="이메일을 입력해주세요"
                className={`w-full rounded-md border px-3 py-2 text-sm ${errors.username ? 'border-red-500' : 'focus:border-primary border-gray-400'}`}
                {...register('username', {
                  required: '이메일을 입력해주세요.',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: '올바른 이메일 형식이 아닙니다',
                  },
                })}
              />
              {errors.username && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">
              비밀번호
            </label>
            <input
              placeholder="비밀번호를 입력해주세요"
              type="password"
              className={`rounded-md border px-3 py-2 text-sm ${errors.password ? 'border-red-500' : 'focus:border-primary border-gray-400'}`}
              {...register('password', {
                required: '비밀번호를 입력해주세요',
                minLength: {
                  value: 8,
                  message: '비밀번호는 최소 8자 이상이어야 합니다',
                },
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/,
                  message:
                    '비밀번호는 영문자, 숫자, 특수문자(!%*#?&)를 각각 1개 이상 포함해야 합니다',
                },
              })}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSignInPending}
            className="bg-primary enabled:hover:bg-primary-hover w-full rounded-lg py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            로그인
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          아직 계정이 없으신가요?{' '}
          <Link
            href="/signup"
            className="text-primary font-medium hover:underline"
          >
            회원가입
          </Link>
        </div>
      </div>
    </div>
  )
}
