// "use client";

// import { useState ,useMemo } from "react";
// import { CATEGORIES, products } from "@/data/products";

// import ProductCard from "@/components/ProductCard";
// import PopularityDropdown from "@/components/layout/PopularityDropdown";
// import SwitcherPages from "@/components/layout/SwitcherPages";
// import FilterSidebar from "@/components/layout/FilterSidebar";
// import { Hero } from "@/components/ui/hero";
// import { Herobar } from "@/components/layout/Herobar";

// export default function Prfumes() {
//   // const [limit, setLimit] = useState(20);

//   // const makeupProducts = products.filter(
//   //   (product) => product.category === CATEGORIES.PERFUMES
//   // );
//   // const itemsPerPage = 10; // كم منتج بالصفحة
//   // const [currentPage, setCurrentPage] = useState(1);

//   // const startIndex = (currentPage - 1) * itemsPerPage;
//   // const endIndex = startIndex + itemsPerPage;
//   // const currentItems = makeupProducts.slice(startIndex, endIndex);

//   const [limit, setLimit] = useState(20);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Filter states
//   const [selectedBrands, setSelectedBrands] = useState([]);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

//   const itemsPerPage = 10;

//   // Get all perfumes
//   const perfumeProducts = products.filter(
//     (product) => product.category === CATEGORIES.PERFUMES
//   );

//   // Apply filters
//   const filteredProducts = useMemo(() => {
//     return perfumeProducts.filter((product) => {
//       // Brand filter
//       if (
//         selectedBrands.length > 0 &&
//         !selectedBrands.includes(product.brand)
//       ) {
//         return false;
//       }

//       // Price filter
//       if (product.price < priceRange.min || product.price > priceRange.max) {
//         return false;
//       }

//       // Category filter (if you want to add subcategories later)
//       if (
//         selectedCategories.length > 0 &&
//         !selectedCategories.includes(product.category)
//       ) {
//         return false;
//       }

//       return true;
//     });
//   }, [perfumeProducts, selectedBrands, selectedCategories, priceRange]);

//   // Pagination
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = startIndex + itemsPerPage;
//   const currentItems = filteredProducts.slice(startIndex, endIndex);

//   // Reset page when filters change
//   React.useEffect(() => {
//     setCurrentPage(1);
//   }, [selectedBrands, selectedCategories, priceRange]);

//   // Get unique brands from perfume products
//   const availableBrands = useMemo(() => {
//     const brands = [...new Set(perfumeProducts.map((p) => p.brand))];
//     return brands.filter(Boolean).sort();
//   }, [perfumeProducts]);

//   const handleFilterChange = (filters) => {
//     setSelectedBrands(filters.brands || []);
//     setSelectedCategories(filters.categories || []);
//     setPriceRange(filters.priceRange || { min: 0, max: 1000 });
//   };

//   const clearFilters = () => {
//     setSelectedBrands([]);
//     setSelectedCategories([]);
//     setPriceRange({ min: 0, max: 1000 });
//   };

//   return (
//     <div>
//       {/* <Herobar imges="/images/Prfumes.jpg" /> */}
//       <div className="pt-10 pr-5  flex ">
//         <FilterSidebar
//           availableBrands={availableBrands}
//           selectedBrands={selectedBrands}
//           onBrandChange={setSelectedBrands}
//           onFiltersChange={handleFilterChange}
//           onClearFilters={clearFilters}
//         />

//         <div className=" ">
//           {/* <div className="flex items-center justify-around  pr-10 bg-black ">

//             <div>
//               <h1 className="text-xl font-semibold bg-white">العطور</h1>
//               <span className="font-semibold text-gray-800">
//                 {makeupProducts.length} منتج متوفر
//               </span>
//             </div>
//             <div className="flex justify-start w-[70%] ">
//               <PopularityDropdown />
//             </div>
//           </div> */}
//           <div className="w-full max-w-[100%] mx-auto">
//             <div className="flex justify-between items-center p-4 rounded-lg">
//               <div className="text-right pr-4">
//                 <h1 className="text-xl font-semibold inline-block px-2 py-1 rounded">
//                   العطور
//                 </h1>
//                 <span className="font-semibold text-gray-300 block mt-1">
//                   {makeupProducts.length} منتج متوفر
//                 </span>
//               </div>
//               <div className="text-left">
//                 <div className=" text-white  py-2 rounded">
//                   <PopularityDropdown />
//                 </div>
//               </div>
//             </div>
//           </div>
//           <section className="flex gap-3 flex-wrap justify-center  px-1 ">
//             {currentItems.map((p) => (
//               <ProductCard key={p.id} {...p} />
//             ))}
//           </section>
//         </div>
//       </div>
//       <SwitcherPages
//         totalItems={makeupProducts.length}
//         itemsPerPage={itemsPerPage}
//         currentPage={currentPage}
//         onPageChange={setCurrentPage}
//       />
//     </div>
//   );
// }


