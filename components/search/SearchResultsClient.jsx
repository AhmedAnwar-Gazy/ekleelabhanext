'use client';

// components/search/SearchResultsClient.js
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useSearchProductsQuery } from '@/features/search/searchSlice';
import { useCallback, useMemo } from 'react';
import ProductCard from '@/components/ProductCard';
import Pagination from '@/components/ui/Paginations';
import SearchSkeleton from './SearchSkeleton';

export default function SearchResultsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse search params with proper defaults
  const filters = useMemo(() => {
    const categories = searchParams.getAll('categories');
    const priceRanges = searchParams.getAll('price_range');
    
    return {
      q: searchParams.get('q') || '*',
      page: parseInt(searchParams.get('page')) || 1,
      per_page: parseInt(searchParams.get('per_page')) || 20,
      categories: categories.length > 0 ? categories : [],
      category_ids: searchParams.getAll('category_ids').map(id => parseInt(id)).filter(Boolean),
      price_range: priceRanges.length > 0 ? priceRanges : [],
      on_sale: searchParams.get('on_sale') === 'true' ? true : 
               searchParams.get('on_sale') === 'false' ? false : null,
      sort_by: searchParams.get('sort_by') || 'relevance',
      min_price: searchParams.get('min_price') ? parseFloat(searchParams.get('min_price')) : null,
      max_price: searchParams.get('max_price') ? parseFloat(searchParams.get('max_price')) : null,
    };
  }, [searchParams]);

  // RTK Query hook
  const {
    data: searchData,
    isLoading,
    isFetching,
    isError,
    error,
    isSuccess,
  } = useSearchProductsQuery(filters);

  // Update URL with new filters
  const updateFilters = useCallback((newFilters) => {
    const params = new URLSearchParams();
    
    const mergedFilters = { ...filters, ...newFilters };
    
    Object.entries(mergedFilters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          if (value.length > 0) {
            value.forEach(v => {
              if (v !== null && v !== undefined && v !== '') {
                params.append(key, v.toString());
              }
            });
          }
        } else {
          params.set(key, value.toString());
        }
      }
    });

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [filters, pathname, router]);

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/placeholder.png';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://ekleelabha.shop/image/${imagePath}`;
  };

  // Extract products from normalized state
  const products = useMemo(() => {
    if (!searchData || !searchData.ids || !searchData.entities) {
      return [];
    }
    
    return searchData.ids
      .map(id => searchData.entities[id])
      .filter(Boolean); // Filter out any undefined/null values
  }, [searchData]);

  // Get other data with safe fallbacks
  const facets = searchData?.facets || {};
  const pagination = searchData?.pagination || {
    current_page: 1,
    per_page: 20,
    total: 0,
    total_pages: 0,
  };
  const searchTimeMs = searchData?.searchTimeMs || 0;

  // Loading state
  if (isLoading) {
    return <SearchSkeleton />;
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-100">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          حدث خطأ في تحميل نتائج البحث
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          {error?.data?.message || error?.message || 'حدث خطأ ما'}
        </p>
        <button
          onClick={() => router.refresh()}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          حاول مرة أخرى
        </button>
      </div>
    );
  }

  // No results state
  if (isSuccess && products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gray-100">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          لم يتم العثور على منتجات
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          حاول تعديل البحث أو الفلاتر للعثور على ما تبحث عنه
        </p>
        <button
          onClick={() => router.push('/search?q=*')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          مسح البحث
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b">
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">{pagination.total.toLocaleString()}</span> نتيجة
            {searchTimeMs > 0 && (
              <span className="text-gray-400"> في {searchTimeMs} ملي ثانية</span>
            )}
          </p>
          {isFetching && (
            <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
          )}
        </div>
        
        {/* Sort Dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm text-gray-600">
            ترتيب حسب:
          </label>
          <select
            id="sort"
            value={filters.sort_by}
            onChange={(e) => updateFilters({ sort_by: e.target.value, page: 1 })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="relevance">الأكثر صلة</option>
            <option value="price_asc">السعر: من الأقل للأعلى</option>
            <option value="price_desc">السعر: من الأعلى للأقل</option>
            <option value="date_added_desc">الأحدث أولاً</option>
            <option value="date_added_asc">الأقدم أولاً</option>
          </select>
        </div>
      </div>

      {/* Active Filters */}
      {(filters.categories.length > 0 || 
        filters.price_range.length > 0 || 
        filters.on_sale !== null ||
        filters.min_price !== null ||
        filters.max_price !== null) && (
        <div className="flex flex-wrap gap-2">
          {filters.categories.map(category => (
            <span
              key={category}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
            >
              {category}
              <button
                onClick={() => {
                  const newCategories = filters.categories.filter(c => c !== category);
                  updateFilters({ categories: newCategories, page: 1 });
                }}
                className="hover:text-blue-900"
                aria-label={`إزالة فلتر ${category}`}
              >
                ×
              </button>
            </span>
          ))}
          
          {filters.price_range.map(range => (
            <span
              key={range}
              className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
            >
              {range} ريال
              <button
                onClick={() => {
                  const newRanges = filters.price_range.filter(r => r !== range);
                  updateFilters({ price_range: newRanges, page: 1 });
                }}
                className="hover:text-green-900"
                aria-label={`إزالة فلتر ${range}`}
              >
                ×
              </button>
            </span>
          ))}
          
          {filters.on_sale && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-800 text-sm rounded-full">
              عرض خاص
              <button
                onClick={() => updateFilters({ on_sale: null, page: 1 })}
                className="hover:text-red-900"
                aria-label="إزالة فلتر العروض"
              >
                ×
              </button>
            </span>
          )}

          {(filters.min_price !== null || filters.max_price !== null) && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
              {filters.min_price || 0} - {filters.max_price || '∞'} ريال
              <button
                onClick={() => updateFilters({ min_price: null, max_price: null, page: 1 })}
                className="hover:text-purple-900"
                aria-label="إزالة فلتر السعر"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}

      {/* Products Grid - Using your ProductCard */}
      <div className="flex flex-wrap justify-center gap-4">
        {products.map(product => (
          <ProductCard
            key={product.id}
            id={product.id}
            category={product.categories?.[0] || 'غير مصنف'}
            brand={product.brand || 'بدون علامة تجارية'}
            image={getImageUrl(product.main_image)}
            description={product.description_ar || product.description_en || ''}
            name={product.name_ar || product.name_en || 'منتج'}
            final_price={product.final_price || 0}
            price={product.price || 0}
          />
        ))}
      </div>

      {/* Empty state within results (shouldn't happen but just in case) */}
      {products.length === 0 && !isLoading && (
        <div className="text-center py-8 text-gray-500">
          لا توجد منتجات للعرض
        </div>
      )}

      {/* Pagination */}
      {pagination.total_pages > 1 && (
        <div className="pt-6">
          <Pagination
            currentPage={pagination.current_page}
            totalPages={pagination.total_pages}
            onPageChange={(page) => updateFilters({ page })}
            totalItems={pagination.total}
            itemsPerPage={pagination.per_page}
          />
        </div>
      )}

      {/* Debug info (remove in production) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-8 p-4 bg-gray-100 rounded text-xs">
          <summary className="cursor-pointer font-semibold">معلومات التطوير</summary>
          <pre className="mt-2 overflow-auto text-left" dir="ltr">
            {JSON.stringify({
              filters,
              productsCount: products.length,
              idsCount: searchData?.ids?.length,
              entitiesCount: Object.keys(searchData?.entities || {}).length,
              pagination,
              isLoading,
              isFetching,
              isError,
              isSuccess,
              sampleProduct: products[0],
            }, null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}