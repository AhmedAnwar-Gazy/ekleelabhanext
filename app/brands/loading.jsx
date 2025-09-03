// app/perfumes/loading.tsx
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="pt-10 pr-5 flex gap-6">
      {/* Sidebar Skeleton */}
      <div className="w-[280px] h-[700px] p-6 border rounded-xl bg-white shadow-sm flex-shrink-0">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-8 w-20" />
        </div>

        {/* Active Filters Skeleton */}
        <div className="mb-6">
          <Skeleton className="h-4 w-24 mb-3" />
          <div className="space-y-2">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
        </div>

        {/* Accordion Skeleton */}
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="border rounded-lg">
              <div className="p-4 border-b">
                <Skeleton className="h-4 w-20" />
              </div>
              {i === 1 && (
                <div className="p-4 space-y-3">
                  <Skeleton className="h-10 w-full" />
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="flex items-center space-x-3">
                      <Skeleton className="h-4 w-4 rounded" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1">
        {/* Header Skeleton */}
        <div className="w-full max-w-[100%] mx-auto mb-6">
          <div className="flex justify-between items-center p-4 rounded-lg">
            <div className="text-right pr-4">
              <Skeleton className="h-6 w-16 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="text-left">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>
        </div>

        {/* Products Grid Skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-1">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg border shadow-sm overflow-hidden"
            >
              <Skeleton className="h-48 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-6 w-16" />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
