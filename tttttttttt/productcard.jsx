"use client";

import React from "react";
import "@emran-alhaddad/saudi-riyal-font/index.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useGetBrandByIdQuery } from "@/features/brands/brandsSlice";

// import { useCart } from "@/lib/CartContext";

// import { toast } from "react-hot-toast"; // اختياري للإشعارات
import Link from "next/link";

export default function ProductCard({
  id,
  category,
  brand,
  image,
  description,
  name,
  final_price,
  price,
}) {
  // const { addToCart } = useCart();

  const product = {
    id,
    image,
    name,
    description,
    price,
  };
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!product || !product.id) {
      console.error("🚨 المنتج غير صحيح:", product);
      return;
    }

    const productToAdd = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image:
        product.image && product.image.length > 0
          ? product.image[0]
          : "/images/placeholder.png",
    };
    addToCart({
      ...product, // ينسخ id, title, description, price, images
      quantity: 1,
    });
    // إشعار للمستخدم (اختياري)
    // toast.success(`تم إضافة ${product.name} إلى السلة`);

    // أو يمكنك استخدام alert بسيط
    alert(`تم إضافة ${product.name} إلى السلة`);
  };
  return (
    <Card className="w-60 relative overflow-hidden rounded-xl p-3 mt-2 mb-5">
      {/* أيقونة المفضلة */}
      <Link href={`/products/${id}`}>
        <button className="absolute top-3 right-3 text-gray-400 hover:text-red-500">
          <Heart className="w-5 h-5" />
        </button>

        {/* صورة المنتج */}
        <div className="flex justify-center">
          <img
            src={image}
            // src={image && image.length > 0 ? image[0] : "/images/no_image.jpg"}
            alt={name}
            className="h-44 w-full object-cover"
          />
        </div>
      </Link>

      <CardContent className="p-0 mt-3 space-y-2">
        {/* التقييم */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Star className="w-4 h-4 fill-yellow-500" />
          <span>5.0</span>
          <span className="text-gray-400 text-xs">(0)</span>
        </div>

        {/* اسم البراند */}
        <p className="font-semibold text-sm">{brand}</p>

        {/* وصف المنتج */}
        <p className="text-xs text-gray-500">{name}</p>

        {/* السعر + زر الإضافة */}
        <div className="flex justify-between items-center mt-2">
          {/* <span className="font-bold text-lg text-red-500">
            {parseFloat(final_price).toString()}
            <span class="icon-saudi_riyal"></span>
          </span>
          <span className="text-gray-400 line-through text-lg pl-15">
            <span class="icon-saudi_riyal">{price}</span>
          </span> */}
          <span
            className={`font-bold text-lg ${
              parseFloat(final_price) === parseFloat(price)
                ? "text-black"
                : "text-red-500"
            }`}
          >
            <span className="icon-saudi_riyal"></span>
            {parseFloat(final_price).toString()}
          </span>

          {/* السعر الأصلي يظهر دائمًا */}
          <span
            className={`text-lg pl-10  ${
              parseFloat(final_price) === parseFloat(price)
                ? "hidden"
                : "text-gray-400 line-through"
            }`}
          >
            <span className="icon-saudi_riyal"></span>
            {parseFloat(price).toString()}
          </span>

          <Button
            size="icon"
            className="rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5 text-gray-700" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
