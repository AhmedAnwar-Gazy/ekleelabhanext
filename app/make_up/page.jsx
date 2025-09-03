// "use client";

// import { useState, useMemo, useEffect } from "react";
// import React from "react";
// import { CATEGORIES, products } from "@/data/products";
// import ProductCard from "@/components/ProductCard";
// import PopularityDropdown from "@/components/layout/PopularityDropdown";
// import SwitcherPages from "@/components/layout/SwitcherPages";
// import FilterSidebar from "@/components/layout/FilterSidebar";
// import { Hero } from "@/components/ui/hero";
// import { Herobar } from "@/components/layout/Herobar";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";

// // Product Card Skeleton Component
// const ProductCardSkeleton = () => (
//   <div className="bg-white rounded-lg border shadow-sm overflow-hidden w-[250px]">
//     <Skeleton className="h-48 w-full" />
//     <div className="p-4 space-y-3">
//       <Skeleton className="h-4 w-3/4" />
//       <Skeleton className="h-3 w-1/2" />
//       <div className="flex justify-between items-center">
//         <Skeleton className="h-6 w-16" />
//         <Skeleton className="h-8 w-8 rounded" />
//       </div>
//     </div>
//   </div>
// );

// // Filter Section Skeleton
// const FilterSectionSkeleton = () => (
//   <div className="mb-4 px-4">
//     <div className="bg-gray-50 rounded-lg p-3">
//       <div className="flex items-center justify-between mb-2">
//         <Skeleton className="h-4 w-20" />
//         <Skeleton className="h-4 w-12" />
//       </div>
//       <div className="flex flex-wrap gap-2">
//         {[1, 2, 3].map((i) => (
//           <Skeleton key={i} className="h-6 w-16 rounded-full" />
//         ))}
//       </div>
//     </div>
//   </div>
// );

// export default function Makeup() {
//   const [limit, setLimit] = useState(20);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isFiltering, setIsFiltering] = useState(false);
//   const [isInitialLoading, setIsInitialLoading] = useState(true);

//   // Filter states
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

//   const itemsPerPage = 10;

//   // Simulate initial loading
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setIsInitialLoading(false);
//     }, 1500);

//     return () => clearTimeout(timer);
//   }, []);

//   // Get all makeup products
//   const makeupProducts = products.filter(
//     (product) => product.category === CATEGORIES.MAKEUP
//   );

//   // Apply filters
//   const filteredProducts = useMemo(() => {
//     return makeupProducts.filter((product) => {
//       // Brand filter
//       if (
//         selectedBrands.length > 0 &&
//         !selectedBrands.includes(product.brand)
//       ) {
//         return false;
//       }

//       // Price filter
//       if (product.price < priceRange.min || product.price > priceRange.max) {
//         return false;
//       }

//       // Category filter (if you want to add subcategories later)
//       if (
//         selectedCategories.length > 0 &&
//         !selectedCategories.includes(product.category)
//       ) {
//         return false;
//       }

//       return true;
//     });
//   }, [makeupProducts, selectedBrands, selectedCategories, priceRange]);

//   // Pagination
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = filteredProducts.slice(startIndex, endIndex);

//   // Reset page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedBrands, selectedCategories, priceRange]);

//   // Get unique brands from makeup products ONLY
//   const availableBrands = useMemo(() => {
//     const brands = [...new Set(makeupProducts.map((p) => p.brand))];
//     return brands.filter(Boolean).sort();
//   }, [makeupProducts]);

//   const handleFilterChange = (filters) => {
//     setIsFiltering(true);

//     setTimeout(() => {
//       setSelectedBrands(filters.brands || []);
//       setSelectedCategories(filters.categories || []);
//       setPriceRange(filters.priceRange || { min: 0, max: 1000 });
//       setIsFiltering(false);
//     }, 600);
//   };

//   const handleBrandChange = (brands) => {
//     setIsFiltering(true);

//     setTimeout(() => {
//       setSelectedBrands(brands);
//       setIsFiltering(false);
//     }, 600);
//   };

