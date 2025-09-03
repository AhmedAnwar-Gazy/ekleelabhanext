// src/app/not-found.jsx
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <main className="flex-grow flex items-center justify-center py-12 pr-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 text-center md:text-right mb-10 md:mb-0">
          <h1 className="text-8xl font-bold text-red-700 mb-4">404</h1>
          <h2 className="text-4xl font-semibold text-gray-800 mb-6">
            عذراً، لم نتمكن من العثور على الصفحة
          </h2>
          <p className="text-gray-600 text-lg mb-8">
            يبدو أن الصفحة التي تبحث عنها غير موجودة. ربما تم نقلها أو حذفها.
          </p>
          <div className="flex flex-col sm:flex-row justify-center md:justify-start space-y-4 sm:space-y-0 sm:space-x-4 rtl:space-x-reverse">
            <Link
              href="/"
              className="bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-full transition duration-300 flex items-center justify-center"
            >
              <i className="fas fa-home ml-2"></i>
              العودة إلى الرئيسية
            </Link>
            <Link
              href="/"
              className="border border-black text-neutral-700 hover:bg-neutral-50 px-6 py-3 rounded-full transition duration-300 flex items-center justify-center"
            >
              <i className="fas fa-search ml-2"></i>
              تصفح المنتجات
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative">
            <div className="perfume-bottle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="300"
                height="400"
                viewBox="0 0 300 400"
              >
                <path
                  d="M150 50 C100 50 70 120 70 200 L70 350 C70 370 90 390 110 390 L190 390 C210 390 230 370 230 350 L230 200 C230 120 200 50 150 50 Z"
                  fill="#D1C1A7"
                />
                <rect
                  x="130"
                  y="30"
                  width="40"
                  height="20"
                  rx="5"
                  fill="#B08D57"
                />
                <path
                  d="M150 70 C110 70 90 130 90 200 L90 280 C90 300 110 320 130 320 L170 320 C190 320 210 300 210 280 L210 200 C210 130 190 70 150 70 Z"
                  fill="#F3E5AB"
                />
                <circle cx="130" cy="150" r="5" fill="white" opacity="0.7" />
                <circle cx="170" cy="180" r="7" fill="white" opacity="0.7" />
                <circle cx="150" cy="220" r="6" fill="white" opacity="0.7" />
                <circle cx="190" cy="240" r="4" fill="white" opacity="0.7" />
                <circle cx="120" cy="260" r="5" fill="white" opacity="0.7" />
              </svg>
            </div>
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-60">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <path
                  d="M50 0 Q 60 20 40 40 Q 60 60 40 80 Q 55 90 50 100"
                  stroke="#D1C1A7"
                  fill="none"
                  strokeWidth="2"
                  className="opacity-50"
                />
                <path
                  d="M30 10 Q 40 30 20 50 Q 40 70 20 90 Q 35 95 30 100"
                  stroke="#D1C1A7"
                  fill="none"
                  strokeWidth="2"
                  className="opacity-30"
                />
                <path
                  d="M70 10 Q 80 30 60 50 Q 80 70 60 90 Q 75 95 70 100"
                  stroke="#D1C1A7"
                  fill="none"
                  strokeWidth="2"
                  className="opacity-30"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
