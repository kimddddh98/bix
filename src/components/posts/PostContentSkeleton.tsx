const PostContentSkeleton = () => {
  return (
    <div className="flex animate-pulse flex-col gap-2 shadow-xs">
      <div className="h-5 w-1/2 rounded bg-gray-200" />
      <div className="h-5 w-10/12 rounded bg-gray-200" />
      <div className="h-5 bg-gray-200" />
    </div>
  )
}
export default PostContentSkeleton