//   const clearFilters = () => {
//     setIsFiltering(true);

//     setTimeout(() => {
//       setSelectedBrands([]);
//       setSelectedCategories([]);
//       setPriceRange({ min: 0, max: 1000 });
//       setIsFiltering(false);
//     }, 400);
//   };

//   // Show initial loading skeleton
//   if (isInitialLoading) {
//     return (
//       <div className="pt-10 pr-5 flex gap-6">
//         {/* Sidebar Skeleton */}
//         <div className="w-[280px] h-[700px] p-6 border rounded-xl bg-white shadow-sm flex-shrink-0">
//           <div className="flex items-center justify-between mb-6">
//             <Skeleton className="h-6 w-16" />
//             <Skeleton className="h-8 w-20" />
//           </div>

//           <div className="mb-6">
//             <Skeleton className="h-4 w-24 mb-3" />
//             <div className="space-y-2">
//               <Skeleton className="h-6 w-16" />
//               <Skeleton className="h-6 w-20" />
//             </div>
//           </div>

//           <div className="space-y-4">
//             {[1, 2, 3].map((i) => (
//               <div key={i} className="border rounded-lg">
//                 <div className="p-4">
//                   <Skeleton className="h-4 w-20" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Main Content Skeleton */}
//         <div className="flex-1">
//           <div className="w-full max-w-[100%] mx-auto mb-6">
//             <div className="flex justify-between items-center p-4 rounded-lg">
//               <div className="text-right pr-4 space-y-2">
//                 <Skeleton className="h-6 w-20" />
//                 <Skeleton className="h-4 w-32" />
//               </div>
//               <Skeleton className="h-10 w-32" />
//             </div>
//           </div>

//           <section className="flex gap-3 flex-wrap justify-center px-1">
//             {[...Array(8)].map((_, i) => (
//               <ProductCardSkeleton key={i} />
//             ))}
//           </section>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div>
//       <div className="pt-10 pr-5 flex gap-6">
//         {/* Filter Sidebar - Only shows makeup brands */}
//         <FilterSidebar
//           availableBrands={availableBrands}
//           selectedBrands={selectedBrands}
//           onBrandChange={handleBrandChange}
//           onFiltersChange={handleFilterChange}
//           onClearFilters={clearFilters}
//           isLoading={isFiltering}
//           category="makeup" // Pass category for specific filtering
//         />

//         {/* Main Content */}
//         <div
//           className={`flex-1 relative transition-all duration-500 ${
//             isFiltering ? "opacity-40" : "opacity-100"
//           }`}
//         >
//           {/* Filtering Overlay */}
//           {isFiltering && (
//             <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-20 flex items-center justify-center">
//               <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center border">
//                 <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-pink-600 mb-4"></div>
//                 <p className="text-gray-700 font-medium text-lg mb-2">
//                   جاري تطبيق الفلاتر
//                 </p>
//                 <p className="text-gray-500 text-sm">يرجى الانتظار...</p>
//               </div>
//             </div>
//           )}

