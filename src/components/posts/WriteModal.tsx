'use client'
import { CategoryKey, WritePostRequsetParams } from '@/api/posts/posts'
import { useForm } from 'react-hook-form'
import CategorySelectBox from './CategorySelectBox'
import useWritePostMutation from '@/hooks/mutations/posts/useWritePostMutation'

const WriteModal = () => {
  const { mutate } = useWritePostMutation()
  const {
    setValue,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WritePostRequsetParams>({
    defaultValues: {
      title: '',
      content: '',
      category: '',
    },
  })
  const category = watch('category')

  const handleSelect = (category: CategoryKey) => {
    setValue('category', category, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
  const onSubmit = (value: WritePostRequsetParams) => {
    console.log('폼 전송', value)
    mutate(value)
  }

  return (
    <div
      className="w-full max-w-md rounded-2xl bg-white shadow-xl"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <header className="flex items-center justify-between border-b border-b-gray-400 px-4 py-3">
        <button type="button" className="text-sm text-gray-500">
          취소
        </button>
        <h2 className="text-base font-semibold text-gray-900">글 작성</h2>
        <button type="button" className="text-sm font-medium text-black">
          등록
        </button>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 px-4 py-4"
      >
        {/* Title */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            placeholder="제목을 입력해주세요"
            className={`focus:border-primary w-full rounded-md border px-3 py-2 text-sm ${errors.title ? 'border-red-500' : 'border-gray-400'}`}
            {...register('title', {
              required: '제목을 입력해주세요',
            })}
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            카테고리
          </label>
          <input
            type="hidden"
            {...register('category', {
              required: '카테고리를 선택해주세요',
            })}
          />
          <CategorySelectBox
            categoryKey={category}
            isError={!!errors.category}
            onChangeValue={handleSelect}
          />
        </div>

        {/* Body */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <textarea
            rows={6}
            placeholder="내용을 입력하세요"
            {...register('content', {
              required: '내용을 입력해주세요',
            })}
            className={`focus:border-primary w-full rounded-md border px-3 py-2 text-sm ${errors.title ? 'border-red-500' : 'border-gray-400'}`}
          />
        </div>

        <button>전송</button>
      </form>
    </div>
  )
}

export default WriteModal
