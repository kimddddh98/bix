export default function ModalWritePage() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      {/* Modal Container */}
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <header className="flex items-center justify-between border-b px-4 py-3">
          <button type="button" className="text-sm text-gray-500">
            취소
          </button>
          <h2 className="text-base font-semibold text-gray-900">글 작성</h2>
          <button type="button" className="text-sm font-medium text-black">
            등록
          </button>
        </header>

        {/* Content */}
        <div className="space-y-4 px-4 py-4">
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
    </div>
  )
}