//           {/* Header */}
//           <div className="w-full max-w-[100%] mx-auto mb-6">
//             <div className="flex justify-between items-center p-4 rounded-lg">
//               <div className="text-right pr-4">
//                 <h1 className="text-2xl font-semibold inline-block px-2 py-1 rounded text-pink-600">
//                   💄 المكياج
//                 </h1>
//                 <div className="mt-2 space-y-1">
//                   <span className="font-semibold text-gray-600 block">
//                     {isFiltering ? (
//                       <span className="inline-flex items-center">
//                         <Skeleton className="h-4 w-4 rounded-full mr-2" />
//                         <Skeleton className="h-4 w-24" />
//                       </span>
//                     ) : (
//                       `${filteredProducts.length} من أصل ${makeupProducts.length} منتج متوفر`
//                     )}
//                   </span>
//                   {selectedBrands.length > 0 && !isFiltering && (
//                     <div className="text-sm text-gray-500">
//                       الفلاتر المطبقة:
//                       {selectedBrands.length > 0 && (
//                         <span className="ml-2 text-pink-600">
//                           البراندات ({selectedBrands.length})
//                         </span>
//                       )}
//                     </div>
//                   )}
//                   {availableBrands.length > 0 && !isFiltering && (
//                     <div className="text-xs text-gray-400">
//                       البراندات المتاحة: {availableBrands.join(", ")}
//                     </div>
//                   )}
//                 </div>
//               </div>
//               <div className="text-left">
//                 <div className="text-white py-2 rounded">
//                   {isFiltering ? (
//                     <Skeleton className="h-10 w-32" />
//                   ) : (
//                     <PopularityDropdown />
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Active Filters Display */}
//           {selectedBrands.length > 0 && !isFiltering && (
//             <div className="mb-4 px-4">
//               <div className="bg-pink-50 rounded-lg p-3">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-sm font-medium text-gray-700">
//                     الفلاتر المطبقة:
//                   </span>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={clearFilters}
//                     className="text-xs text-pink-600 hover:text-pink-800"
//                   >
//                     مسح الكل
//                   </Button>
//                 </div>
//                 <div className="flex flex-wrap gap-2">
//                   {selectedBrands.map((brand) => (
//                     <span
//                       key={brand}
//                       className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-pink-100 text-pink-800"
//                     >
//                       {brand}
//                       <button
//                         onClick={() =>
//                           setSelectedBrands((prev) =>
//                             prev.filter((b) => b !== brand)
//                           )
//                         }
//                         className="ml-1 text-pink-600 hover:text-pink-800"
//                       >
//                         ×
//                       </button>
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Products Grid */}
//           <section className="flex gap-3 flex-wrap justify-center px-1 min-h-[400px] relative">
//             {isFiltering ? (
//               // Enhanced Skeleton Loading
//               <div className="w-full">
//                 <div className="flex gap-3 flex-wrap justify-center">
//                   {[...Array(8)].map((_, i) => (
//                     <ProductCardSkeleton key={i} />
//                   ))}
//                 </div>
//               </div>
//             ) : currentItems.length > 0 ? (
//               currentItems.map((p) => <ProductCard key={p.id} {...p} />)
//             ) : (
//               <div className="text-center py-12 w-full">
//                 <div className="text-6xl mb-4">💄</div>
//                 <div className="text-gray-500 text-lg mb-2">
//                   لم يتم العثور على منتجات مكياج
//                 </div>
//                 <div className="text-gray-400 text-sm mb-4">
//                   جرب تعديل الفلاتر للعثور على المنتجات المطلوبة
//                 </div>
//                 {selectedBrands.length > 0 && (
//                   <div className="text-xs text-gray-500 mb-4">
//                     البراندات المحددة: {selectedBrands.join(", ")}
//                   </div>
//                 )}
//                 <Button
//                   onClick={clearFilters}
//                   className="bg-pink-600 hover:bg-pink-700"
//                 >
//                   مسح الفلاتر
//                 </Button>
//               </div>
//             )}
//           </section>
//         </div>
//       </div>

//       {/* Pagination */}
//       {filteredProducts.length > itemsPerPage && !isFiltering && (
//         <SwitcherPages
//           totalItems={filteredProducts.length}
//           itemsPerPage={itemsPerPage}
//           currentPage={currentPage}
//           onPageChange={setCurrentPage}
//         />
//       )}
//     </div>
//   );
// }

"use client";

import { useState, useMemo, useEffect } from "react";
import React from "react";
import { CATEGORIES, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PopularityDropdown from "@/components/layout/PopularityDropdown";
import SwitcherPages from "@/components/layout/SwitcherPages";
import FilterSidebar from "@/components/layout/FilterSidebar";
import { Hero } from "@/components/ui/hero";
import { Herobar } from "@/components/layout/Herobar";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

// Product Card Skeleton Component
const ProductCardSkeleton = () => (
  <div className="bg-white rounded-lg border shadow-sm overflow-hidden w-[250px]">
    <Skeleton className="h-48 w-full" />
    <div className="p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-8 w-8 rounded" />
      </div>
    </div>
  </div>
);

// Filter Section Skeleton
const FilterSectionSkeleton = () => (
  <div className="mb-4 px-4">
    <div className="bg-gray-50 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-12" />
      </div>
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-6 w-16 rounded-full" />
        ))}
      </div>
    </div>
  </div>
);

