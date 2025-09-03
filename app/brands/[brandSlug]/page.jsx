"use client";

// app/brands/[brandSlug]/page.js
import { useState } from "react";
import { CATEGORIES, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import PopularityDropdown from "@/components/layout/PopularityDropdown";
import SwitcherPages from "@/components/layout/SwitcherPages";
import FilterSidebar from "@/components/layout/FilterSidebar";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

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

export default function BrandPage({ params }) {
  const { brandSlug } = params;

  // نجيب المنتجات الخاصة بالماركة
  const brandProducts = products.filter(
    (p) => p.brand?.toLowerCase() === brandSlug.toLowerCase()
  );

  if (brandProducts.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">لا توجد منتجات لهذه الماركة</h1>
      </div>
    );
  }

  // ✅ تم التصحيح: استخدام brandProducts بدلاً من makeupProducts

  const makeupProducts = products.filter(
    (product) => product.category === CATEGORIES.PERFUMES
  );
  const itemsPerPage = 10; // كم منتج بالصفحة
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = brandProducts.slice(startIndex, endIndex);

  // ✅ الماركة الحالية فقط
  const currentBrand = brandProducts[0].brand;

  // ✅ نخليها متحدد تلقائيًا
  const [selectedBrands, setSelectedBrands] = useState([currentBrand]);

  // state للفلترة
  // state للفلترة
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  // const [selectedBrands, setSelectedBrands] = useState([]);
  const [isFiltering, setIsFiltering] = useState(false);

  // عند اختيار أو إزالة براند
  const handleToggleBrand = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };
  const handleBrandChange = (brands) => {
    setIsFiltering(true);

    setTimeout(() => {
      setSelectedBrands(brands);
      setIsFiltering(false);
    }, 600);
  };
  const handleFilterChange = (filters) => {
    setIsFiltering(true);

    setTimeout(() => {
      setSelectedBrands(filters.brands || []);
      setSelectedCategories(filters.categories || []);
      setPriceRange(filters.priceRange || { min: 0, max: 1000 });
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

  // ✅ المنتجات بعد الفلترة (ضمن الماركة المحددة فقط)

  let filteredProducts = brandProducts;
  // المنتجات بعد الفلترة
  // const filteredProducts =
  //   selectedBrands.length > 0
  //     ? brandProducts.filter((p) => selectedBrands.includes(p.brand))
  //     : brandProducts;
  // فلترة حسب الفئات إذا كانت محددة
  if (selectedCategories.length > 0) {
    filteredProducts = filteredProducts.filter((p) =>
      selectedCategories.includes(p.category)
    );
    // فلترة حسب السعر
    filteredProducts = filteredProducts.filter(
      (p) => p.price >= priceRange.min && p.price <= priceRange.max
    );
    // ✅ حساب الصفحات بناءً على المنتجات المفلترة
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = filteredProducts.slice(startIndex, endIndex);
    // ✅ إعادة تعيين الصفحة عند تغيير الفلاتر
    React.useEffect(() => {
      setCurrentPage(1);
    }, [selectedBrands, selectedCategories, priceRange]);
  }
  return (
    <div>
      <div className=" pr-7 pt-5">
        <Breadcrumbs />
      </div>
      {/* <h1 className="text-3xl font-bold mb-8">
        منتجات {brandProducts[0].brand}
      </h1> */}
      <div className="pt-10 pr-5 flex ">
        {/* <FilterSidebar
          brands={[currentBrand]}
          selectedBrands={selectedBrands}
          onToggleBrand={handleToggleBrand}
        /> */}
        <FilterSidebar
          availableBrands={[currentBrand]} // ✅ الماركة الحالية فقط
          selectedBrands={selectedBrands}
          selectedCategories={selectedCategories}
          priceRange={priceRange}
          onBrandChange={handleBrandChange}
          onFiltersChange={handleFilterChange}
          onClearFilters={clearFilters}
          isLoading={isFiltering}
          disableClearAll={true} // ✅ تعطيل زر مسح الكل في صفحة البراندات
        />
        <div className=" ">
          <div className="w-full max-w-[100%] mx-auto">
            <div className="flex justify-between items-center p-4 rounded-lg">
              <div className="text-right pr-4">
                <h1 className="text-3xl text-start font-bold mb-8">
                  منتجات {currentBrand}
                </h1>
                <span className="font-semibold text-gray-300 block mt-1">
                  {filteredProducts.length} منتج متوفر
                </span>
              </div>
              <div className="text-left">
                <div className=" text-white  py-2 rounded">
                  <PopularityDropdown />
                </div>
              </div>
            </div>
          </div>
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

            {selectedBrands.length > 0 && !isFiltering && (
              <div className="mb-4 px-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  {/* <div className="flex items-center justify-between mb-2">
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
                  </div> */}
                  {/* <div className="flex flex-wrap gap-2">
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
                  </div> */}
                </div>
              </div>
            )}
            <section className="flex gap-3 flex-wrap justify-center px-1">
              {currentItems.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </section>
            {/* Products Grid */}
            {/* <section className="flex gap-3 flex-wrap justify-center px-1 min-h-[400px] relative">
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
          </section> */}
          </div>
          {/* <section className="flex gap-3 flex-wrap justify-center px-1">
            {currentItems.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </section> */}
        </div>
      </div>
      <SwitcherPages
        totalItems={makeupProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
