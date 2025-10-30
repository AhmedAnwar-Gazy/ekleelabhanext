'use client';

// components/search/SearchFilters.js
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useState, useCallback } from 'react';

export default function SearchFilters({ facets, currentFilters }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    priceRange: true,
    onSale: true,
  });

  const updateFilter = useCallback((filterType, value, isChecked) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (filterType === 'on_sale') {
      if (isChecked) {
        params.set('on_sale', 'true');
      } else {
        params.delete('on_sale');
      }
    } else {
      // Handle array filters (categories, price_range)
      const currentValues = params.getAll(filterType);
      
      if (isChecked) {
        params.append(filterType, value);
      } else {
        params.delete(filterType);
        currentValues
          .filter(v => v !== value)
          .forEach(v => params.append(filterType, v));
      }
    }
    
    // Reset to page 1 when filters change
    params.set('page', '1');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams]);

  const clearAllFilters = useCallback(() => {
    const params = new URLSearchParams();
    const q = searchParams.get('q');
    if (q) params.set('q', q);
    
    router.push(`${pathname}?${params.toString()}`);
  }, [pathname, router, searchParams]);

  const categoryFacets = facets.categories?.values || [];
  const priceRangeFacets = facets.price_range?.values || [];
  const onSaleFacets = facets.on_sale?.values || [];

  const hasActiveFilters = 
    currentFilters.categories?.length > 0 ||
    currentFilters.price_range?.length > 0 ||
    currentFilters.on_sale;

  return (
    <div className="space-y-6">
      {/* Clear Filters */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full text-sm text-blue-600 hover:text-blue-800"
        >
          Clear All Filters
        </button>
      )}

      {/* Categories Filter */}
      {categoryFacets.length > 0 && (
        <div className="border-b pb-4">
          <button
            onClick={() =>
              setExpandedSections(prev => ({
                ...prev,
                categories: !prev.categories,
              }))
            }
            className="flex justify-between w-full items-center font-semibold mb-3"
          >
            <span>Categories</span>
            <span>{expandedSections.categories ? '−' : '+'}</span>
          </button>
          
          {expandedSections.categories && (
            <div className="space-y-2">
              {categoryFacets.map(facet => (
                <label
                  key={facet.value}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={currentFilters.categories?.includes(facet.value)}
                    onChange={(e) =>
                      updateFilter('categories', facet.value, e.target.checked)
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="flex-1">{facet.value}</span>
                  <span className="text-gray-500">({facet.count})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price Range Filter */}
      {priceRangeFacets.length > 0 && (
        <div className="border-b pb-4">
          <button
            onClick={() =>
              setExpandedSections(prev => ({
                ...prev,
                priceRange: !prev.priceRange,
              }))
            }
            className="flex justify-between w-full items-center font-semibold mb-3"
          >
            <span>Price Range</span>
            <span>{expandedSections.priceRange ? '−' : '+'}</span>
          </button>
          
          {expandedSections.priceRange && (
            <div className="space-y-2">
              {priceRangeFacets.map(facet => (
                <label
                  key={facet.value}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={currentFilters.price_range?.includes(facet.value)}
                    onChange={(e) =>
                      updateFilter('price_range', facet.value, e.target.checked)
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="flex-1">${facet.value}</span>
                  <span className="text-gray-500">({facet.count})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}

      {/* On Sale Filter */}
      {onSaleFacets.length > 0 && (
        <div>
          <button
            onClick={() =>
              setExpandedSections(prev => ({
                ...prev,
                onSale: !prev.onSale,
              }))
            }
            className="flex justify-between w-full items-center font-semibold mb-3"
          >
            <span>Deals</span>
            <span>{expandedSections.onSale ? '−' : '+'}</span>
          </button>
          
          {expandedSections.onSale && (
            <div className="space-y-2">
              {onSaleFacets.map(facet => (
                <label
                  key={facet.value}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    checked={currentFilters.on_sale === (facet.value === 'true')}
                    onChange={(e) =>
                      updateFilter('on_sale', null, e.target.checked)
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="flex-1">
                    {facet.value === 'true' ? 'On Sale' : 'Regular Price'}
                  </span>
                  <span className="text-gray-500">({facet.count})</span>
                </label>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}