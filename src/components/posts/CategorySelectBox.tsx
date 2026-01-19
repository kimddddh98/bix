'use Client'

import useCategoriesQuery from '@/hooks/queries/useCategoriesQuery'
import { useEffect, useRef, useState } from 'react'

type CategorySelectBoxProps = {
  value: string
  onChangeValue: (category: string) => void
}

export default function CategorySelectBox({
  value,
  onChangeValue,
}: CategorySelectBoxProps) {
  const { data } = useCategoriesQuery()
  const [categoryVisible, setCategoryVisible] = useState(false)
  const layerRef = useRef<HTMLDivElement>(null)

  const toggleVisible = () => {
    setCategoryVisible((prev) => !prev)
  }
  const handleValueClick = (value: string) => {
    onChangeValue(value)
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
        className="flex w-full items-center justify-between rounded-xl border bg-white px-3 py-2 text-sm"
      >
        <span className="text-gray-400">{value}</span>
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
      {categoryVisible && (
        <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-xl border bg-white shadow-lg">
          <ul className="max-h-48 overflow-y-auto py-2">
            {data &&
              Object.values(data).map((value) => (
                <li
                  key={value}
                  onClick={() => handleValueClick(value)}
                  className="cursor-pointer px-3 py-2 text-sm hover:bg-gray-100"
                >
                  {value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
