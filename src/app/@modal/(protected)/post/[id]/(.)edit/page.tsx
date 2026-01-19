'use client'

import WriteModal from '@/components/posts/WriteModal'
import usePostQuery from '@/hooks/queries/usePostQuery'
import { useParams, useRouter } from 'next/navigation'

export default function ModalEditPage() {
  const router = useRouter()
  const closeModal = () => {
    router.back()
  }
  const { id } = useParams<{ id: string }>()
  const { data } = usePostQuery(Number(id))
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      {/* Modal Container */}
      <WriteModal post={data} />
    </div>
  )
}
