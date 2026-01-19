'use client'

import WriteModal from '@/components/posts/WriteModal'
import { useRouter } from 'next/navigation'

export default function ModalWritePage() {
  const router = useRouter()
  const closeModal = () => {
    router.back()
  }
  return (
    <div
      onClick={closeModal}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
    >
      {/* Modal Container */}
      <WriteModal />
    </div>
  )
}
