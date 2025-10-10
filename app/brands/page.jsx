"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGetBrandsByLetterQuery,
  useGetFeaturedBrandsQuery,
} from "@/features/brands/brandsSlice";
import {
  useGetBrandsQuery,
  selectAllBrands,
} from "@/features/brands/brandsSlice";
import { useSelector } from "react-redux";
const BrandsPage = () => {
  const [selectedLetter, setSelectedLetter] = useState("A");

  // جلب الماركات حسب الحرف
  const {
    data: brandsByLetter,
    isLoading,
    isError,
  } = useGetBrandsByLetterQuery(selectedLetter);

  // const {
  //   data: BrandsQuery,
  //   isLoading: isLoadingBrandsQuery,
  //   isError: isErrorBrandsQuery,
  // } = useGetBrandsQuery();

  const {
    data: brandsState,
    isLoadingBrandsQuery,
    isErrorBrandsQuery,
    error,
  } = useGetBrandsQuery();
  const brands = useSelector((state) => selectAllBrands(state));

  if (isLoadingBrandsQuery) return <p>جاري تحميل الماركات...</p>;
  if (isErrorBrandsQuery) return <p>حدث خطأ: {error?.message}</p>;
  // (اختياري) الماركات المميزة
  const {
    data: featuredBrands,
    isLoading: isLoadingFeatured,
    isError: isErrorFeatured,
  } = useGetFeaturedBrandsQuery();

  // الحروف الأبجدية
  const alphabetLetters = [
    "#",
    "Z",
    "V",
    "U",
    "T",
    "S",
    "R",
    "Q",
    "P",
    "O",
    "N",
    "M",
    "L",
    "K",
    "J",
    "I",
    "H",
    "G",
    "F",
    "E",
    "D",
    "C",
    "B",
    "A",
  ];

  // معالجة التحميل أو الخطأ
  if (isLoading || isLoadingFeatured)
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        جاري تحميل الماركات...
      </div>
    );

  if (isError || isErrorFeatured)
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        حدث خطأ أثناء جلب البيانات.
      </div>
    );

  const brandsList =
    brandsByLetter?.ids?.map((id) => brandsByLetter.entities[id]) || [];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* العنوان */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">الماركات</h1>

        {/* شريط الحروف */}
        <div className="flex justify-center items-center gap-4 mb-12 flex-wrap">
          {alphabetLetters.map((letter) => (
            <button
              key={letter}
              onClick={() => setSelectedLetter(letter)}
              className={`text-lg font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                letter === selectedLetter
                  ? "text-red-600 bg-red-50 font-bold"
                  : "text-gray-600 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
              }`}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* الماركات */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-8">
          <h2 className="text-6xl font-bold text-gray-300">{selectedLetter}</h2>
        </div>

        {brandsList.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brandsList.map((brand) => (
              <Link key={brand.id} href={`/brands/${brand.slug || brand.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-red-200 group">
                  <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
                    <div className="text-center">
                      <div className="font-semibold text-sm text-gray-800 leading-tight group-hover:text-red-600 transition-colors duration-200">
                        <img
                          src={brand.image}
                          alt={brand.name}
                          className="w-20 h-20 object-contain mb-2"
                        />{" "}
                      </div>
                      {brand.name}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-8">
            لا توجد ماركات تبدأ بالحرف {selectedLetter}.
          </p>
        )}
      </div>

      {/* قسم الماركات المميزة (اختياري) */}
      {featuredBrands?.length > 0 && (
        <div className="max-w-7xl mx-auto mt-16">
          <h2 className="text-2xl font-bold mb-6 text-gray-700">
            🌟 الماركات المميزة
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {featuredBrands.map((brand) => (
              <Link key={brand.id} href={`/brands/${brand.id}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-yellow-200 group">
                  <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
                    <div className="text-center">
                      <div className="font-semibold text-sm text-gray-800 leading-tight group-hover:text-yellow-600 transition-colors duration-200">
                        {brand.name}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsPage;
