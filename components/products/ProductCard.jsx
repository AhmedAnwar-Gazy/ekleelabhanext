// components/products/ProductCard.js
'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function ProductCard({ product, loading = false }) {
  if (!product) return null;

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/akalaabha.jpg';
    if (imagePath.startsWith('http')) return imagePath;
    return `https://ekleelabha.shop/image/${imagePath}`;
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div className={`group border rounded-lg overflow-hidden hover:shadow-lg transition-shadow ${loading ? 'opacity-50' : ''}`}>
        {/* Product Image */}
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={getImageUrl(product.main_image)}
            alt={product.name_en || product.name_ar || 'Product'}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          
          {/* Sale badge */}
          {product.on_sale && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
              SALE
            </div>
          )}

          {/* Out of stock overlay */}
          {product.quantity === 0 && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-white px-4 py-2 rounded text-sm font-semibold">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <p className="text-xs text-gray-500 mb-1 truncate">
              {product.categories[0]}
            </p>
          )}

          {/* Product Name */}
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
            {product.name_en || product.name_ar}
          </h3>

          {/* Arabic Name (if different) */}
          {product.name_ar && product.name_en !== product.name_ar && (
            <p className="text-xs text-gray-500 mb-2 line-clamp-1">
              {product.name_ar}
            </p>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            {product.final_price > 0 ? (
              <>
                <span className="text-lg font-bold text-blue-600">
                  ${product.final_price.toFixed(2)}
                </span>
                {product.price > product.final_price && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.price.toFixed(2)}
                  </span>
                )}
              </>
            ) : (
              <span className="text-sm text-gray-500">Contact for price</span>
            )}
          </div>

          {/* SKU */}
          {product.sku && (
            <p className="text-xs text-gray-400 mt-1">
              SKU: {product.sku}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}