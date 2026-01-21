'use client'

import PostListItem from './PostListItem'
import useCategoriesQuery from '@/hooks/queries/useCategoriesQuery'
import usePostListQuery from '@/hooks/queries/usePostListQuery'
import Link from 'next/link'
import PostListSkeleton from './PostListSkeleton'
import { useObserver } from '@/hooks/common/useObserver'
import PostSkeleton from './PostSkeleton'
import { ROUTES } from '@/const/route.const'

const PostList = () => {
  const { data: categories } = useCategoriesQuery()
  const {
    data: posts,
    isPending,
    fetchNextPage,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = usePostListQuery()

  const { observerRef } = useObserver(() => {
    if (!isFetchingNextPage || !isFetching) {
      fetchNextPage()
    }
  }, hasNextPage)

  return (
    <div>
      {isPending ? (
        <PostListSkeleton />
      ) : posts && posts?.length > 0 ? (
        <ul className="flex flex-col gap-4">
          {categories &&
            posts.map((post) => (
              <PostListItem key={post.id} post={post} categories={categories} />
            ))}
        </ul>
      ) : (
        <div className="col-span-full flex min-h-75 items-center justify-center">
          <h3 className="text-lg font-medium text-gray-600">
            게시글이 존재하지 않습니다.
          </h3>
        </div>
      )}

      <Link
        href={ROUTES.WRITE_POST}
        className="bg-primary fixed right-6 bottom-6 z-30 flex h-14 w-14 items-center justify-center rounded-full text-3xl text-white shadow-lg"
      >
        +
      </Link>

      {isFetchingNextPage && (
        <div className="mt-4">
          <PostSkeleton />
        </div>
      )}

      <div ref={observerRef} />
    </div>
  )
}
export default PostList
