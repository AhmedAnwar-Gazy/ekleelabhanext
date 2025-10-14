"use client"; // مهم في app directory

import React from "react";
import ProductCard from "@/components/ProductCard";
import { Herobar } from "@/components/layout/Herobar";
import { Offers } from "@/components/layout/Offers";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MinCard from "@/components/layout/minCard";
import SeketonCard from "@/components/layout/skeletoncard";

// import { products } from "@/data/products";
import {
  useGetProductsQuery,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useGetDealsProductsQuery,
} from "@/features/products/productsSlice";
import { useSelector } from "react-redux";
import {
  useGetCategoryTreeQuery,
  selectRootCategories,
} from "../features/categories/categoriesSlice";

// import { Offersdata } from "@/data/offers";
import { brands } from "@/data/brands";
import BrandsTest from "@/features/brands/BrandsTest";
import CategoriesTest from "@/features/categories/CategoriesTest";
import SearchComponent from "@/features/search/SearchComponent";
import CartTest from "@/features/cart/CartTest";
const slugsToShow = [
  "adrienne-vittadini",
  "adidas",
  "chanel",
  "cantabria-labs",
];

const allBrands = Object.values(brands).flat();

const offerItems = [
  {
    src: `/images/brands/cantabria-labs.png`, // 👈 صورة Adidas
    href: "/brands/cantabria-labs", // 👈 رابط Adidas
  },
  {
    src: `/images/brands/adidas.png`, // 👈 صورة Adidas
    href: "/brands/adidas", // 👈 رابط Adidas
  },
  {
    src: `/images/brands/cantabria-labs.png`, // 👈 صورة Adidas
    href: "/brands/cantabria-labs", // 👈 رابط Adidas
  },
  // ...dynamicItems, // 👈 البقية تجي بعده
];

