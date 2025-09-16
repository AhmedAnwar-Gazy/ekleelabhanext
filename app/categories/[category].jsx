// "use client";

// import { useState, useMemo, useEffect } from "react";
// import React from "react";
// import { useRouter } from "next/router";
// import { useDispatch } from "react-redux";
// import {
//   useGetCategoryTreeQuery,
//   useGetProductsByCategoryQuery,
//   selectAllCategories,
//   selectCategoryById,
// } from "@/features/categories/categoriesSlice";
// import { useSelector } from "react-redux";
// import ProductCard from "@/components/ProductCard";
// import PopularityDropdown from "@/components/layout/PopularityDropdown";
// import SwitcherPages from "@/components/layout/SwitcherPages";
// import FilterSidebar from "@/components/layout/FilterSidebar";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Button } from "@/components/ui/button";
// import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
// import Head from "next/head";

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

// // Error Component
// const ErrorPage = ({ message, onRetry }) => (
//   <div className="min-h-[400px] flex items-center justify-center">
//     <div className="text-center">
//       <div className="text-gray-500 text-xl mb-4">⚠️</div>
//       <h2 className="text-xl font-semibold text-gray-800 mb-2">خطأ</h2>
//       <p className="text-gray-600 mb-4">{message}</p>
//       <Button onClick={onRetry} className="bg-blue-600 hover:bg-blue-700">
//         إعادة المحاولة
//       </Button>
//     </div>
//   </div>
// );

// // Loading Component
// const LoadingPage = () => (
//   <div className="pt-10 pr-5 flex gap-6">
//     {/* Sidebar Skeleton */}
//     <div className="w-[280px] h-[700px] p-6 border rounded-xl bg-white shadow-sm flex-shrink-0">
//       <div className="flex items-center justify-between mb-6">
//         <Skeleton className="h-6 w-16" />
//         <Skeleton className="h-8 w-20" />
//       </div>
//       <div className="mb-6">
//         <Skeleton className="h-4 w-24 mb-3" />
//         <div className="space-y-2">
//           <Skeleton className="h-6 w-16" />
//           <Skeleton className="h-6 w-20" />
//         </div>
//       </div>
//       <div className="space-y-4">
//         {[1, 2, 3].map((i) => (
//           <div key={i} className="border rounded-lg">
//             <div className="p-4">
//               <Skeleton className="h-4 w-20" />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>

//     {/* Main Content Skeleton */}
//     <div className="flex-1">
//       <div className="w-full max-w-[100%] mx-auto mb-6">
//         <div className="flex justify-between items-center p-4 rounded-lg">
//           <div className="text-right pr-4 space-y-2">
//             <Skeleton className="h-6 w-16" />
//             <Skeleton className="h-4 w-32" />
//           </div>
//           <Skeleton className="h-10 w-32" />
//         </div>
//       </div>
//       <section className="flex gap-3 flex-wrap justify-center px-1">
//         {[...Array(8)].map((_, i) => (
//           <ProductCardSkeleton key={i} />
//         ))}
//       </section>
//     </div>
//   </div>
// );

// export default function CategoryPage() {
//   const router = useRouter();
//   const { category: categorySlug } = router.query;
//   const dispatch = useDispatch();

//   // Local States
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isFiltering, setIsFiltering] = useState(false);
//   const [sortBy, setSortBy] = useState("newest");

//   // Filter states
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedSubcategories, setSelectedSubcategories] = useState([]);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

//   const itemsPerPage = 12;

//   // RTK Query hooks
//   const {
//     data: categoriesData,
//     isLoading: categoriesLoading,
//     error: categoriesError,
//   } = useGetCategoryTreeQuery();

//   // Get all categories from Redux store
//   const allCategories = useSelector(selectAllCategories);

//   // Find current category by slug
//   const currentCategory = useMemo(() => {
//     if (!allCategories || !categorySlug) return null;
//     return allCategories.find(
//       (cat) =>
//         cat.slug === categorySlug ||
//         cat.slug === categorySlug.toLowerCase() ||
//         cat.name?.toLowerCase().replace(/\s+/g, "-") === categorySlug
//     );
//   }, [allCategories, categorySlug]);

//   // Build products query parameters
//   const productsQueryParams = useMemo(() => {
//     const params = {
//       page: currentPage,
//       limit: itemsPerPage,
//       sort: sortBy,
//     };

//     // Add filters
//     if (selectedBrands.length > 0) {
//       params.brands = selectedBrands.join(",");
//     }
//     if (selectedSubcategories.length > 0) {
//       params.subcategories = selectedSubcategories.join(",");
//     }
//     if (priceRange.min > 0 || priceRange.max < 1000) {
//       params.price_min = priceRange.min;
//       params.price_max = priceRange.max;
//     }

//     return params;
//   }, [
//     currentPage,
//     itemsPerPage,
//     sortBy,
//     selectedBrands,
//     selectedSubcategories,
//     priceRange,
//   ]);

