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

import { products } from "@/data/products";
// import { Offersdata } from "@/data/offers";
import { brands } from "@/data/brands";
const slugsToShow = [
  "adrienne-vittadini",
  "adidas",
  "chanel",
  "cantabria-labs",
];

// 1️⃣ اجمع كل الماركات في مصفوفة واحدة
const allBrands = Object.values(brands).flat();

// 2️⃣ اعثر على الماركات المطلوبة
const foundBrands = allBrands.filter((b) => slugsToShow.includes(b.slug));

// 3️⃣ أنشئ items لـ <Offers />
// const dynamicItems = foundBrands.map((b, index) => ({
//   src: `/images/brands/${b.slug}.png`, // أو أي صورة خاصة بالماركة
//   href: `/brands/${b.slug}`,
// }));

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

// import Hero from "@/components/ui/Hero";

export default function Home() {
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
          className="w-[1500px] relative "
        >
          <CarouselContent className="w-full mx-10">
            {products.slice(0, 20).map((p) => (
              <CarouselItem
                key={p.id}
                className=" basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/6"
              >
                <ProductCard {...p} />
              </CarouselItem>
            ))}
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
    </div>
  );
}
