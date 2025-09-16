// app/categories/[slug]/page.jsx
"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import {
  useGetCategoryTreeQuery,
  useGetProductsByCategoryQuery,
  selectAllCategories,
} from "@/features/categories/categoriesSlice";

function ProductCard({ product }) {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center">
      <img
        src={product.images?.[0] || "/images/placeholder.png"}
        alt={product.name}
        className="w-32 h-32 object-cover mb-2"
      />
      <h3 className="text-center font-semibold">{product.name}</h3>
      <p className="text-sm text-gray-500">{product.brand}</p>
      <p className="mt-2 font-bold">{product.price} ريال</p>
    </div>
  );
}

export default function CategoryPage() {
  const { slug } = useParams(); // slug الفئة من الرابط
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";

  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useGetCategoryTreeQuery();
  const categories = useSelector(selectAllCategories);

  // إذا ما زالت البيانات تُحمّل
  if (isCategoriesLoading) return <p>جارٍ تحميل الفئات...</p>;

  // البحث عن الفئة باستخدام id (لأن الرابط يحتوي على الرقم)
  const category = categories.find((c) => c.id.toString() === slug);

  if (!category) return <p>الفئة غير موجودة</p>;
  // العثور على الفئة الحالية

  const [params, setParams] = useState({ search });
  const [products, setProducts] = useState([]);

  // جلب منتجات الفئة الحالية
  const {
    data: productsData,
    isLoading,
    isError,
  } = useGetProductsByCategoryQuery({
    slug: category?.slug,
    params,
  });

  // جلب منتجات الفئات الفرعية إذا لم توجد منتجات مباشرة
  const subCategoryIds = category?.children?.map((c) => c.slug) || [];
  const subProductsQueries = subCategoryIds.map((subSlug) =>
    useGetProductsByCategoryQuery({ slug: subSlug, params })
  );

  useEffect(() => {
    setParams({ search });
  }, [search]);

  useEffect(() => {
    if (productsData && productsData.ids.length > 0) {
      setProducts(productsData.ids.map((id) => productsData.entities[id]));
    } else {
      // جمع منتجات الفئات الفرعية إذا الفئة لا تحتوي على منتجات
      let subProducts = [];
      subProductsQueries.forEach((q) => {
        if (q.data && q.data.ids) {
          subProducts = subProducts.concat(
            q.data.ids.map((id) => q.data.entities[id])
          );
        }
      });
      setProducts(subProducts);
    }
  }, [productsData, subProductsQueries]);

  if (!category) return <p>الفئة غير موجودة</p>;
  if (isLoading) return <p>جارٍ تحميل المنتجات...</p>;
  if (isError) return <p>حدث خطأ أثناء تحميل المنتجات.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{category.name}</h1>
      {category.image && (
        <img
          src={category.image}
          alt={category.name}
          className="w-48 h-48 object-cover mb-4"
        />
      )}

      {/* الفئات الفرعية */}
      {category.children && category.children.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">فئات فرعية:</h2>
          <div className="flex flex-wrap gap-4">
            {category.children.map((sub) => (
              <a
                key={sub.id}
                href={`/categories/${sub.slug}`}
                className="border p-2 rounded hover:bg-gray-100"
              >
                {sub.name} ({sub.product_count})
              </a>
            ))}
          </div>
        </div>
      )}

      {/* عرض المنتجات */}
      <h2 className="text-xl font-semibold mb-2">المنتجات:</h2>
      {products.length === 0 ? (
        <p>لا توجد منتجات مطابقة للبحث.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
