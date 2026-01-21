// app/(auth)/signup/page.tsx
'use client'

import { useForm, useWatch } from 'react-hook-form'
import Link from 'next/link'
import { SignUpRequestParams } from '@/api/auth/auth'
import useAuth from '@/hooks/auth/useAuth'
import { ROUTES } from '@/const/route.const'

export default function SignupPage() {
  const { onSubmitSignUp, isSignUpPending } = useAuth()
  const {
    register,
    handleSubmit,
    control,
    setFocus,
    formState: { errors, isSubmitting },
  } = useForm<SignUpRequestParams>({
    mode: 'onSubmit',
  })

  const password = useWatch({
    control,
    name: 'password',
  })

  const onSubmit = (value: SignUpRequestParams) => {
    onSubmitSignUp(value)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow">
        <h1 className="mb-6 text-center text-2xl font-semibold">로그인</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">이름</label>
            <input
              placeholder="이름을 입력해주세요"
              type="text"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  setFocus('username')
                }
              }}
              className={`rounded-md border px-3 py-2 text-sm ${errors.name ? 'border-red-500' : 'focus:border-primary border-gray-400'}`}
              {...register('name', {
                required: '이름을 입력해주세요',
              })}
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

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

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-800">
              비밀번호 확인
            </label>
            <input
              placeholder="비밀번호를 입력해주세요"
              type="password"
              className={`rounded-md border px-3 py-2 text-sm ${errors.password ? 'border-red-500' : 'focus:border-primary border-gray-400'}`}
              {...register('confirmPassword', {
                required: '입력한 비밀번호를 확인해주세요',
                validate: (value) =>
                  value === password || '비밀번호가 일치하지 않습니다',
              })}
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-xs text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isSignUpPending}
            className="bg-primary enabled:hover:bg-primary-hover w-full rounded-lg py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            회원가입
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          이미 계정이 있으신가요?{' '}
          <Link
            href={ROUTES.SIGN_IN}
            className="text-primary font-medium hover:underline"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  )
}
