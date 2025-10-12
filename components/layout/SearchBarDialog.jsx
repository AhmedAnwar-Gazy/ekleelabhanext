// import { SearchTop } from "./SearchBarDialog";
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import Link from "next/link";

// // ---------------- Search Dialog ----------------

// export default function SearchBarDialog({ open, onOpenChange }) {
//   return (
//     <CommandDialog
//       open={open}
//       onOpenChange={onOpenChange}
//       className="w-[100%] backdrop-blur-2xl"
//     >
//       <Command>
//         <CommandInput placeholder="ابحث عن عطر، ماركة، نوتة..." />
//         <CommandList>
//           <CommandEmpty>لا توجد نتائج.</CommandEmpty>
//           <CommandGroup heading="العطور">
//             <CommandItem>
//               <Link href="/perfumes?cat=oud">عود</Link>
//             </CommandItem>
//             <CommandItem>
//               <Link href="/perfumes?cat=fruity">فواكه</Link>
//             </CommandItem>
//             <CommandItem>
//               <Link href="/perfumes?cat=vanilla">فانيلا</Link>
//             </CommandItem>
//           </CommandGroup>
//         </CommandList>
//       </Command>
//     </CommandDialog>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import Link from "next/link";
import {
  useSearchProductsQuery,
  useGetSearchSuggestionsQuery,
  useGetSearchFiltersQuery,
  useTrackSearchImpressionMutation,
  useTrackSearchClickMutation,
} from "@/features/search/searchSlice";

export default function SearchBarDialog({ open, onOpenChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  // --- RTK Query Hooks ---
  const { data: searchResults, isLoading: loadingProducts } =
    useSearchProductsQuery(
      { q: searchTerm, category: selectedCategory, page: 1, limit: 10 },
      { skip: !searchTerm }
    );

  const { data: suggestionsData } = useGetSearchSuggestionsQuery(searchTerm, {
    skip: !searchTerm,
  });

  const { data: filtersData } = useGetSearchFiltersQuery(
    { q: searchTerm, category: selectedCategory },
    { skip: !searchTerm }
  );

  const [trackImpression] = useTrackSearchImpressionMutation();
  const [trackClick] = useTrackSearchClickMutation();

  // --- Track impression when search results change ---
  useEffect(() => {
    if (searchResults?.products?.length > 0) {
      trackImpression({
        searchTerm,
        products: searchResults.products.map((p) => p.id),
      });
    }
  }, [searchResults, searchTerm, trackImpression]);

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      className="w-[100%] backdrop-blur-2xl"
    >
      <Command>
        <CommandInput
          placeholder="ابحث عن عطر، ماركة، نوتة..."
          value={searchTerm}
          onValueChange={(value) => setSearchTerm(value)}
        />
        <CommandList>
          <CommandEmpty>
            {searchTerm
              ? loadingProducts
                ? "جاري البحث..."
                : "لا توجد نتائج."
              : "أدخل كلمة للبحث..."}
          </CommandEmpty>

          {/* --- Suggestions --- */}
          {suggestionsData?.suggestions?.length > 0 && (
            <CommandGroup heading="اقتراحات">
              {suggestionsData.suggestions.map((suggestion, index) => (
                <CommandItem key={index}>
                  <Link
                    href={`/search?q=${encodeURIComponent(suggestion)}`}
                    onClick={() =>
                      trackClick({ searchTerm, productId: suggestion })
                    }
                  >
                    {suggestion}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* --- Search Results --- */}
          {searchResults?.products?.length > 0 && (
            <CommandGroup heading="نتائج البحث">
              {searchResults.products.map((product) => (
                <CommandItem key={product.id}>
                  <Link
                    href={`/product/${product.id}`}
                    onClick={() =>
                      trackClick({ searchTerm, productId: product.id })
                    }
                  >
                    {product.name}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* --- Static Categories as fallback --- */}
          {/* <CommandGroup heading="العطور">
            <CommandItem>
              <Link href="/perfumes?cat=oud">عود</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/perfumes?cat=fruity">فواكه</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/perfumes?cat=vanilla">فانيلا</Link>
            </CommandItem>
          </CommandGroup> */}
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
