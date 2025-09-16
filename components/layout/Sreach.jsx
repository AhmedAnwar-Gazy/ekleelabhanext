// "use client";

// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import { Search } from "lucide-react";
// import Link from "next/link";

// export function SearchTop() {
//   return (
//     <Sheet>
//       {/* زر فتح البحث */}
//       <SheetTrigger className="px-4 py-2 bg-primary text-white rounded-lg flex items-center gap-2">
//         <Search className="h-4 w-4" />
//         بحث
//       </SheetTrigger>

//       {/* Drawer من الأعلى */}
//       <SheetContent
//         side="top"
//         className="h-[400px] w-full flex items-center justify-center bg-white shadow-lg backdrop-blur-2xl border-b"
//       >
//         {/* Command داخل Drawer */}
//         <Command className="w-full max-w-3xl rounded-lg border shadow-md">
//           {/* 🔍 حقل البحث */}
//           <CommandInput placeholder="ابحث عن عطر، ماركة، نوتة..." />

//           <CommandList>
//             <CommandEmpty>لا توجد نتائج.</CommandEmpty>

//             {/* ✅ أقسام البحث */}
//             <CommandGroup heading="العطور">
//               <CommandItem>
//                 <Link href="/perfumes?cat=oud">عود</Link>
//               </CommandItem>
//               <CommandItem>
//                 <Link href="/perfumes?cat=fruity">فواكه</Link>
//               </CommandItem>
//               <CommandItem>
//                 <Link href="/perfumes?cat=vanilla">فانيلا</Link>
//               </CommandItem>
//             </CommandGroup>

//             <CommandGroup heading="الماركات">
//               <CommandItem>
//                 <Link href="/brands/chanel">Chanel</Link>
//               </CommandItem>
//               <CommandItem>
//                 <Link href="/brands/dior">Dior</Link>
//               </CommandItem>
//               <CommandItem>
//                 <Link href="/brands/gucci">Gucci</Link>
//               </CommandItem>
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </SheetContent>
//     </Sheet>
//   );
// }
