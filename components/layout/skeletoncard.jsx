import { Skeleton } from "@/components/ui/skeleton";

export default function SeketonCard() {
  return (
    <section className=" w-[100%] grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 px-1">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-lg border shadow-sm overflow-hidden"
        >
          <Skeleton className="h-60 w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-6 w-16" />
          </div>
        </div>
      ))}
    </section>
  );
}
