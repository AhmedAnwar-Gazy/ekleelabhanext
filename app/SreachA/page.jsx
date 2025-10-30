// app/search/page.js
import { searchApi } from '@/lib/api/search';
import SearchResults from '@/components/search/SearchResultsClient';
import SearchFilters from '@/components/search/SearchFilters';

// This is a Server Component
export default async function SearchPage({ searchParams }) {
  const filters = {
    q: searchParams.q || '*',
    page: parseInt(searchParams.page) || 1,
    per_page: 20,
    categories: searchParams.categories ? 
      (Array.isArray(searchParams.categories) ? searchParams.categories : [searchParams.categories]) : [],
    price_range: searchParams.price_range ? 
      (Array.isArray(searchParams.price_range) ? searchParams.price_range : [searchParams.price_range]) : [],
    on_sale: searchParams.on_sale === 'true' ? true : null,
    sort_by: searchParams.sort_by || 'relevance',
  };
  // Server-side data fetching
  const searchData = await searchApi.searchProducts(filters);
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for &quot;{filters.q}&quot;
      </h1>
      
      <div className="flex gap-8">
        {/* Sidebar Filters - Client Component */}
        <aside className="w-64 flex-shrink-0">
          <SearchFilters 
            facets={searchData.facets} 
            currentFilters={filters}
          />
        </aside>

        {/* Results - Can be Server or Client Component */}
        <main className="flex-1">
          <SearchResults 
            products={searchData.products}
            pagination={searchData.pagination}
            searchTime={searchData.searchTimeMs}
          />
        </main>
      </div>
    </div>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ searchParams }) {
  const query = searchParams.q || 'all products';
  
  return {
    title: `Search: ${query} | Your Store`,
    description: `Search results for ${query}`,
  };
}