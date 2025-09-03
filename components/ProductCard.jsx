"use client";

import React from "react";
import "@emran-alhaddad/saudi-riyal-font/index.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";

// import { toast } from "react-hot-toast"; // اختياري للإشعارات
import Link from "next/link";

export default function ProductCard({
  id,
  category,
  brand,
  images,
  description,
  title,
  oldprice,
  price,
}) {
  const { addToCart } = useCart();

  const product = {
    id,
    images,
    title,
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
      title: product.title,
      description: product.description,
      price: product.price,
      image:
        product.images && product.images.length > 0
          ? product.images[0]
          : "/images/placeholder.png",
    };
    addToCart({
      ...product, // ينسخ id, title, description, price, images
      quantity: 1,
    });
    // إشعار للمستخدم (اختياري)
    // toast.success(`تم إضافة ${product.name} إلى السلة`);

    // أو يمكنك استخدام alert بسيط
    alert(`تم إضافة ${product.title} إلى السلة`);
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
            src={images && images.length > 0 ? images[0] : "/images/2.png"}
            alt={title}
            className="h-44 w-full object-cover"
          />
        </div>
      </Link>

      <CardContent className="p-0 mt-3 space-y-2">
        {/* التقييم */}
        <div className="flex items-center gap-1 text-yellow-500 text-sm">
          <Star className="w-4 h-4 fill-yellow-500" />
          <span>5.0</span>
          <span className="text-gray-400 text-xs">(145)</span>
        </div>

        {/* اسم البراند */}
        <p className="font-semibold text-sm">{brand}</p>

        {/* وصف المنتج */}
        <p className="text-xs text-gray-500">{description}</p>

        {/* السعر + زر الإضافة */}
        <div className="flex justify-between items-center mt-2">
          <span className="font-bold text-lg text-red-500">
            {price} <span class="icon-saudi_riyal"></span>
          </span>
          <span className="text-gray-400 line-through text-lg pl-15">
            <span class="icon-saudi_riyal">{oldprice}</span>
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

// "use client";

// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Star, Heart, ShoppingCart } from "lucide-react";
// import { useCart } from "@/lib/CartContext";
// // import { toast } from "react-hot-toast"; // اختياري للإشعارات
// import Link from "next/link";

// export default function ProductCard({ product }) {
//   console.log(product.id, product.title);
//   if (!product) return null; // يحمي من undefined

//   const { addToCart } = useCart();

//   let id_ = product.id;

//   const handleAddToCart = (e) => {
//     // منع انتشار الحدث إلى Link
//     e.preventDefault();
//     e.stopPropagation();

//     // التأكد من وجود البيانات المطلوبة قبل الإضافة
//     const productToAdd = {
//       id: product.id,
//       title: product.title,
//       description: product.description,
//       price: product.price,
//       image:
//         product.images && product.images.length > 0
//           ? product.images[0]
//           : "/images/2.png",
//     };

//     addToCart(productToAdd);

//     // إشعار للمستخدم
//     // toast.success(`تم إضافة ${product.title} إلى السلة`);
//     alert(`تم إضافة ${id_} إلى السلة`);
//   };

//   const handleHeartClick = (e) => {
//     // منع انتشار الحدث إلى Link
//     e.preventDefault();
//     e.stopPropagation();

//     // هنا يمكنك إضافة منطق المفضلة
//     console.log("تم إضافة إلى المفضلة:", product.title);
//   };

//   return (
//     <Card className="w-64 relative overflow-hidden shadow-md rounded-xl p-3 mt-2 mb-5 hover:shadow-lg transition-shadow duration-300">
//       {/* رابط لصفحة تفاصيل المنتج - تم إصلاح المشكلة هنا */}
//       <Link href={`/products/${id_}`} className="block">
//         {/* أيقونة المفضلة */}
//         <button
//           className="absolute top-3 right-3 text-gray-400 hover:text-red-500 z-10 bg-white rounded-full p-1 shadow-sm"
//           onClick={handleHeartClick}
//         >
//           <Heart className="w-5 h-5" />
//         </button>

//         {/* صورة المنتج */}
//         <div className="flex justify-center">
//           <img
//             src={
//               product.images && product.images.length > 0
//                 ? product.images[0]
//                 : "/images/2.png"
//             }
//             alt={product.title}
//             className="h-44 w-full object-cover rounded-lg"
//           />
//         </div>
//       </Link>

//       <CardContent className="p-0 mt-3 space-y-2">
//         {/* التقييم */}
//         <div className="flex items-center gap-1 text-yellow-500 text-sm">
//           <Star className="w-4 h-4 fill-yellow-500" />
//           <span>{product.rating || "5.0"}</span>
//           <span className="text-gray-400 text-xs">
//             ({product.reviewCount || "145"})
//           </span>
//         </div>

//         {/* اسم البراند */}
//         <p className="font-semibold text-sm">{product.brand || "Flormar"}</p>

//         {/* وصف المنتج */}
//         <p className="text-xs text-gray-500 line-clamp-2">
//           {product.description || product.title}
//         </p>

//         {/* السعر + زر الإضافة */}
//         <div className="flex justify-between items-center mt-2">
//           <div className="flex items-center gap-2">
//             <span className="font-bold text-lg text-red-500">
//               {product.price} ﷼
//             </span>
//             {product.originalPrice && (
//               <span className="text-gray-400 line-through text-sm">
//                 {product.originalPrice} ﷼
//               </span>
//             )}
//           </div>

//           <Button
//             size="icon"
//             className="rounded-full bg-gray-100 hover:bg-gray-200 hover:scale-105 transition-all duration-200"
//             onClick={handleAddToCart}
//           >
//             <ShoppingCart className="w-5 h-5 text-gray-700" />
//           </Button>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
