import Image from 'next/image'

type ModalHeadProps = {
  onClose: () => void
  title: string
}

const ModalHead = ({ title, onClose }: ModalHeadProps) => {
  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6">
      <span className="text-lg font-medium text-gray-700">{title}</span>
      <button onClick={onClose} className="p-2">
        <Image src="/close.svg" alt="close-icon" width={20} height={20} />
      </button>
    </div>
  )
}

export default ModalHead
