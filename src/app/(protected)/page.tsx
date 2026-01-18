'use client'

import { getPostList } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

export default function Page() {
  // console.log(data)
  const {} = useQuery({
    queryKey: postsKey.postList(),
    queryFn: getPostList,
  })
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8">
      {/* Post List */}
      <Link className="card" href={`/write`} passHref>
        aaa
      </Link>
      <ul className="flex flex-col gap-4">
        <li className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">작성자</span>
            <span className="text-xs text-gray-400">2026.01.19</span>
          </div>
          <h2 className="mb-1 text-base font-medium text-gray-900">
            게시글 제목입니다
          </h2>
          <p className="line-clamp-2 text-sm text-gray-600">
            게시글 내용 미리보기 영역입니다. 두 줄 정도까지 노출됩니다.
          </p>
        </li>

        <li className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-gray-500">작성자</span>
            <span className="text-xs text-gray-400">2026.01.18</span>
          </div>
          <h2 className="mb-1 text-base font-medium text-gray-900">
            두 번째 게시글 제목
          </h2>
          <p className="line-clamp-2 text-sm text-gray-600">
            게시글 내용 미리보기 영역입니다. 실제 데이터 연동 전 더미
            텍스트입니다.
          </p>
        </li>
      </ul>
      <div className="col-span-full flex min-h-75 items-center justify-center">
        <h3 className="text-lg font-medium text-gray-600">
          게시글이 존재하지 않습니다.
        </h3>
      </div>

      {/* Floating Action Button */}
      <button
        type="button"
        className="bg-primary fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full text-3xl text-white shadow-lg"
      >
        +
      </button>
    </div>
  )
}
