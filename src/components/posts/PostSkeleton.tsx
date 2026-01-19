const PostSkeleton = () => {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="h-4 w-20 rounded bg-gray-200" />
        <div className="h-3 w-16 rounded bg-gray-200" />
      </div>

      <div className="h-5 w-3/4 rounded bg-gray-200" />
    </div>
  )
}

export default PostSkeleton
