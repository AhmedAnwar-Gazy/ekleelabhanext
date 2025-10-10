"use client";

import React from "react";
import { useParams } from "next/navigation";
import {
  useGetCategoryByIdQuery,
  useGetProductsByCategoryQuery,
} from "@/features/categories/categoriesSlice";
import Link from "next/link";
import { Spinner } from "@/components/ui/spinner"; // اختياري، أي مكون تحميل

import { useGetBrandByIdQuery } from "@/features/brands/brandsSlice";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import SwitcherPages from "@/components/layout/SwitcherPages";
import FilterSidebar from "@/components/layout/FilterSidebar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

export default function CategoryPage() {
  const params = useParams(); // { id: "123" }
  const categoryId = params.id;

  const {
    data: productsData,
    isLoading: loadingProducts,
    isError: errorProducts,
  } = useGetProductsByCategoryQuery({
    id: categoryId,
    params: { limit: 50 },
  });

  // 🟢 جلب بيانات التصنيف
  // const {
  //   data: category,
  //   isLoading: loadingCategory,
  //   isError: errorCategory,
  // } = useGetCategoryByIdQuery(categoryId);

  // ✅ استدعاء الـ query
  const {
    data: category,
    error,
    isLoading,
    isFetching,
  } = useGetCategoryByIdQuery(categoryId, {
    skip: !categoryId, // مهم: عشان ما يعمل request قبل ما يكون id متوفر
  });

  if (isLoading || isFetching) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ أثناء جلب البيانات</p>;
  if (!category) return <p>لا يوجد بيانات</p>;

  // if (loadingCategory || loadingProducts)
  //   return <div className="p-10 text-center">جاري تحميل البيانات...</div>;

  // if (errorCategory || errorProducts)
  //   return (
  //     <div className="p-10 text-center text-red-500">
  //       حدث خطأ أثناء جلب البيانات
  //     </div>
  //   );

  const products = productsData?.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-2">
        <h1>التصنيف: {category.name}</h1>{" "}
      </h1>{" "}
      <div className=" pr-7 pt-5">
        <Breadcrumbs />
      </div>
      <div className="pt-10 pr-5 flex ">
        <FilterSidebar
          // availableBrands={[currentBrand]} // ✅ الماركة الحالية فقط
          // selectedBrands={selectedBrands}
          // selectedCategories={selectedCategories}
          // priceRange={priceRange}
          // onBrandChange={handleBrandChange}
          // onFiltersChange={handleFilterChange}
          // onClearFilters={clearFilters}
          // isLoading={isFiltering}
          disableClearAll={true} // ✅ تعطيل زر مسح الكل في صفحة البراندات
        />

        {products.length === 0 ? (
          <p>لا توجد منتجات في هذا التصنيف.</p>
        ) : (
          <section className="flex gap-3 flex-wrap justify-center px-1">
            {products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
