"use client";

import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";

const LocationSheet = () => {
  const [selectedCity, setSelectedCity] = useState("الرياض"); // المدينة الافتراضية

  const cities = ["الرياض", "جدة", "الدمام", "مكة المكرمة", "المدينة المنورة"];

  const handleSelectCity = (city) => {
    setSelectedCity(city);
    // يمكنك هنا حفظ المدينة في localStorage أو إرسالها إلى السيرفر لاحقًا
    console.log("تم اختيار المدينة:", city);
  };

  return (
    <Sheet>
      {/* <SheetTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="gap-1 rounded-full px-2 sm:px-3 hover:bg-gray-100"
        >
          <MapPin className="h-4 w-4 text-black" />
          <span className="hidden sm:inline text-black">
            التوصيل: {selectedCity}
          </span>
        </Button>
      </SheetTrigger> */}
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className=" bg-transparent rounded-full gap-1 px-20 "
        >
          <MapPin className="h-4 w-4 text-black" />
          <span className="hidden sm:inline text-black">
            التوصيل: {selectedCity}
          </span>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-[90vw] sm:w-[400px] md:w-[500px] p-4 sm:p-6 flex flex-col"
      >
        <SheetHeader>
          <SheetTitle className="text-lg font-semibold">
            اختر موقع التوصيل
          </SheetTitle>
        </SheetHeader>

        {/* خريطة Google Maps */}
        <div className="mt-4 w-full h-64 sm:h-80 rounded-lg overflow-hidden border border-border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.137282162715!2d46.67529621544409!3d24.713551984126468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03875a0d12c9%3A0x73b90c7c82aefb8!2z2KfZhNmF2YjYudmK2Kkg2KfZhNmF2LPYqNmK2Kkg2KfZhNmF2YjYudmK2Kkg2YXYr9mK2YjZhNin2Kog2KfZhNi62LHYqNix2Yog2YXYpNiz2YrYqQ!5e0!3m2!1sar!2ssa!4v1692280012345!5m2!1sar!2ssa"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="خريطة مواقع التوصيل"
            className="rounded-md"
          />
        </div>

        {/* قائمة المدن */}
        <div className="mt-6 space-y-2 flex-1">
          <p className="text-sm text-muted-foreground mb-2">المدن المتاحة:</p>
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => handleSelectCity(city)}
              className={`w-full py-3 text-center rounded-lg border transition-colors duration-200 ${
                selectedCity === city
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background hover:bg-accent border-border"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LocationSheet;
