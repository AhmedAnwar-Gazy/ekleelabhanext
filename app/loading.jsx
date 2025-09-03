// src/app/loading.jsx
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Loading() {
  return (
    // <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
    //   {/* Skeleton Navbar */}
    //   <nav className="w-full flex justify-between items-center py-4 px-6 mb-8 border-b dark:border-gray-800">
    //     <div className="flex items-center space-x-4">
    //       <Skeleton className="h-8 w-24 rounded-lg" />
    //       <Skeleton className="h-8 w-8 rounded-full" />
    //     </div>
    //     <div className="flex items-center space-x-2">
    //       <Skeleton className="h-8 w-24" />
    //       <Skeleton className="h-8 w-24" />
    //     </div>
    //   </nav>

    //   <div className="container mx-auto max-w-7xl">
    //     {/* Skeleton Header */}
    //     <div className="flex items-center justify-between mb-8">
    //       <Skeleton className="h-10 w-64" />
    //       <Skeleton className="h-10 w-24" />
    //     </div>

    //     {/* Skeleton Cards Section */}
    //     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
    //       {Array.from({ length: 3 }).map((_, index) => (
    //         <Card key={index} className="shadow-lg dark:bg-gray-800">
    //           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    //             <CardTitle className="text-sm font-medium">
    //               <Skeleton className="h-4 w-24" />
    //             </CardTitle>
    //             <Skeleton className="h-5 w-5 rounded-full" />
    //           </CardHeader>
    //           <CardContent>
    //             <Skeleton className="h-8 w-32 mb-2" />
    //             <Skeleton className="h-4 w-full" />
    //           </CardContent>
    //         </Card>
    //       ))}
    //     </div>

    //     {/* Skeleton List Section */}
    //     <div className="space-y-4">
    //       <Skeleton className="h-8 w-48 mb-4" />
    //       {Array.from({ length: 5 }).map((_, index) => (
    //         <div key={index} className="flex items-center space-x-4 p-4 rounded-lg bg-white dark:bg-gray-800 shadow">
    //           <Skeleton className="h-12 w-12 rounded-full" />
    //           <div className="space-y-2 flex-1">
    //             <Skeleton className="h-4 w-3/4" />
    //             <Skeleton className="h-4 w-1/2" />
    //           </div>
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // </div>
    <div className="w-full" dir="rtl">
      {/* Skeleton for HeroBar */}
      <div className="h-[450px] m-2 rounded overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Skeleton for Hero Section */}
      <section className="text-center mb-10 pt-10">
        <Skeleton className="h-10 w-1/3 mx-auto mb-4" />
        <Skeleton className="h-5 w-1/4 mx-auto" />
      </section>

      {/* Skeleton for Carousel */}
      <div className="w-full max-w-8xl mx-auto mb-10">
        <div className="flex justify-end mb-4">
          <Skeleton className="h-10 w-10 rounded-full mr-2" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-w-[200px]">
              <div className="space-y-3">
                <Skeleton className="h-[250px] w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-10 w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skeleton for Offers */}
      <div className="space-y-6">
        {Array.from({ length: 2 }).map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full rounded-lg" />
        ))}

        <div className="flex gap-4">
          <Skeleton className="h-[200px] w-1/2 rounded-lg" />
          <Skeleton className="h-[200px] w-1/2 rounded-lg" />
        </div>

        {/* Skeleton for MinCard */}
        <Skeleton className="h-[150px] w-full rounded-lg" />

        <div className="flex gap-4">
          <Skeleton className="h-[200px] w-1/2 rounded-lg" />
          <Skeleton className="h-[200px] w-1/2 rounded-lg" />
        </div>

        <div className="flex gap-4">
          <Skeleton className="h-[200px] w-1/3 rounded-lg" />
          <Skeleton className="h-[200px] w-1/3 rounded-lg" />
          <Skeleton className="h-[200px] w-1/3 rounded-lg" />
        </div>

        <Skeleton className="h-[200px] w-full rounded-lg" />
        <Skeleton className="h-[200px] w-full rounded-lg" />
      </div>
    </div>
  );
}
