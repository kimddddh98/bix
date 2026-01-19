'use client'

import PostListItem from './PostListItem'
import useCategoriesQuery from '@/hooks/queries/useCategoriesQuery'
import usePostListQuery from '@/hooks/queries/usePostListQuery'
import Link from 'next/link'

const PostList = () => {
  const { data: categories } = useCategoriesQuery()
  const { data } = usePostListQuery()
  const posts = data?.content
  return (
    <div>
      {posts && (
        <ul className="flex flex-col gap-4">
          {categories &&
            posts.map((post) => (
              <PostListItem key={post.id} post={post} categories={categories} />
            ))}
        </ul>
      )}

      <div className="col-span-full flex min-h-75 items-center justify-center">
        <h3 className="text-lg font-medium text-gray-600">
          게시글이 존재하지 않습니다.
        </h3>
      </div>

      <Link
        href={'/write'}
        className="bg-primary fixed right-6 bottom-6 flex h-14 w-14 items-center justify-center rounded-full text-3xl text-white shadow-lg"
      >
        +
      </Link>
    </div>
  )
}
export default PostList
