'use client'
import { WritePostRequsetParams } from '@/api/posts/posts'
import { useForm } from 'react-hook-form'
import CategorySelectBox from './CategorySelectBox'
import { useState } from 'react'

const WriteModal = () => {
  const { setValue, watch } = useForm<WritePostRequsetParams>({
    defaultValues: {
      title: '',
      content: '',
      category: '',
    },
  })
  const category = watch('category')
  const [categoryVisible, setCategoryVisible] = useState(false)
  const handleSelect = (category: string) => {
    setValue('category', category, {
      shouldValidate: true,
      shouldDirty: true,
    })
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

      <div className="flex flex-col gap-4 px-4 py-4">
        {/* Title */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            제목
          </label>
          <input
            type="text"
            placeholder="제목을 입력하세요"
            className="w-full rounded-xl border px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none"
          />
        </div>

        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            카테고리
          </label>
          <CategorySelectBox value={category} onChangeValue={handleSelect} />
        </div>

        {/* Body */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            내용
          </label>
          <textarea
            rows={6}
            placeholder="내용을 입력하세요"
            className="w-full resize-none rounded-xl border px-3 py-2 text-sm focus:ring-1 focus:ring-black focus:outline-none"
          />
        </div>
      </div>
    </div>
  )
}

export default WriteModal
