"use client";

import React, { useState, useRef } from "react";
import { Heart, Star, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import ProductTabs from "@/components/layout/ProductTabs";
import ProductCard from "@/components/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useParams } from "next/navigation";

// import { products } from "@/data/products";
import {
  useGetProductByIdQuery,
  useGetRelatedProductsQuery,
} from "@/features/products/productsSlice";

import { Breadcrumbs } from "@/components/layout/Breadcrumbs";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  //zoom
  const [zoom, setZoom] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [magnifierBackgroundPosition, setMagnifierBackgroundPosition] =
    useState({ x: 0, y: 0 });

  // Handle mouse move for magnification
  const mainImageRef = useRef(null);
  const [isMagnifying, setIsMagnifying] = useState(false);

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;

    const rect = mainImageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update magnifier position
    setMagnifierPosition({ x, y });

    // Calculate background position for magnification (2x zoom)
    const bgX = (x / rect.width) * 200;
    const bgY = (y / rect.height) * 200;
    setMagnifierBackgroundPosition({ x: bgX, y: bgY });
  };
  const handleMouseEnter = () => {
    setZoom(true);
  };

  const handleMouseLeave = () => {
    setZoom(false);
  };

  //product
  const params = useParams();
  const id = params.id;
  // const { data: products, isLoading, isError } = useGetProductByIdQuery(id);

  // // جلب المنتج
  // const {
  //   data: products,
  //   isLoading: productLoading,
  //   isError: productError,
  // } = useGetProductByIdQuery(id);

  // // حالات التحميل/الخطأ
  // if (productLoading) return <p>جارٍ تحميل المنتج...</p>;
  // if (productError) return <p>حدث خطأ في جلب المنتج</p>;
  // if (!products) return <p>لم يتم العثور على المنتج</p>;
  // if (productLoading) return <p>جاري التحميل...</p>;
  // if (isError) return <p>حدث خطأ في جلب المنتج</p>;
  // if (!products) return <p>المنتج غير موجود</p>;
  // const product = products.find((p) => p.id === Number(id));
  // if (!product) return <p>المنتج غير موجود</p>;
  // if (!product) return <p>المنتج غير موجود</p>;

  // جلب المنتجات المقترحة بنفس الفئة
  // const relatedProducts = products
  //   .filter((p) => p.category === product.category && p.id !== product.id)
  //   .slice(0, 15);
  // const productImages = [
  //   "/api/placeholder/400/400",
  //   "/api/placeholder/400/400",
  // ];

  // const thumbnails = ["/api/placeholder/80/80", "/api/placeholder/80/80"];

  // المنتج الرئيسي
  const { data: products, isLoading: productLoading } =
    useGetProductByIdQuery(id);

  // المنتجات المقترحة (related)
  const { data: relatedData, isLoading: relatedLoading } =
    useGetRelatedProductsQuery(id);

  if (productLoading) return <p>جارٍ تحميل المنتج...</p>;
  if (!products) return <p>لم يتم العثور على المنتج</p>;

  const relatedProducts = relatedData?.ids?.map(
    (productId) => relatedData.entities[productId]
  );

  return (
    <div className="bg-neutral-50 py-5">
      <div className=" pr-7 pt-5">
        <Breadcrumbs />
      </div>
      <div className="max-w-7xl mx-auto p-6 bg-white" dir="rtl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images Section */}
          <div className="space-y-4">
            {/* Main Product Image */}
            <div className="relative">
              <div
                className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                ref={mainImageRef}
              >
                <img
                  src={products.image}
                  alt={products.name}
                  className="w-full h-full object-cover"
                />
                {/* Magnifier Lens */}
                {isMagnifying && (
                  <div
                    className="absolute w-40 h-40 rounded-full border-2 border-white shadow-xl pointer-events-none"
                    style={{
                      left: magnifierPosition.x - 80,
                      top: magnifierPosition.y - 80,
                      // backgroundImage: `url(${products.images[selectedImageIndex]})`,
                      backgroundSize: "200%",
                      backgroundPosition: `${magnifierBackgroundPosition.x}% ${magnifierBackgroundPosition.y}%`,
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                )}
                {/* Magnified View */}
                {isMagnifying && (
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      // backgroundImage: `url(${products.images[selectedImageIndex]})`,
                      backgroundSize: "200%",
                      backgroundPosition: `${magnifierBackgroundPosition.x}% ${magnifierBackgroundPosition.y}%`,
                      backgroundRepeat: "no-repeat",
                      opacity: 0.8,
                    }}
                  />
                )}
              </div>
            </div>


            {/* Thumbnail Gallery */}
            {/* {products.images > 1 && (
              <div className="flex gap-3">
                {products.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => handleImageSelect(index)}
                    className={`w-16 h-16 bg-gray-100 rounded-md overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? "border-indigo-600"
                        : "border-transparent"
                    }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )} */}
          </div>

          {/* Product Details Section */}
          <div className="space-y-6">
            {/* Brand and Availability */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 text-sm">
                  أصل 100%
                </Badge>
                {/* <span className="text-sm text-gray-600">
                  أكثر هنا للمزيد من
                </span> */}
              </div>
            </div>{" "}
            <h2 className="text-xl font-bold  text-gray-800">
              {products.brand}
            </h2>
            {/* Rating */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsFavorite(!isFavorite)}
                className="p-0 h-auto w-auto"
              >
                <Heart
                  className={`h-5 w-5 ${
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                  }`}
                />
              </Button>

              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">(94) التقييمات</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">5</span>
              </div>
            </div>
            {/* Product Title */}
            <h1 className="text-xl font-medium text-gray-900 leading-relaxed">
              {products.name}
            </h1>
            {/* Price Section */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-gray-400 line-through text-lg">
                  <span class="icon-saudi_riyal">{products.oldprice}</span>
                </span>
                <Badge className="bg-red-100 text-red-600 text-sm">-67%</Badge>
              </div>
              <div className="text-3xl font-bold text-red-600">
                <span class="icon-saudi_riyal">{products.price}</span>
              </div>
              <p className="text-sm text-gray-500">شامل الضريبة</p>
            </div>
            {/* Product Description */}
            <div className="bg-pink-50 p-4 rounded-lg">
              <p className="text-gray-700 text-center">
                هذا المنتج لولا رول مانيستيل
              </p>
            </div>
            {/* Payment Options */}
            <div className="space-y-3">
              {/* <Card className="border border-teal-200">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-teal-100 text-teal-800 text-xs px-2 py-1">
                        tabby
                      </Badge>
                      <span className="text-sm text-gray-700">
                        قسم فاتورتك على{" "}
                        <span className="font-medium">4 دفعات</span> بدون فوائد.
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold">﷼6</div>
                      <ChevronLeft className="h-4 w-4 text-gray-400 inline" />
                    </div>
                  </div>
                </CardContent>
              </Card> */}

              <Card className="border border-orange-200">
                <CardContent className="">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Badge className="bg-orange-100 text-orange-800 text-xs px-2 py-1">
                        تمارا
                      </Badge>
                      <span className="text-sm text-gray-700">
                        قسم فاتورتك على{" "}
                        <span className="font-medium">4 دفعات</span> بدون فوائد.
                      </span>
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold">﷼6</div>
                      <ChevronLeft className="h-4 w-4 text-gray-400 inline" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Add to Cart Button */}
            <Button className="w-full bg-gray-800 hover:bg-gray-900 text-white py-6 text-lg font-medium rounded-lg">
              أضف للسلة
            </Button>
          </div>
        </div>
      </div>
      <ProductTabs />
      <div className="w-[1350px] max-w-8xl mx-auto " dir="rtl">
        <Carousel
          opts={{
            align: "start", // يبدأ من أول عنصر (لا يقطع العناصر)
            // containScroll: "trimSnaps", // يمنع ظهور سلايد فاضي في النهاية
            direction: "rtl", // لو موقعك عربي RTL. احذفها إن كان موقعك LTR
            loop: false, // اجعله true لو تبغى تدوير لا نهائي
          }}
          className=" relative "
        >
          <CarouselContent className="w-full mx-10">
            {relatedProducts?.map((related) => (
              <CarouselItem
                key={related.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/3 lg:basis-1/5"
              >
                {/* بدل div البسيط بكارت حقيقي */}
                <ProductCard {...related} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute top-45 left-5 right-5 flex justify-between w-[100%] gap-2 p-2 z-10">
            <CarouselNext className=" border-current static h-12 w-12 rounded-full hover:bg-gray-200  flex items-center justify-center transition" />
            <CarouselPrevious className=" border-current static h-12 w-12 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
          </div>
          {/* <CarouselPrevious />
          <CarouselNext /> */}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductDetails;
