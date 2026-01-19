'use client'
import useDeletePostMutation from '@/hooks/mutations/posts/useDeletePostMutation'
import useCategoriesQuery from '@/hooks/queries/useCategoriesQuery'
import usePostQuery from '@/hooks/queries/usePostQuery'
import { useParams } from 'next/navigation'

const PostDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { data: category } = useCategoriesQuery()
  const { data } = usePostQuery(Number(id))
  const { mutate } = useDeletePostMutation()
  const handleDelete = () => {
    mutate(Number(id))
  }
  return (
    <main className="px-4 py-6">
      <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
        <span>{category && data && category[data?.boardCategory]}</span>
        <span>·</span>
        <span>2026.01.19</span>
      </div>

      <h2 className="mb-4 text-xl leading-snug font-semibold text-gray-900">
        {data?.title}
      </h2>

      <section className="prose prose-sm max-w-none text-gray-800">
        {data?.content}
      </section>

      <div className="my-8 h-px bg-gray-200" />

      <div className="flex justify-end gap-3">
        <button type="button" className="text-sm text-gray-500">
          수정
        </button>
        <button
          onClick={handleDelete}
          type="button"
          className="text-sm font-medium text-red-600"
        >
          삭제
        </button>
      </div>
    </main>
  )
}

export default PostDetail
