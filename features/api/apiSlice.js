// src/features/api/apiSlice.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // baseUrl: "http://127.0.0.1:8000/api/v1",
    baseUrl: "https://ekleelhaba.duckdns.org/api/v1",

    prepareHeaders: (headers, { getState }) => {
      const token =
        getState().auth?.token || localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: [
    "Product",
    "Wishlist",
    "Brand",
    "Cart",
    "Category",
    "Order",
    "User",
    "Address",
    "Review",
    "Seller",
    "Coupon",
    "Promotion",
    "Notification",
    "Page",
    "Banner",
    "Settings",
    "Shipping",
    "Policy",
    "Search", 
  ],
  endpoints: (builder) => ({}),
});
