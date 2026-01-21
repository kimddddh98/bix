'use client'
import { CategoryKey, Post, WritePostRequsetParams } from '@/api/posts/posts'
import { useForm, useWatch } from 'react-hook-form'
import CategorySelectBox from './CategorySelectBox'
import useWritePostMutation from '@/hooks/mutations/posts/useWritePostMutation'
import useEditPostMutation from '@/hooks/mutations/posts/useEditPostMutation'
import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import ModalHead from '../common/ModalHead'
import { useScrollLock } from '@/hooks/common/useScrollLock'
import { ROUTES } from '@/const/route.const'

type WriteModalProps = {
  post?: Post
}

const WriteModal = ({ post }: WriteModalProps) => {
  useScrollLock()
  const isEdit = !!post
  const router = useRouter()

  const { mutate: writeMutate, isPending: isWritePending } =
    useWritePostMutation()
  const { mutate: editMutate, isPending: isEditPending } = useEditPostMutation()
  const {
    setValue,
    control,
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
  } = useForm<WritePostRequsetParams>({
    defaultValues: {
      title: post?.title ?? '',
      content: post?.content ?? '',
      category: post?.boardCategory ?? '',
    },
  })
  const isDisable = useMemo(() => {
    return isWritePending || isEditPending || isSubmitting
  }, [isWritePending, isEditPending, isSubmitting])

  const category = useWatch({
    control,
    name: 'category',
  })

  const handleSelect = (category: CategoryKey) => {
    setValue('category', category, {
      shouldValidate: true,
      shouldDirty: true,
    })
  }
  const onSubmit = (value: WritePostRequsetParams) => {
    if (isEdit) {
      editMutate({ ...value, id: post.id })
    } else {
      writeMutate(value)
    }
  }

  const handleClose = () => {
    if (isEdit) {
      router.replace(ROUTES.POST(post.id))
    } else {
      router.back()
    }
  }
  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      />
      <div
        className="animate-slide-in fixed top-0 right-0 z-50 h-full w-full bg-white shadow-2xl md:w-2/3 lg:w-1/2 xl:w-2/5"
        onClick={(e) => e.stopPropagation()}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex h-full flex-col"
        >
          <ModalHead
            title={`글 ${isEdit ? '수정' : '작성'}`}
            onClose={handleClose}
          />
          <div className="flex flex-1 flex-col gap-4 px-4 py-4">
            {/* Title */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                제목
              </label>
              <input
                type="text"
                placeholder="제목을 입력해주세요"
                className={`w-full rounded-md border px-3 py-2 text-sm ${errors.title ? 'border-red-500' : 'focus:border-primary border-gray-200'}`}
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
                className={`w-full resize-none rounded-md border px-3 py-2 text-sm ${errors.content ? 'border-red-500' : 'focus:border-primary border-gray-200'}`}
              />
            </div>
          </div>
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isDisable}
                className="bg-primary hover:bg-primary-hover flex-1 rounded-lg px-4 py-2 font-medium text-white transition-colors"
              >
                {isEdit ? '수정' : '작성'}하기
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default WriteModal
