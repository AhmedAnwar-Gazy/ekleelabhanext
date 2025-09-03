"use client";

import { useState } from "react";
import { CATEGORIES, products } from "@/data/products";

import ProductCard from "@/components/ProductCard";
import PopularityDropdown from "@/components/layout/PopularityDropdown";
import SwitcherPages from "@/components/layout/SwitcherPages";
import FilterSidebar from "@/components/layout/FilterSidebar";
import { Herobar } from "@/components/layout/Herobar";

export default function Make_up() {
  const [limit, setLimit] = useState(20);

  const makeupProducts = products.filter(
    (product) => product.category === CATEGORIES.MAKEUP
  );
  const itemsPerPage = 10; // كم منتج بالصفحة
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = makeupProducts.slice(startIndex, endIndex);

  return (
    <div>
      <Herobar className="h-[200px]" imges="/images/Prfumes.jpg" />

      <div className="pt-10 pr-5 flex ">
        <FilterSidebar />

        <div className=" ">
          {/* <div className="flex items-center justify-around  pr-10 bg-black ">

            <div>
              <h1 className="text-xl font-semibold bg-white">العطور</h1>
              <span className="font-semibold text-gray-800">
                {makeupProducts.length} منتج متوفر
              </span>
            </div>
            <div className="flex justify-start w-[70%] ">
              <PopularityDropdown />
            </div>
          </div> */}
          <div>
            <div class="flex justify-between items-center p-4 rounded-lg">
              <div class="text-right pr-4">
                <h1 class="text-xl font-semibold inline-block px-2 py-1 rounded">
                  المكياج
                </h1>
                <span class="font-semibold text-gray-300 block mt-1">
                  {makeupProducts.length} منتج متوفر
                </span>
              </div>
              <div class="text-left">
                <div class=" text-white px-4 py-2 rounded">
                  <PopularityDropdown />
                </div>
              </div>
            </div>
          </div>
          <section className="flex gap-3 flex-wrap justify-center px-1 ">
            {currentItems.map((p) => (
              <ProductCard key={p.id} {...p} />
            ))}
          </section>
        </div>
      </div>
      <SwitcherPages
        totalItems={makeupProducts.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
