'use Client'

import useCategoriesQuery from '@/hooks/queries/useCategoriesQuery'

export default function CategorySelectBox() {
  const { data } = useCategoriesQuery()

  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium text-gray-700">
        카테고리
      </label>

      <button
        type="button"
        className="flex w-full items-center justify-between rounded-xl border bg-white px-3 py-2 text-sm"
      >
        <span className="text-gray-400">카테고리를 선택하세요</span>
        <svg
          className="h-4 w-4 text-gray-500"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      <div className="absolute z-10 mt-2 w-full rounded-xl border bg-white shadow-lg">
        <ul className="max-h-48 overflow-y-auto py-1">
          {data &&
            Object.values(data).map((value) => (
              <li
                key={value}
                className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
              >
                {value}
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
