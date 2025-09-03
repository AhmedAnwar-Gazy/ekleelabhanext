"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { brands } from "@/data/brands";

const BrandsPage = () => {
  const [selectedLetter, setSelectedLetter] = useState("A");


  // الحروف الأبجدية
  const alphabetLetters = [
    "#",
    "V",
    "U",
    "T",
    "S",
    "R",
    "Q",
    "P",
    "O",
    "N",
    "M",
    "L",
    "K",
    "J",
    "I",
    "H",
    "G",
    "F",
    "E",
    "D",
    "C",
    "B",
    "A",
  ];

  // const alphabetLetters = ["C", "B", "A"];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* العنوان */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">الماركات</h1>

        {/* شريط الحروف */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {alphabetLetters.map((letter) => (
            <button
              key={letter}
              onClick={() => brands[letter] && setSelectedLetter(letter)}
              className={`text-lg font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                letter === selectedLetter
                  ? "text-red-600 bg-red-50 font-bold"
                  : brands[letter]
                  ? "text-gray-600 hover:text-gray-800 hover:bg-gray-100 cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              disabled={!brands[letter]}
            >
              {letter}
            </button>
          ))}
        </div>
      </div>

      {/* الماركات */}
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-8">
          <h2 className="text-6xl font-bold text-gray-300">{selectedLetter}</h2>
        </div>

        {brands[selectedLetter] && (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {brands[selectedLetter].map((brand, index) => (
              <Link key={index} href={`/brands/${brand.slug}`}>
                <Card className="hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 hover:border-red-200 group">
                  <CardContent className="p-6 flex items-center justify-center min-h-[120px]">
                    <div className="text-center">
                      <div className="font-semibold text-sm text-gray-800 leading-tight group-hover:text-red-600 transition-colors duration-200">
                        {brand.name}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandsPage;
