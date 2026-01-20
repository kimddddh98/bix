'use Client'

import { CategoryKey } from '@/api/posts/posts'
import useCategoriesQuery from '@/hooks/queries/useCategoriesQuery'
import { useEffect, useRef, useState } from 'react'

type CategorySelectBoxProps = {
  categoryKey: CategoryKey | ''
  isError: boolean
  onChangeValue: (category: CategoryKey) => void
}

export default function CategorySelectBox({
  categoryKey,
  isError,
  onChangeValue,
}: CategorySelectBoxProps) {
  const { data } = useCategoriesQuery()
  const [categoryVisible, setCategoryVisible] = useState(false)
  const layerRef = useRef<HTMLDivElement>(null)

  const toggleVisible = () => {
    setCategoryVisible((prev) => !prev)
  }
  const handleValueClick = (key: CategoryKey) => {
    onChangeValue(key)
    setCategoryVisible(false)
  }

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (!layerRef.current?.contains(e.target as Node)) {
        setCategoryVisible(false)
      }
    }

    document.addEventListener('pointerdown', handleClick)
    return () => document.removeEventListener('pointerdown', handleClick)
  }, [])
  return (
    <div className="relative" ref={layerRef}>
      <button
        type="button"
        onClick={toggleVisible}
        className={`hover:border-primary flex w-full items-center justify-between rounded-md border px-3 py-2 text-sm ${isError ? 'border-red-500' : categoryVisible ? 'border-primary' : 'border-gray-200'}`}
      >
        <span className={`${categoryKey === '' ? 'text-gray-400' : ''}`}>
          {data && categoryKey ? data[categoryKey] : '카테고리를 선택해주세요'}
        </span>
        <svg
          className={`h-4 w-4 text-gray-500 ${categoryVisible && 'rotate-180'}`}
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
      {categoryVisible && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg">
          <ul className="max-h-48 overflow-y-auto py-2">
            {data &&
              (Object.entries(data) as [CategoryKey, string][]).map(
                ([key, value]) => (
                  <li
                    key={key}
                    onClick={() => handleValueClick(key)}
                    className="cursor-pointer px-3 py-2 text-sm transition-colors hover:bg-gray-100"
                  >
                    {value}
                  </li>
                )
              )}
          </ul>
        </div>
      )}
    </div>
  )
}