//   // Fetch products for current category
//   const {
//     data: productsData,
//     isLoading: productsLoading,
//     error: productsError,
//     isFetching: productsRefetching,
//   } = useGetProductsByCategoryQuery(
//     {
//       slug: categorySlug,
//       params: productsQueryParams,
//     },
//     {
//       skip: !categorySlug || !currentCategory,
//       refetchOnMountOrArgChange: true,
//     }
//   );

//   // Get category children for subcategory filter
//   const categoryChildren = useMemo(() => {
//     if (!currentCategory || !allCategories) return [];
//     return allCategories.filter((cat) => cat.parent_id === currentCategory.id);
//   }, [currentCategory, allCategories]);

//   // Get unique brands from products
//   const availableBrands = useMemo(() => {
//     if (!productsData?.products) return [];
//     const brands = [...new Set(productsData.products.map((p) => p.brand))];
//     return brands.filter(Boolean).sort();
//   }, [productsData]);

//   // Products for current page
//   const currentItems = productsData?.products || [];
//   const totalItems = productsData?.total || 0;
//   const totalPages = Math.ceil(totalItems / itemsPerPage);

//   // Reset page when filters change
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedBrands, selectedSubcategories, priceRange, categorySlug]);

//   // Handle filter changes
//   const handleFilterChange = (filters) => {
//     setIsFiltering(true);
//     setTimeout(() => {
//       setSelectedBrands(filters.brands || []);
//       setSelectedSubcategories(filters.subcategories || []);
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
//       setSelectedSubcategories([]);
//       setPriceRange({ min: 0, max: 1000 });
//       setIsFiltering(false);
//     }, 400);
//   };

//   // Handle sorting
//   const handleSortChange = (newSortBy) => {
//     setSortBy(newSortBy);
//   };

//   // Loading states
//   const isInitialLoading = categoriesLoading || !categorySlug;
//   const isContentLoading = productsLoading || isFiltering;

//   // Error handling
//   if (categoriesError) {
//     return (
//       <>
//         <Head>
//           <title>خطأ في تحميل الأقسام - متجرنا</title>
//         </Head>
//         <ErrorPage
//           message="حدث خطأ في تحميل بيانات الأقسام"
//           onRetry={() => window.location.reload()}
//         />
//       </>
//     );
//   }

//   if (productsError) {
//     return (
//       <>
//         <Head>
//           <title>خطأ في تحميل المنتجات - متجرنا</title>
//         </Head>
//         <ErrorPage
//           message="حدث خطأ في تحميل المنتجات"
//           onRetry={() => window.location.reload()}
//         />
//       </>
//     );
//   }

//   // Show loading skeleton
//   if (isInitialLoading) {
//     return (
//       <>
//         <Head>
//           <title>جاري التحميل... - متجرنا</title>
//         </Head>
//         <LoadingPage />
//       </>
//     );
//   }

//   // Category not found
//   if (!currentCategory) {
//     return (
//       <>
//         <Head>
//           <title>القسم غير موجود - متجرنا</title>
//         </Head>
//         <ErrorPage
//           message="القسم المطلوب غير موجود"
//           onRetry={() => router.push("/")}
//         />
//       </>
//     );
//   }

//   // SEO metadata
//   const pageTitle = `${currentCategory.name} - متجرنا`;
//   const pageDescription =
//     currentCategory.description ||
//     `تسوق من مجموعة ${currentCategory.name} المتنوعة`;

//   return (
//     <>
//       <Head>
//         <title>{pageTitle}</title>
//         <meta name="description" content={pageDescription} />
//         <meta property="og:title" content={pageTitle} />
//         <meta property="og:description" content={pageDescription} />
//         <meta name="robots" content="index, follow" />
//         {currentCategory.image && (
//           <meta property="og:image" content={currentCategory.image} />
//         )}
//       </Head>

//       <div>
//         <div className="pr-7 pt-5">
//           <Breadcrumbs
//             currentCategory={currentCategory.name}
//             categorySlug={currentCategory.slug}
//           />
//         </div>

//         <div className="pt-10 pr-5 flex">
//           {/* Filter Sidebar */}
//           <FilterSidebar
//             availableBrands={availableBrands}
//             availableSubcategories={categoryChildren}
//             selectedBrands={selectedBrands}
//             selectedSubcategories={selectedSubcategories}
//             priceRange={priceRange}
//             onBrandChange={handleBrandChange}
//             onFiltersChange={handleFilterChange}
//             onClearFilters={clearFilters}
//             isLoading={isContentLoading}
//           />

//           {/* Main Content */}
//           <div
//             className={`flex-1 relative transition-all duration-500 ${
//               isContentLoading ? "opacity-40" : "opacity-100"
//             }`}
//           >
//             {/* Loading Overlay */}
//             {isContentLoading && (
//               <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-20 flex items-center justify-center">
//                 <div className="bg-white p-8 rounded-xl shadow-xl flex flex-col items-center border">
//                   <div className="animate-spin rounded-full h-12 w-12 border-b-3 border-blue-600 mb-4"></div>
//                   <p className="text-gray-700 font-medium text-lg mb-2">
//                     {productsRefetching
//                       ? "جاري تحديث المنتجات"
//                       : "جاري تطبيق الفلاتر"}
//                   </p>
//                   <p className="text-gray-500 text-sm">يرجى الانتظار...</p>
//                 </div>
//               </div>
//             )}

