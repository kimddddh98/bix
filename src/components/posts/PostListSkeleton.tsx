import PostSkeleton from './PostSkeleton'

export default function PostListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 10 }).map((_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  )
}
