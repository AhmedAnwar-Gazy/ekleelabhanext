// components/OfferCard.jsx

import React, { useState } from "react";
import { Heart, ShoppingCart, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const OfferCard = ({
  id,
  name,
  description,
  originalPrice,
  discountedPrice,
  discountPercentage,
  image,
  brand,
  validUntil,
  offerType,
  tags = [],
}) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // حساب المدة المتبقية للعرض
  const getRemainingTime = (validUntil) => {
    const now = new Date();
    const endDate = new Date(validUntil);
    const diffTime = endDate - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "انتهى العرض";
    if (diffDays === 0) return "ينتهي اليوم";
    if (diffDays === 1) return "ينتهي غداً";
    return `${diffDays} يوم متبقي`;
  };

  const savings = originalPrice - discountedPrice;

  return (
    <div
      className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 w-[280px] overflow-hidden group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* صورة المنتج */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* شارة الخصم */}
        <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
          -{discountPercentage}%
        </div>

        {/* أيقونة المفضلة */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute top-3 left-3 p-2 rounded-full transition-all duration-200 ${
            isFavorite
              ? "bg-red-100 text-red-500"
              : "bg-white/80 text-gray-600 hover:bg-red-100 hover:text-red-500"
          }`}
        >
          <Heart size={16} className={isFavorite ? "fill-current" : ""} />
        </button>

        {/* التايمر */}
        <div className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
          <Clock size={12} />
          <span>{getRemainingTime(validUntil)}</span>
        </div>
      </div>

      {/* محتوى البطاقة */}
      <div className="p-4">
        {/* اسم البراند */}
        <div className="text-xs text-gray-500 mb-1 font-medium">{brand}</div>

        {/* اسم العرض */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
          {name}
        </h3>

        {/* الوصف */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{description}</p>

        {/* التاجز */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* الأسعار */}
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl font-bold text-green-600">
              {discountedPrice} ر.س
            </span>
            <span className="text-sm text-gray-500 line-through">
              {originalPrice} ر.س
            </span>
          </div>
          <div className="text-xs text-green-600 flex items-center gap-1">
            <Tag size={12} />
            <span>وفر {savings} ر.س</span>
          </div>
        </div>

        {/* أزرار العمل */}
        <div className="flex gap-2">
          <Button
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            onClick={() => console.log("إضافة للسلة:", id)}
          >
            <ShoppingCart size={16} />
            <span>أضف للسلة</span>
          </Button>

          <Button
            variant="outline"
            className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            onClick={() => console.log("عرض تفاصيل:", id)}
          >
            عرض
          </Button>
        </div>
      </div>

      {/* تأثير الهوفر */}
      {isHovered && (
        <div className="absolute inset-0 ring-2 ring-blue-200 rounded-xl pointer-events-none transition-all duration-300" />
      )}
    </div>
  );
};

export default OfferCard;
