"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function MinCard() {
  return (
    <div className="flex justify-center items-center  ">
      <Card className="w-50 h-50  hover:shadow-xl  cursor-pointer bg-neutral-50">
        <CardContent className="p-6 flex flex-col items-center justify-center h-full">
          {/* الدائرة الخلفية */}
          <div className="relative mb-4">
            <div className="w-32 h-32 bg-gradient-to-br from-pink-50 to-purple-50 rounded-full flex items-center justify-center shadow-inner">
              {/* أيقونة مجفف الشعر */}
              <div className="relative">
                {/* جسم المجفف */}
                <div className="w-12 h-8 bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg relative">
                  {/* المقدمة */}
                  <div className="absolute -right-2 top-1 w-8 h-6 bg-gradient-to-r from-pink-300 to-pink-400 rounded-r-full"></div>
                  {/* المقبض */}
                  <div className="absolute -bottom-6 left-2 w-8 h-6 bg-gradient-to-b from-pink-200 to-pink-300 rounded-b-lg"></div>
                  {/* السلك */}
                  <div className="absolute -bottom-12 left-4 w-1 h-6 bg-gray-400 rounded"></div>
                </div>

                {/* تأثير الهواء */}
                <div className="absolute -right-8 top-2 opacity-30">
                  <div className="w-1 h-1 bg-blue-300 rounded-full animate-pulse"></div>
                  <div
                    className="w-1 h-1 bg-blue-300 rounded-full mt-1 ml-2 animate-pulse"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-1 h-1 bg-blue-300 rounded-full mt-1 animate-pulse"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* النص */}
          <h3 className="text-lg font-semibold text-gray-800 text-center">
            عناية بالشعر
          </h3>
        </CardContent>
      </Card>
    </div>
  );
}