export default function Home() {
  // بيانات المنتجات
  const { data, isLoading, isError } = useGetProductsQuery({
    limit: 20,
    page: 1,
  });
  const products = data?.ids?.map((id) => data.entities[id]) || [];

  //  بيانات الاعلى المنتجات
  const {
    data: topProductsResult, // Contains { ids, entities } and meta data if transformResponse was applied
    isLoading: topLoading,
    isSuccess: topSuccess,
    isError: topError,
    error,
  } = useGetTopProductsQuery({ limit: 12 });

  const topProducts =
    topProductsResult?.ids?.map((id) => topProductsResult.entities[id]) || [];

  if (topError) {
    console.error("Top Products API Error:");
  }
  // بيانات المنتجات الجديدة
  const {
    data: newProductsResult, // Contains { ids, entities } and meta data if transformResponse was applied
    isLoading: newLoading,
    isSuccess: newSuccess,
    isError: newError,
  } = useGetNewProductsQuery({ limit: 12 });

  const newProducts =
    newProductsResult?.ids?.map((id) => newProductsResult.entities[id]) || [];

  // بيانات deals
  const {
    data: dealsProductsResult,
    isLoading: dealsLoading,
    isSuccess: dealsSuccess,
    isError: dealsError,
  } = useGetDealsProductsQuery({ limit: 12 });

  const dealsProducts =
    dealsProductsResult?.ids?.map((id) => dealsProductsResult.entities[id]) ||
    [];

  return (
    <div className="">
      <Herobar
        imges="images/95.png"
        className="h-[450px] p-2 rounded max-w-screen-2xl mx-auto  "
      />
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 pt-10">متجر العطور الفاخر</h1>
        <p className="text-gray-600">اكتشف أروع وأفخم العطور من حول العالم</p>
      </section>
      <div className="w-full max-w-screen-2xl mx-auto pt-10 " dir="rtl">
        <Carousel
          opts={{
            align: "start", // يبدأ من أول عنصر (لا يقطع العناصر)
            // containScroll: "trimSnaps", // يمنع ظهور سلايد فاضي في النهاية
            direction: "rtl", // لو موقعك عربي RTL. احذفها إن كان موقعك LTR
            loop: false, // اجعله true لو تبغى تدوير لا نهائي
          }}
          className="w-full  relative "
        >
          <CarouselContent className="w-full px-4 gap-18 sm:gap-8 lg:gap-0">
            {isLoading ? (
              <SeketonCard />
            ) : isError ? (
              <p>حدث خطأ أثناء جلب المنتجات</p>
            ) : (
              products.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 "
                >
                  <ProductCard {...p} />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <div className="absolute -top-8 left-10 flex gap-2 p-2 z-10">
            <CarouselNext className=" border-current static h-10 w-10 rounded-full hover:bg-gray-200  flex items-center justify-center transition" />
            <CarouselPrevious className=" border-current static h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
          </div>
        </Carousel>
      </div>
      <Offers items={offerItems} />
      {/* الأكثر مبيعًا */}
      <div className="w-full max-w-screen-2xl mx-auto pt-10 " dir="rtl">
        <h2 className="text-2xl font-bold mb-4 mr-10">الأكثر مبيعًا </h2>

        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
            loop: false,
          }}
          className="w-full  relative "
        >
          <CarouselContent className="w-full px-4 gap-18 sm:gap-8 lg:gap-0">
            {topLoading ? (
              <SeketonCard />
            ) : topError ? (
              <p>حدث خطأ أثناء جلب المنتجات</p>
            ) : (
              topProducts.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 "
                >
                  <ProductCard {...p} />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <div className="absolute -top-8 left-10 flex gap-2 p-2 z-10">
            <CarouselNext className=" border-current static h-10 w-10 rounded-full hover:bg-gray-200  flex items-center justify-center transition" />
            <CarouselPrevious className=" border-current static h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
          </div>
        </Carousel>
      </div>
      {/* المنتحات الجديدة */}
      <div className="w-full max-w-screen-2xl mx-auto pt-10 " dir="rtl">
        <h2 className="text-2xl font-bold mb-4 mr-10">المنتجات الجديدة </h2>

        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
            loop: false,
          }}
          className="w-full  relative "
        >
          <CarouselContent className="w-full px-4 gap-18 sm:gap-8 lg:gap-0">
            {newLoading ? (
              <SeketonCard />
            ) : newError ? (
              <p>حدث خطأ أثناء جلب المنتجات</p>
            ) : (
              newProducts.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 "
                >
                  <ProductCard {...p} />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <div className="absolute -top-8 left-10 flex gap-2 p-2 z-10">
            <CarouselNext className=" border-current static h-10 w-10 rounded-full hover:bg-gray-200  flex items-center justify-center transition" />
            <CarouselPrevious className=" border-current static h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
          </div>
        </Carousel>
      </div>
      {/* المنتحات deals */}
      <div className="w-full max-w-screen-2xl mx-auto pt-10 " dir="rtl">
        <h2 className="text-2xl font-bold mb-4 mr-10"> التخفيضات الكبيرة </h2>

        <Carousel
          opts={{
            align: "start",
            direction: "rtl",
            loop: false,
          }}
          className="w-full  relative "
        >
          <CarouselContent className="w-full px-4 gap-18 sm:gap-2 lg:gap-0">
            {dealsLoading ? (
              <SeketonCard />
            ) : dealsError ? (
              <p>حدث خطأ أثناء جلب المنتجات</p>
            ) : (
              dealsProducts.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/4 xl:basis-1/5 2xl:basis-1/6 "
                >
                  <ProductCard {...p} />
                </CarouselItem>
              ))
            )}
          </CarouselContent>
          <div className="absolute -top-8 left-10 flex gap-2 p-2 z-10">
            <CarouselNext className=" border-current static h-10 w-10 rounded-full hover:bg-gray-200  flex items-center justify-center transition" />
            <CarouselPrevious className=" border-current static h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}
