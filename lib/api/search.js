// lib/api/search.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://ekleelhaba.duckdns.org/api/v1';

export const searchApi = {
  async searchProducts(filters) {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        if (Array.isArray(value)) {
          value.forEach(v => params.append(`${key}[]`, v));
        } else {
          params.set(key, value);
        }
      }
    });

    const response = await fetch(
      `${API_BASE_URL}/search/products?${params.toString()}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }

    const data = await response.json();
    
    return {
      products: data.data?.products || [],
      facets: data.data?.facets || {},
      pagination: data.data?.pagination || {},
      searchTimeMs: data.data?.search_time_ms || 0,
    };
  },
};