//             {/* Header */}
//             <div className="w-full max-w-[100%] mx-auto mb-6">
//               <div className="flex justify-between items-center p-4 rounded-lg">
//                 <div className="text-right pr-4">
//                   <h1 className="text-2xl font-semibold inline-block px-2 py-1 rounded">
//                     {currentCategory.name}
//                   </h1>
//                   {currentCategory.description && (
//                     <p className="text-gray-600 text-sm mt-1">
//                       {currentCategory.description}
//                     </p>
//                   )}
//                   <div className="mt-2 space-y-1">
//                     <span className="font-semibold text-gray-600 block">
//                       {isContentLoading ? (
//                         <span className="inline-flex items-center">
//                           <Skeleton className="h-4 w-4 rounded-full mr-2" />
//                           <Skeleton className="h-4 w-24" />
//                         </span>
//                       ) : (
//                         `${totalItems} منتج متوفر`
//                       )}
//                     </span>
//                     {(selectedBrands.length > 0 ||
//                       selectedSubcategories.length > 0) &&
//                       !isContentLoading && (
//                         <div className="text-sm text-gray-500">
//                           الفلاتر المطبقة:
//                           {selectedBrands.length > 0 && (
//                             <span className="ml-2 text-blue-600">
//                               البراندات ({selectedBrands.length})
//                             </span>
//                           )}
//                           {selectedSubcategories.length > 0 && (
//                             <span className="ml-2 text-green-600">
//                               الفئات الفرعية ({selectedSubcategories.length})
//                             </span>
//                           )}
//                         </div>
//                       )}
//                   </div>
//                 </div>
//                 <div className="text-left">
//                   <div className="text-white py-2 rounded">
//                     {isContentLoading ? (
//                       <Skeleton className="h-10 w-32" />
//                     ) : (
//                       <PopularityDropdown
//                         value={sortBy}
//                         onChange={handleSortChange}
//                       />
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Active Filters Display */}
//             {(selectedBrands.length > 0 || selectedSubcategories.length > 0) &&
//               !isContentLoading && (
//                 <div className="mb-4 px-4">
//                   <div className="bg-gray-50 rounded-lg p-3">
//                     <div className="flex items-center justify-between mb-2">
//                       <span className="text-sm font-medium text-gray-700">
//                         الفلاتر المطبقة:
//                       </span>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={clearFilters}
//                         className="text-xs text-blue-600 hover:text-blue-800"
//                       >
//                         مسح الكل
//                       </Button>
//                     </div>
//                     <div className="flex flex-wrap gap-2">
//                       {selectedBrands.map((brand) => (
//                         <span
//                           key={brand}
//                           className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
//                         >
//                           {brand}
//                           <button
//                             onClick={() =>
//                               setSelectedBrands((prev) =>
//                                 prev.filter((b) => b !== brand)
//                               )
//                             }
//                             className="ml-1 text-blue-600 hover:text-blue-800"
//                           >
//                             ×
//                           </button>
//                         </span>
//                       ))}
//                       {selectedSubcategories.map((subcategory) => (
//                         <span
//                           key={subcategory}
//                           className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800"
//                         >
//                           {subcategory}
//                           <button
//                             onClick={() =>
//                               setSelectedSubcategories((prev) =>
//                                 prev.filter((s) => s !== subcategory)
//                               )
//                             }
//                             className="ml-1 text-green-600 hover:text-green-800"
//                           >
//                             ×
//                           </button>
//                         </span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}

//             {/* Products Grid */}
//             <section className="flex gap-3 flex-wrap justify-center px-1 min-h-[400px] relative">
//               {isContentLoading ? (
//                 <div className="w-full">
//                   <div className="flex gap-3 flex-wrap justify-center">
//                     {[...Array(8)].map((_, i) => (
//                       <ProductCardSkeleton key={i} />
//                     ))}
//                   </div>
//                 </div>
//               ) : currentItems.length > 0 ? (
//                 currentItems.map((product) => (
//                   <ProductCard key={product.id} {...product} />
//                 ))
//               ) : (
//                 <div className="text-center py-12 w-full">
//                   <div className="text-gray-500 text-lg mb-2">
//                     لم يتم العثور على منتجات
//                   </div>
//                   <div className="text-gray-400 text-sm">
//                     جرب تعديل الفلاتر للعثور على المنتجات المطلوبة
//                   </div>
//                   <Button
//                     onClick={clearFilters}
//                     className="mt-4 bg-blue-600 hover:bg-blue-700"
//                   >
//                     مسح الفلاتر
//                   </Button>
//                 </div>
//               )}
//             </section>
//           </div>
//         </div>

//         {/* Pagination */}
//         {totalPages > 1 && !isContentLoading && (
//           <SwitcherPages
//             totalItems={totalItems}
//             itemsPerPage={itemsPerPage}
//             currentPage={currentPage}
//             onPageChange={setCurrentPage}
//             totalPages={totalPages}
//           />
//         )}
//       </div>
//     </>
//   );
// }
