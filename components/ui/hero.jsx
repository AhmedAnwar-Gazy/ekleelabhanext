// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1509339022327-1e1e25360a20?w=1200",
    title: "عطور فاخرة",
    subtitle: "اكتشف روائح مميزة تأسر حواسك",
  },
  {
    image: "https://images.unsplash.com/photo-1508830524289-0adcbe822b40?w=1200",
    title: "تشكيلة جديدة",
    subtitle: "عطور موسمية لذوق رفيع",
  },
  {
    image: "https://images.unsplash.com/photo-1517685352821-92cf88aee5a5?w=1200",
    title: "خصومات حصرية",
    subtitle: "استمتع بأفضل الأسعار على الماركات العالمية",
  },
];

export function Hero() {
  const [current, setCurrent] = useState(0);

  // تغيير الصورة تلقائيًا كل 5 ثوانٍ
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className=" mt-2 relative w-full h-[500px] overflow-hidden rounded-xl shadow-lg">
      {/* الصورة */}
      <img
        src={slides[current].image}
        alt={slides[current].title}
        className="absolute w-full h-full object-cover transition-all duration-700"
      />

      {/* التغطية الداكنة */}
      <div className="absolute inset-0 bg-black/50" />

      {/* النص */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6">
        <h1 className="text-4xl font-bold mb-4">{slides[current].title}</h1>
        <p className="text-lg mb-6">{slides[current].subtitle}</p>
        <Button variant="secondary" size="lg">
          تسوق الآن
        </Button>
      </div>

      {/* أزرار التنقل */}
      <div className="absolute inset-0 flex items-center justify-between px-4">
        <Button variant="outline" onClick={prevSlide}>
          ◀
        </Button>
        <Button variant="outline" onClick={nextSlide}>
          ▶
        </Button>
      </div>
    </div>
  );
}
