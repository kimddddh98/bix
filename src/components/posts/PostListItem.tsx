import { Category, Posts } from '@/api/posts/posts'
import { postsKey } from '@/const/query-key/postsKey'
import { useQueryClient } from '@tanstack/react-query'

type PostListItemProps = {
  post: Posts
  categories: Category
}

const PostListItem = ({ post, categories }: PostListItemProps) => {
  return (
    <li className="rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm text-gray-500">
          {categories[post.category]}
        </span>
        <span className="text-xs text-gray-400">{post.createdAt}</span>
      </div>
      <h2 className="mb-1 text-base font-medium text-gray-900">{post.title}</h2>
    </li>
  )
}

export default PostListItem
