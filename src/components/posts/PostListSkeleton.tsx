export default function PostListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-2xl bg-white p-4 shadow-sm"
        >
          {/* Top row */}
          <div className="mb-3 flex items-center justify-between">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-3 w-16 rounded bg-gray-200" />
          </div>

          {/* Title */}
          <div className="h-5 w-3/4 rounded bg-gray-200" />
        </div>
      ))}
    </div>
  )
}
