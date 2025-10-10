// src/features/categories/categoriesSlice.js
import { createSelector } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter } from "@reduxjs/toolkit";

// --- Entity Adapter for Categories ---
const categoriesAdapter = createEntityAdapter({
  selectId: (category) => category.id,
  sortComparer: (a, b) => a.sort_order - b.sort_order,
});

const initialCategoriesState = categoriesAdapter.getInitialState({
  loading: false,
  error: null,
  tree: null, // For hierarchical category structure
});

// --- RTK Query API Slice Injection ---
export const categoriesSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // --- Get Category Tree ---
    getCategoryTree: builder.query({
      query: () => "/categories",
      transformResponse: (responseData) => {
        // Handle API response structure
        // The API returns a tree structure, not an array
        // We need to extract the actual categories data
        const categoriesData = responseData.data || responseData;

        // For tree structure, we need to flatten it for normalization
        const flatCategories = flattenCategories(categoriesData);

        const state = categoriesAdapter.setAll(
          initialCategoriesState,
          flatCategories
        );

        // Store the tree structure separately
        return {
          ...state,
          tree: categoriesData,
        };
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.ids.map((id) => ({ type: "Category", id })),
              { type: "Category", id: "TREE" },
            ]
          : [{ type: "Category", id: "TREE" }],
    }),

    // --- Get Category by ID ---
    getCategoryById: builder.query({
      query: (id) => `/categories/${id}`,
      providesTags: (result, error, id) => [{ type: "Category", id }],
    }),

    // --- Get Products by Category ---

    getProductsByCategory: builder.query({
      query: ({ id, params }) => ({
        url: `/products`,
        params: {
          ...params,
          category_id: id, // ✅ الآن نستخدم id القادم من الدالة
        },
      }),
      providesTags: (result, error, { id }) => [
        { type: "Category", id },
        { type: "Product", id: "LIST" },
      ],
    }),
  }),
});

// Helper function to flatten category tree for normalization
function flattenCategories(categories) {
  // Handle case where categories might be null/undefined
  if (!categories) return [];

  // Handle both single object and array input
  const categoryArray = Array.isArray(categories) ? categories : [categories];

  let flatList = [];

  categoryArray.forEach((category) => {
    // Add current category
    flatList.push({
      ...category,
      // If it's a top-level category, parent_id should be null
      parent_id: category.parent_id || null,
    });

    // Recursively flatten children
    if (category.children && category.children.length > 0) {
      const flattenedChildren = flattenCategories(category.children);
      // Set parent_id for children
      const childrenWithParent = flattenedChildren.map((child) => ({
        ...child,
        parent_id: category.id,
      }));
      flatList = flatList.concat(childrenWithParent);
    }
  });

  return flatList;
}

// Export auto-generated hooks
export const {
  useGetCategoryTreeQuery,
  useGetCategoryByIdQuery,
  useGetProductsByCategoryQuery,
} = categoriesSlice;

// --- Memoized Selectors ---
// Selector for categories
export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoryIds,
} = categoriesAdapter.getSelectors(
  (state) =>
    categoriesSlice.endpoints.getCategoryTree.select()(state).data ||
    initialCategoriesState
);

// Selector for root categories (top-level)
export const selectRootCategories = createSelector(
  [selectAllCategories],
  (categories) =>
    categories.filter(
      (category) => !category.parent_id || category.parent_id === null
    )
);

// Selector for building category tree from flat list
export const selectCategoryTree = createSelector(
  [selectAllCategories],
  (categories) => {
    if (categories.length === 0) return [];

    const categoryMap = {};

    // Create map of categories by ID
    categories.forEach((category) => {
      categoryMap[category.id] = { ...category, children: [] };
    });

    // Build tree structure
    const tree = [];
    categories.forEach((category) => {
      const categoryWithChildren = categoryMap[category.id];

      if (category.parent_id && categoryMap[category.parent_id]) {
        // Add to parent's children
        categoryMap[category.parent_id].children.push(categoryWithChildren);
      } else {
        // Root category
        tree.push(categoryWithChildren);
      }
    });

    return tree;
  }
);

// Selector for getting children of a category
export const selectCategoryChildren = createSelector(
  [selectAllCategories, (state, parentId) => parentId],
  (categories, parentId) =>
    categories.filter((category) => category.parent_id == parentId)
);

export default categoriesSlice;
