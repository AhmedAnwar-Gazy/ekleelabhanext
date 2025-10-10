import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

// --- Entity Adapter for Brands ---
const brandsAdapter = createEntityAdapter({
  selectId: (brand) => brand.id,
  sortComparer: (a, b) => a.name.localeCompare(b.name),
});

const initialBrandsState = brandsAdapter.getInitialState({
  loading: false,
  error: null,
  featured: [],
  byLetter: {},
});

// --- RTK Query API Slice Injection ---
export const brandsSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get All Brands ---
    getBrands: builder.query({
      query: () => "/brands",
      transformResponse: (responseData) => {
        const brandsData = responseData.data || responseData;
        return brandsAdapter.setAll(initialBrandsState, brandsData);
      },
      providesTags: (result) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "Brand", id })),
              { type: "Brand", id: "LIST" },
            ]
          : [{ type: "Brand", id: "LIST" }],
    }),

    // --- Get Featured Brands ---
    getFeaturedBrands: builder.query({
      query: () => "/brands/featured",
      transformResponse: (responseData) => {
        const featured = responseData.data || responseData;
        return featured;
      },
      providesTags: [{ type: "Brand", id: "FEATURED" }],
    }),

    // --- Get Brands by Letter ---
    getBrandsByLetter: builder.query({
      query: (letter) => `/brands/letter/${letter}`,
      transformResponse: (responseData) => {
        const brandsData = responseData.data || responseData;
        return brandsAdapter.setAll(initialBrandsState, brandsData);
      },
      providesTags: (result, error, letter) => [
        { type: "Brand", id: `LETTER-${letter}` },
      ],
    }),

    // --- Get Brand by ID ---
    // getBrandById: builder.query({
    //   query: (id) => `/brands/${id}`,
    //   providesTags: (result, error, id) => [{ type: "Brand", id }],
    // }),
    // --- Get Brand by ID (مع المنتجات) ---
    getBrandById: builder.query({
      query: (id) => `/brands/${id}`,
      transformResponse: (responseData) => {
        // بعض الـ APIs ترجع { data: {...} } لذلك نأخذ data إذا موجودة
        return responseData.data || responseData;
      },
      providesTags: (result, error, id) => [{ type: "Brand", id }],
    }),
  }),
});

// --- Export Hooks ---
export const {
  useGetBrandsQuery,
  useGetFeaturedBrandsQuery,
  useGetBrandsByLetterQuery,
  useGetBrandByIdQuery,
} = brandsSlice;

// --- Memoized Selectors ---
export const {
  selectAll: selectAllBrands,
  selectById: selectBrandById,
  selectIds: selectBrandIds,
} = brandsAdapter.getSelectors(
  (state) =>
    brandsSlice.endpoints.getBrands.select()(state).data || initialBrandsState
);

// --- Selector: Featured Brands ---
export const selectFeaturedBrands = createSelector(
  (state) => brandsSlice.endpoints.getFeaturedBrands.select()(state).data,
  (featured) => featured || []
);

// --- Selector: Brands by Letter ---
export const selectBrandsByLetter = (letter) =>
  createSelector(
    (state) =>
      brandsSlice.endpoints.getBrandsByLetter.select(letter)(state).data,
    (brandsState) =>
      brandsState ? brandsAdapter.getSelectors().selectAll(brandsState) : []
  );

export default brandsSlice;
