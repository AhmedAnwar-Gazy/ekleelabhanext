// components/search/SearchSkeleton.js
export default function SearchSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
        <div className="h-10 w-48 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="w-60 relative overflow-hidden rounded-xl p-3">
            <div className="border rounded-xl p-3 space-y-3">
              {/* Image skeleton */}
              <div className="h-44 w-full bg-gray-200 rounded animate-pulse" />
              
              {/* Rating skeleton */}
              <div className="flex items-center gap-1">
                <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
              
              {/* Brand skeleton */}
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
              
              {/* Name skeleton */}
              <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
              
              {/* Price skeleton */}
              <div className="flex justify-between items-center">
                <div className="h-6 w-20 bg-gray-200 rounded animate-pulse" />
                <div className="h-10 w-10 bg-gray-200 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}