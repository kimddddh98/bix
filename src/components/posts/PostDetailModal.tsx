'use client'

import useDeletePostMutation from '@/hooks/mutations/posts/useDeletePostMutation'
import useCategoriesQuery from '@/hooks/queries/useCategoriesQuery'
import usePostQuery from '@/hooks/queries/usePostQuery'
import { formatPostDate } from '@/utiles'
import { useParams, useRouter } from 'next/navigation'
import ModalHead from '../common/ModalHead'
import PostListSkeleton from './PostListSkeleton'
import PostContentSkeleton from './PostContentSkeleton'
export default function PostDetailModal() {
  const { id } = useParams<{ id: string }>()
  const { data: category } = useCategoriesQuery()
  const { data: post, isFetching: isPostFetching } = usePostQuery(Number(id))
  const { mutate, isPending } = useDeletePostMutation()
  const router = useRouter()
  const handleDelete = () => {
    const value = confirm('글을 삭제하시겠습니까?')
    if (value) {
      mutate(Number(id))
    }
  }
  const handleClose = () => {
    router.back()
  }

  return (
    <>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      />

      <div className="animate-slide-in fixed top-0 right-0 z-50 h-full w-full bg-white shadow-2xl md:w-2/3 lg:w-1/2 xl:w-2/5">
        <div className="flex h-full flex-col">
          <ModalHead
            onClose={handleClose}
            title={(category && post && category[post.boardCategory]) ?? ''}
          />
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900">{post?.title}</h3>
              <span className="text-sm text-gray-400">
                {post && formatPostDate(post.createdAt)}
              </span>
            </div>

            <div className="flex items-center gap-4 border-b border-gray-200 pb-6 text-sm text-gray-600"></div>

            <div className="max-w-none py-4">
              <p className="leading-relaxed text-gray-700">
                {isPostFetching ? <PostContentSkeleton /> : post?.content}
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4">
            <div className="flex gap-3">
              <button
                disabled={isPending}
                onClick={handleDelete}
                className="flex-1 rounded-lg border border-red-500 bg-white px-4 py-2 font-medium text-red-600 transition-colors hover:bg-red-500 hover:text-white"
              >
                삭제
              </button>
              <button
                onClick={() => {
                  router.push(`/post/${id}/edit`)
                }}
                className="bg-primary hover:bg-primary-hover flex-1 rounded-lg px-4 py-2 font-medium text-white transition-colors"
              >
                수정하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