export default function MakeUpPage() {
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltering, setIsFiltering] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  // المنتجات الخاصة بالمكياج فقط
  const makeupProducts = products.filter(
    (product) => product.category === CATEGORIES.MAKEUP
  );
  // استخرج الماركات الفريدة من منتجات المكياج
  const makeupBrands = [...new Set(makeupProducts.map((p) => p.brand))];
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Get all perfumes
  const perfumeProducts = products.filter(
    (product) => product.category === CATEGORIES.PERFUMES
  );

  // Apply filters
  // const filteredProducts = useMemo(() => {
  //   return perfumeProducts.filter((product) => {
  //     // Brand filter
  //     if (
  //       selectedBrands.length > 0 &&
  //       !selectedBrands.includes(product.brand)
  //     ) {
  //       return false;
  //     }

  //     // Price filter
  //     if (product.price < priceRange.min || product.price > priceRange.max) {
  //       return false;
  //     }

  //     // Category filter
  //     if (
  //       selectedCategories.length > 0 &&
  //       !selectedCategories.includes(product.category)
  //     ) {
  //       return false;
  //     }

  //     return true;
  //   });
  // }, [perfumeProducts, selectedBrands, selectedCategories, priceRange]);
  // المنتجات بعد الفلترة
  const filteredProducts = useMemo(() => {
    return makeupProducts.filter((product) => {
      if (
        selectedBrands.length > 0 &&
        !selectedBrands.includes(product.brand)
      ) {
        return false;
      }
      return true;
    });
  }, [makeupProducts, selectedBrands]);

  // Pagination
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredProducts.slice(startIndex, endIndex);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBrands, selectedCategories, priceRange]);

  // Get unique brands from perfume products
  const availableBrands = useMemo(() => {
    const brands = [...new Set(perfumeProducts.map((p) => p.brand))];
    return brands.filter(Boolean).sort();
  }, [perfumeProducts]);

  const handleFilterChange = (filters) => {
    setIsFiltering(true);

    setTimeout(() => {
      setSelectedBrands(filters.brands || []);
      setSelectedCategories(filters.categories || []);
      setPriceRange(filters.priceRange || { min: 0, max: 1000 });
      setIsFiltering(false);
    }, 600);
  };

  const handleBrandChange = (brands) => {
    setIsFiltering(true);

    setTimeout(() => {
      setSelectedBrands(brands);
      setIsFiltering(false);
    }, 600);
  };

  const clearFilters = () => {
    setIsFiltering(true);

    setTimeout(() => {
      setSelectedBrands([]);
      setSelectedCategories([]);
      setPriceRange({ min: 0, max: 1000 });
      setIsFiltering(false);
    }, 400);
  };

  // Show initial loading skeleton
  if (isInitialLoading) {
    return (
      <div className="pt-10 pr-5 flex gap-6">
        {/* Sidebar Skeleton */}
        <div className="w-[280px] h-[700px] p-6 border rounded-xl bg-white shadow-sm flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-6 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>

          <div className="mb-6">
            <Skeleton className="h-4 w-24 mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>

          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg">
                <div className="p-4">
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Skeleton */}
        <div className="flex-1">
          <div className="w-full max-w-[100%] mx-auto mb-6">
            <div className="flex justify-between items-center p-4 rounded-lg">
              <div className="text-right pr-4 space-y-2">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-4 w-32" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          <section className="flex gap-3 flex-wrap justify-center px-1">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </section>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className=" pr-7 pt-5">
        <Breadcrumbs />
      </div>
      <div className="pt-10 pr-5 flex">
        {/* Filter Sidebar */}
        <FilterSidebar
          availableBrands={makeupBrands} 
          selectedBrands={selectedBrands}
          onBrandChange={handleBrandChange}
          onFiltersChange={handleFilterChange}
          onClearFilters={clearFilters}
          isLoading={isFiltering}
        />

        {/* Main Content */}
        <div
          className={`flex-1 relative transition-all duration-500 ${
            isFiltering ? "opacity-40" : "opacity-100"
          }`}
        >
          {/* Filtering Overlay */}
          {isFiltering && (
            <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-20 flex items-center justify-center">
              <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center border">
                <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-blue-600 mb-4"></div>
                <p className="text-gray-700 font-medium text-lg mb-2">
                  جاري تطبيق الفلاتر
                </p>
                <p className="text-gray-500 text-sm">يرجى الانتظار...</p>
              </div>
            </div>
          )}

          {/* Header */}
          <div className="w-full max-w-[100%] mx-auto mb-6">
            <div className="flex justify-between items-center p-4 rounded-lg">
              <div className="text-right pr-4">
                <h1 className="text-2xl font-semibold inline-block px-2 py-1 rounded">
                  المكياج
                </h1>
                <div className="mt-2 space-y-1">
                  <span className="font-semibold text-gray-600 block">
                    {isFiltering ? (
                      <span className="inline-flex items-center">
                        <Skeleton className="h-4 w-4 rounded-full mr-2" />
                        <Skeleton className="h-4 w-24" />
                      </span>
                    ) : (
                      `${filteredProducts.length} من أصل ${perfumeProducts.length} منتج متوفر`
                    )}
                  </span>
                  {selectedBrands.length > 0 && !isFiltering && (
                    <div className="text-sm text-gray-500">
                      الفلاتر المطبقة:
                      {selectedBrands.length > 0 && (
                        <span className="ml-2 text-blue-600">
                          البراندات ({selectedBrands.length})
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className="text-left">
                <div className="text-white py-2 rounded">
                  {isFiltering ? (
                    <Skeleton className="h-10 w-32" />
                  ) : (
                    <PopularityDropdown />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {selectedBrands.length > 0 && !isFiltering && (
            <FilterSectionSkeleton />
          )}

          {selectedBrands.length > 0 && !isFiltering && (
            <div className="mb-4 px-4">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    الفلاتر المطبقة:
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs text-blue-600 hover:text-blue-800"
                  >
                    مسح الكل
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedBrands.map((brand) => (
                    <span
                      key={brand}
                      className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                    >
                      {brand}
                      <button
                        onClick={() =>
                          setSelectedBrands((prev) =>
                            prev.filter((b) => b !== brand)
                          )
                        }
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          <section className="flex gap-3 flex-wrap justify-center px-1 min-h-[400px] relative">
            {isFiltering ? (
              // Enhanced Skeleton Loading
              <div className="w-full">
                <div className="flex gap-3 flex-wrap justify-center">
                  {[...Array(8)].map((_, i) => (
                    <ProductCardSkeleton key={i} />
                  ))}
                </div>
              </div>
            ) : currentItems.length > 0 ? (
              currentItems.map((p) => <ProductCard key={p.id} {...p} />)
            ) : (
              <div className="text-center py-12 w-full">
                <div className="text-gray-500 text-lg mb-2">
                  لم يتم العثور على منتجات
                </div>
                <div className="text-gray-400 text-sm">
                  جرب تعديل الفلاتر للعثور على المنتجات المطلوبة
                </div>
                <Button
                  onClick={clearFilters}
                  className="mt-4 bg-blue-600 hover:bg-blue-700"
                >
                  مسح الفلاتر
                </Button>
              </div>
            )}
          </section>
        </div>
      </div>

      {/* Pagination */}
      {filteredProducts.length > itemsPerPage && !isFiltering && (
        <SwitcherPages
          totalItems={filteredProducts.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
