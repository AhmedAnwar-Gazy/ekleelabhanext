"use client";

import { useParams } from "next/navigation";
import { useGetBrandByIdQuery } from "@/features/brands/brandsSlice";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/ProductCard";
import SwitcherPages from "@/components/layout/SwitcherPages";
import FilterSidebar from "@/components/layout/FilterSidebar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

import Link from "next/link";

const BrandDetailsPage = () => {
  const { id } = useParams();
  const { data: brand, isLoading, isError } = useGetBrandByIdQuery(id);

  if (isLoading) return <div className="text-center p-10">جاري التحميل...</div>;
  if (isError || !brand)
    return <div className="text-center p-10 text-red-500">حدث خطأ</div>;

  return (
    <div>
      <div className=" pr-7 pt-5">
        <Breadcrumbs />
      </div>
      <div className="text-center mb-10">
        <img
          src={brand.image}
          alt={brand.name}
          className="h-32 mx-auto object-contain mb-4"
        />
        <h1 className="text-3xl font-bold">{brand.name}</h1>
        <p className="text-gray-500">عدد المنتجات: {brand.product_count}</p>
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
        {/* بيانات البراند */}

        {brand.products?.length > 0 ? (
          <section className="flex gap-3 flex-wrap justify-center px-1">
            {brand.products.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </section>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            لا توجد منتجات لهذا البراند.
          </p>
        )}

        {/* <SwitcherPages
        totalItems={makeupProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      /> */}
      </div>
    </div>
  );
};

export default BrandDetailsPage;
