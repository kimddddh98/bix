import { Category, Posts } from '@/api/posts/posts'
import { ROUTES } from '@/const/route.const'
import { formatPostDate } from '@/utiles'
import Link from 'next/link'

type PostListItemProps = {
  post: Posts
  categories: Category
}

const PostListItem = ({ post, categories }: PostListItemProps) => {
  return (
    <div className="flex flex-col">
      <Link
        className="rounded-lg border border-gray-200 bg-white p-4 shadow-xs transition-shadow hover:shadow-sm"
        href={ROUTES.POST(post.id)}
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-gray-500">
            {categories[post.category]}
          </span>
          <span className="text-xs text-gray-400">
            {formatPostDate(post.createdAt)}
          </span>
        </div>
        <h2 className="mb-1 text-lg font-semibold text-gray-900">
          {post.title}
        </h2>
      </Link>
    </div>
  )
}

export default PostListItem
