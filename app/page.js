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
import { useGetProductsQuery } from "@/features/products/productsSlice";

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
    </div>
  );
}

// "use client"; // مهم في app directory

// import React, { useState, useEffect } from "react";
// import ProductCard from "@/components/ProductCard";
// import { Herobar } from "@/components/layout/Herobar";
// import { Offers } from "@/components/layout/Offers";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";

// // استيراد API functions
// import { productsAPI } from "@/lib/api/products";

// // مكون Loading
// const LoadingSpinner = () => (
//   <div className="flex justify-center items-center py-10">
//     <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
//     <span className="ml-2">جاري التحميل...</span>
//   </div>
// );

// // مكون خطأ
// const ErrorMessage = ({ message, onRetry }) => (
//   <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
//     <p>{message}</p>
//     {onRetry && (
//       <button
//         onClick={onRetry}
//         className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//       >
//         إعادة المحاولة
//       </button>
//     )}
//   </div>
// );

// // مكون Carousel للمنتجات
// const ProductCarousel = ({ products, title, loading }) => (
//   <section className="mb-12">
//     <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

//     {loading ? (
//       <LoadingSpinner />
//     ) : !products || products.length === 0 ? (
//       <p className="text-center text-gray-500">لا توجد منتجات متاحة</p>
//     ) : (
//       <div className="w-full max-w-8xl mx-auto" dir="rtl">
//         <Carousel
//           opts={{ align: "start", direction: "rtl", loop: false }}
//           className="w-[1500px] relative"
//         >
//           <CarouselContent className="w-full mx-10">
//             {products.map((product) => (
//               <CarouselItem
//                 key={product.id}
//                 className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/6"
//               >
//                 <ProductCard {...product} />
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <div className="absolute -top-8 left-10 flex gap-2 p-2 z-10">
//             <CarouselNext className="border-current static h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
//             <CarouselPrevious className="border-current static h-10 w-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
//           </div>
//         </Carousel>
//       </div>
//     )}
//   </section>
// );

// export default function Home() {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [newProducts, setNewProducts] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);
//   const [dealsProducts, setDealsProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // تحميل البيانات عند تحميل الصفحة
//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);
//         setError(null);

//         const [featured, newItems, topItems, deals] = await Promise.all([
//           productsAPI.getProducts({ featured: true, limit: 20 }),
//           productsAPI.getNewProducts(),
//           productsAPI.getTopProducts(),
//           productsAPI.getDealsProducts(),
//         ]);

//         setFeaturedProducts(featured.products || []); // ✅ تأكد أنها مصفوفة
//         setNewProducts(newItems.products || []);
//         setTopProducts(topItems.products || []);
//         setDealsProducts(deals.products || []);
//       } catch (err) {
//         console.error("Error fetching data:", err);
//         setError(err.response?.data?.message || "حدث خطأ في تحميل البيانات");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchAllData();
//   }, []);

//   const handleRetry = () => {
//     setError(null);
//     window.location.reload();
//   };

//   // بيانات العروض
//   const offerItems = [
//     {
//       src: `/images/brands/cantabria-labs.png`,
//       href: "/brands/cantabria-labs",
//     },
//     { src: `/images/brands/adidas.png`, href: "/brands/adidas" },
//     {
//       src: `/images/brands/cantabria-labs.png`,
//       href: "/brands/cantabria-labs",
//     },
//   ];

//   return (
//     <div className="">
//       <Herobar imges="images/95.png" className="h-[450px] m-2 rounded" />

//       {/* Hero Section */}
//       <section className="text-center mb-10">
//         <h1 className="text-4xl font-bold mb-4 pt-10">متجر العطور الفاخر</h1>
//         <p className="text-gray-600">اكتشف أروع وأفخم العطور من حول العالم</p>
//       </section>

//       {error && <ErrorMessage message={error} onRetry={handleRetry} />}

//       {/* منتجات */}
//       <ProductCarousel
//         products={featuredProducts}
//         title="المنتجات المميزة"
//         loading={loading}
//       />
//       <ProductCarousel
//         products={newProducts}
//         title="أحدث المنتجات"
//         loading={loading}
//       />
//       <ProductCarousel
//         products={topProducts}
//         title="الأكثر مبيعاً"
//         loading={loading}
//       />
//       <ProductCarousel
//         products={dealsProducts}
//         title="العروض الخاصة"
//         loading={loading}
//       />

//       {/* العروض */}
//       <Offers items={offerItems} />
//     </div>
//   );
// }
