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
} from "@/features/products/productsSlice";

// import { Offersdata } from "@/data/offers";
import { brands } from "@/data/brands";
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
  const { data, isLoading, isError } = useGetProductsQuery({
    limit: 20,
    page: 1,
  });
  const products = data?.ids?.map((id) => data.entities[id]) || [];

  // المنتجات الأكثر مبيعًا
  const {
    data: topData,
    isLoading: topLoading,
    isError: topError,
  } = useGetTopProductsQuery({ limit: 12 });
  const topProducts = topData?.ids?.map((id) => topData.entities[id]) || [];

  return (
    <div className="">
      <Herobar imges="images/95.png" className="h-[450px] m-2 rounded  " />
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 pt-10">متجر العطور الفاخر</h1>
        <p className="text-gray-600">اكتشف أروع وأفخم العطور من حول العالم</p>
      </section>
      <div className="w-full max-w-8xl mx-auto " dir="rtl">
        <Carousel
          opts={{
            align: "start", // يبدأ من أول عنصر (لا يقطع العناصر)
            // containScroll: "trimSnaps", // يمنع ظهور سلايد فاضي في النهاية
            direction: "rtl", // لو موقعك عربي RTL. احذفها إن كان موقعك LTR
            loop: false, // اجعله true لو تبغى تدوير لا نهائي
          }}
          className="w-full  relative "
        >
          <CarouselContent className="w-full mx-10">
            {isLoading ? (
              <SeketonCard />
            ) : isError ? (
              <p>حدث خطأ أثناء جلب المنتجات</p>
            ) : (
              products.map((p) => (
                <CarouselItem
                  key={p.id}
                  className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/6"
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
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>

      <Offers items={offerItems} />

      {/* الاكثر مبيعا  */}
      <Carousel
        opts={{ align: "start", direction: "rtl", loop: false }}
        className="w-full relative"
      >
        <CarouselContent className="w-full mx-10">
          {isLoading ? (
            <SeketonCard />
          ) : isError ? (
            <p>حدث خطأ أثناء جلب المنتجات</p>
          ) : (
            topProducts.map((p) => (
              <CarouselItem
                key={p.id}
                className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/6"
              >
                <ProductCard {...p} />
              </CarouselItem>
            ))
          )}
        </CarouselContent>
        <div className="absolute -top-8 left-10 flex gap-2 p-2 z-10">
          <CarouselNext className="border-current h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
          <CarouselPrevious className="border-current h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
        </div>
      </Carousel>
    </div>
  );
}
