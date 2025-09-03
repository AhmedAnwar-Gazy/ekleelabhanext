"use client";

import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error("حدث خطأ:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-red-50">
      <h2 className="text-2xl font-bold text-red-600">حدث خطأ غير متوقع</h2>
      <p className="mt-2 text-gray-700">{error?.message}</p>
      <button
        onClick={() => reset()}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
      >
        إعادة المحاولة
      </button>
    </div>
  );
}
