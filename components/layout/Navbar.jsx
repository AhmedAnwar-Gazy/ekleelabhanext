// "use client";

// import { useState } from "react";
// import Link from "next/link";
// import {
//   NavigationMenu,
//   NavigationMenuContent,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
//   navigationMenuTriggerStyle,
//   NavigationMenuTrigger,
// } from "@/components/ui/navigation-menu";
// import { cn } from "@/lib/utils";

// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

// import {
//   Command,
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Sheet,
//   SheetContent,
//   SheetDescription,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
// import { Badge } from "@/components/ui/badge";
// import {
//   Menu,
//   Search,
//   MapPin,
//   ShoppingCart,
//   User,
//   Globe,
//   Gift,
//   Percent,
//   Sparkles,
//   ChevronLeft,
//   ChevronDown,
//   Star,
//   Layers,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import Login from "../login_and_signin/login";
// import { SearchTop } from "./Sreach";

// // import ShoppingCarts from "@/components/cart/ShoppingCart";

// const categories = [
//   {
//     title: "رجالي",
//     href: "/shop?g=men",
//     items: [
//       { title: "عود", href: "/shop/men?cat=oud" },
//       { title: "سبرتي", href: "/shop/men?cat=sport" },
//       { title: "بارفيوم", href: "/shop/men?cat=parfum" },
//       { title: "مجموعات هدايا", href: "/shop/men?cat=gifts" },
//     ],
//   },
//   {
//     title: "نسائي",
//     href: "/shop?g=women",
//     items: [
//       { title: "فانيلا", href: "/shop/women?cat=floral" },
//       { title: "فواكه", href: "/shop/women?cat=fruity" },
//       { title: "بارفيوم", href: "/shop/women?cat=parfum" },
//       { title: "مجموعات هدايا", href: "/shop/women?cat=gifts" },
//     ],
//   },
// ];

// export default function PerfumeNavbar() {
//   const [openSearch, setOpenSearch] = useState(false);

//   return (
//     <header
//       dir="rtl"
//       className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur"
//     >
//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-sm">
//         <div className="flex items-center gap-2">
//           {/* <Badge variant="secondary" className="rounded-full px-3 py-1">
//             شحن سريع داخل السعودية
//           </Badge>
//           <span className="text-muted-foreground hidden md:inline">
//             استبدال خلال 7 أيام
//           </span> */}
//           <Link href="/" className=" text-2xl font-extrabold tracking-tight">
//             <img src="/aka.png " className="w-35 "></img>
//           </Link>
//         </div>
//         <div className="flex items-center gap-3">
//           <Button variant="ghost" size="sm" className="gap-2 px-2">
//             <Globe className="size-4" /> العربية
//           </Button>

//           <Button
//             variant="ghost"
//             size="sm"
//             className="gap-1 px-2"
//             onClick={() => setOpenSearch(true)}
//           >
//             <Search className="size-4" /> بحث
//           </Button>

//           {/* <Sss /> */}
//           {/* <Link href="/login"> */}
//           <Button variant="ghost" size="sm" className="gap-1 px-2">
//             <Login />
//             <User className="size-4" />
//           </Button>
//           {/* </Link> */}
//           {/* <ShoppingCarts />
//                     <ShoppingCarts></ShoppingCarts>
// */}

//           <Button variant="outline" size="sm" className="gap-2 rounded-full">
//             <MapPin className="size-4" />
//             <Sheet>
//               <SheetTrigger className=" font-semibold flex items-center gap-2 ">
//                 التوصيل: <span className="">الرياض</span>
//               </SheetTrigger>

//               <SheetContent side="left" className="w-[90vw] md:w-[600px] p-6">
//                 <SheetHeader>
//                   <SheetTitle>اختر موقع التوصيل</SheetTitle>
//                   <SheetDescription>
//                     حدد موقعك على الخريطة أو اختر مدينة جاهزة.
//                   </SheetDescription>
//                 </SheetHeader>

//                 {/* 🔹 خريطة Google Maps */}
//                 <div className="mt-4 w-full h-80 rounded-lg overflow-hidden shadow">
//                   <iframe
//                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.137282162715!2d46.67529621544409!3d24.713551984126468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03875a0d12c9%3A0x73b90c7c82aefb8!2z2KfZhNmF2YjYudmK2Kkg2KfZhNmF2LPYqNmK2Kkg2KfZhNmF2YjYudmK2Kkg2YXYr9mK2YjZhNin2Kog2KfZhNi62LHYqNix2Yog2YXYpNiz2YrYqQ!5e0!3m2!1sar!2ssa!4v1692280012345!5m2!1sar!2ssa"
//                     width="100%"
//                     height="100%"
//                     style={{ border: 0 }}
//                     allowFullScreen=""
//                     loading="lazy"
//                     referrerPolicy="no-referrer-when-downgrade"
//                   ></iframe>
//                 </div>

//                 {/* 🔹 أزرار مدن جاهزة */}
//                 <div className="mt-6 space-y-3">
//                   <p className="w-full py-2 border rounded-lg hover:bg-pink-50">
//                     الرياض
//                   </p>
//                   <p className="w-full py-2 border rounded-lg hover:bg-pink-50">
//                     جدة
//                   </p>
//                   <p className="w-full py-2 border rounded-lg hover:bg-pink-50">
//                     الدمام
//                   </p>
//                 </div>
//               </SheetContent>
//             </Sheet>
//           </Button>
//         </div>
//       </div>

//       <Separator />

//       <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
//         <div className="flex items-center gap-2 lg:hidden">
//           <MobileMenu />
//         </div>
//         <div className="hidden flex-1 justify-center lg:flex">
//           <DesktopMegaMenu />
//         </div>
//       </div>

//       <SearchBarDialog open={openSearch} onOpenChange={setOpenSearch} />
//     </header>
//   );
// }

// function DesktopMegaMenu({ className }) {
//   return (
//     <div className={cn("flex", className)}>
//       <NavigationMenu dir="rtl">
//         <NavigationMenuList className="gap-3">
//           <NavigationMenuItem>
//             <NavigationMenuTrigger> الكل</NavigationMenuTrigger>
//             <NavigationMenuContent>
//               <ul className="grid gap-3 p-6 md:w-[400px]">
//                 <li>
//                   <NavigationMenuLink
//                     className={navigationMenuTriggerStyle()}
//                     href="#"
//                   >
//                     قسم 1
//                   </NavigationMenuLink>
//                 </li>
//                 <li>
//                   <NavigationMenuLink
//                     className={navigationMenuTriggerStyle()}
//                     href="#"
//                   >
//                     قسم 2
//                   </NavigationMenuLink>
//                 </li>
//                 <li>
//                   <NavigationMenuLink
//                     className={navigationMenuTriggerStyle()}
//                     href="#"
//                   >
//                     قسم 3
//                   </NavigationMenuLink>
//                 </li>
//               </ul>
//             </NavigationMenuContent>
//           </NavigationMenuItem>

//           <NavigationMenuItem>
//             <Link href="/make_up" legacyBehavior passHref>
//               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                 المكياج
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>

//           <NavigationMenuItem>
//             <Link href="/perfumes" legacyBehavior passHref>
//               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                 العطور
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>

//           <NavigationMenuItem>
//             <Link href="/health" legacyBehavior passHref>
//               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                 الصحة والتغذية
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>

//           <NavigationMenuItem>
//             <Link href="/brands" legacyBehavior passHref>
//               <NavigationMenuLink className={navigationMenuTriggerStyle()}>
//                 الماركات
//               </NavigationMenuLink>
//             </Link>
//           </NavigationMenuItem>
//         </NavigationMenuList>
//       </NavigationMenu>
//     </div>
//   );
// }

// function MobileMenu() {
//   return (
//     <Sheet>
//       <SheetTrigger asChild>
//         <Button variant="ghost" size="icon" aria-label="فتح القائمة">
//           <Menu className="size-6" />
//         </Button>
//       </SheetTrigger>
//       <SheetContent side="right" className="w-[85vw] sm:w-96" dir="rtl">
//         <SheetHeader>
//           <SheetTitle className="text-right">القائمة</SheetTitle>
//         </SheetHeader>
//         <ScrollArea className="h-[85vh] pe-2">
//           <nav className="flex flex-col mt-8 text-right">
//             <span className="font-bold text-2xl border-b border-black pb-3 mb-4">
//               الكل
//             </span>

//             <div className="flex flex-col gap-3 text-lg mb-6">
//               <Link
//                 href="#"
//                 className="px-3 py-2 transition hover:underline hover:opacity-80"
//               >
//                 قسم 1
//               </Link>
//               <Link
//                 href="#"
//                 className="px-3 py-2 transition hover:underline hover:opacity-80"
//               >
//                 قسم 2
//               </Link>
//               <Link
//                 href="#"
//                 className="px-3 py-2 transition hover:underline hover:opacity-80"
//               >
//                 قسم 3
//               </Link>
//             </div>

//             <Link
//               href="/make_up"
//               className="px-3 py-2 text-lg transition hover:underline hover:opacity-80"
//             >
//               المكياج
//             </Link>
//             <Link
//               href="/perfumes"
//               className="px-3 py-2 text-lg transition hover:underline hover:opacity-80"
//             >
//               العطور
//             </Link>
//             <Link
//               href="/health"
//               className="px-3 py-2 text-lg transition hover:underline hover:opacity-80"
//             >
//               الصحة والتغذية
//             </Link>
//             <Link
//               href="/brands"
//               className="px-3 py-2 text-lg transition hover:underline hover:opacity-80"
//             >
//               الماركات
//             </Link>
//           </nav>
//         </ScrollArea>
//       </SheetContent>
//     </Sheet>
//   );
// }

// function MobileLink({ href, label, subtle, badge, icon }) {
//   return (
//     <Link
//       href={href}
//       className={[
//         "group flex items-center justify-between rounded-xl border px-3 py-2",
//         subtle ? "text-muted-foreground border-dashed" : "hover:bg-muted/60",
//       ].join(" ")}
//     >
//       <span className="flex items-center gap-2">
//         {icon}
//         {label}
//       </span>
//       <span className="flex items-center gap-2">
//         {badge ? <Badge className="rounded-full">{badge}</Badge> : null}
//         <ChevronLeft className="size-4 opacity-60" />
//       </span>
//     </Link>
//   );
// }

// function SearchBarDialog({ open, onOpenChange }) {
//   return (
//     <CommandDialog
//       open={open}
//       onOpenChange={onOpenChange}
//       className="w-[100%] backdrop-blur-2xl"
//     >
//       <Command>
//         {/* 🔍 حقل البحث */}
//         <CommandInput placeholder="ابحث عن عطر، ماركة، نوتة..." />

//         <CommandList>
//           <CommandEmpty>لا توجد نتائج.</CommandEmpty>

//           {/* ✅ أقسام البحث */}
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

//           <CommandGroup heading="الماركات">
//             <CommandItem>
//               <Link href="/brands/chanel">Chanel</Link>
//             </CommandItem>
//             <CommandItem>
//               <Link href="/brands/dior">Dior</Link>
//             </CommandItem>
//             <CommandItem>
//               <Link href="/brands/gucci">Gucci</Link>
//             </CommandItem>
//           </CommandGroup>
//         </CommandList>
//       </Command>
//     </CommandDialog>
//   );
// }

"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  useGetCategoryTreeQuery,
  selectRootCategories,
  selectAllCategories,
  selectCategoryChildren,
} from "@/features/categories/categoriesSlice";

import { useSelector } from "react-redux";
import { cn } from "@/lib/utils";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Menu, Search, MapPin, User, Globe } from "lucide-react";
import Login from "../login_and_signin/login";
import { SearchTop } from "./Sreach";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

export default function PerfumeNavbar() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-sm">
        <div className="flex items-center gap-2">
          <Link href="/" className=" text-2xl font-extrabold tracking-tight">
            <img src="/aka.png" className="w-35" />
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" className="gap-2 px-2">
            <Globe className="size-4" /> العربية
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="gap-1 px-2"
            onClick={() => setOpenSearch(true)}
          >
            <Search className="size-4" /> بحث
          </Button>
          <div className="flex p-2">
            <User className="size-4" />
            <Login />
          </div>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="gap-2 rounded-full"
              >
                <MapPin className="size-4" />
                التوصيل: <span>الرياض</span>
              </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-[90vw] md:w-[600px] p-6">
              <SheetHeader>
                <SheetTitle>اختر موقع التوصيل</SheetTitle>
              </SheetHeader>

              <div className="mt-4 w-full h-80 rounded-lg overflow-hidden shadow">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.137282162715!2d46.67529621544409!3d24.713551984126468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03875a0d12c9%3A0x73b90c7c82aefb8!2z2KfZhNmF2YjYudmK2Kkg2KfZhNmF2LPYqNmK2Kkg2KfZhNmF2YjYudmK2Kkg2YXYr9mK2YjZhNin2Kog2KfZhNi62LHYqNix2Yog2YXYpNiz2YrYqQ!5e0!3m2!1sar!2ssa!4v1692280012345!5m2!1sar!2ssa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              <div className="mt-6 space-y-3">
                {["الرياض", "جدة", "الدمام"].map((city) => (
                  <p
                    key={city}
                    className="w-full py-2 border rounded-lg hover:bg-pink-50 cursor-pointer"
                  >
                    {city}
                  </p>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Separator />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2 lg:hidden">
          <MobileMenu />
        </div>
        <div className="hidden flex-1 justify-center lg:flex">
          <DesktopMegaMenu />
        </div>
      </div>

      <SearchBarDialog open={openSearch} onOpenChange={setOpenSearch} />
    </header>
  );
}

// ---------------- Desktop Menu ----------------

export function DesktopMegaMenu() {
  const router = useRouter();

  // 🔹 جميع Hooks في الأعلى
  const allCategories = useSelector(selectAllCategories);
  const rootCategories = useSelector(selectRootCategories);

  const handleClick = (category) => {
    router.push(`/category/${category.id}`);
  };

  const renderSubCategories = (parentId) => {
    const children = allCategories.filter((c) => c.parent_id === parentId);
    if (!children.length) return null;

    return (
      <ul className="pl-4 mt-2 flex flex-col gap-1">
        {children.map((child) => (
          <li key={child.id}>
            <button
              className="hover:text-red-500"
              onClick={() => handleClick(child)}
            >
              {child.name}
            </button>
            {renderSubCategories(child.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <NavigationMenu dir="rtl">
      <NavigationMenuList className="gap-3">
        {rootCategories.map((category) => (
          <NavigationMenuItem key={category.id}>
            <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px]">
                {allCategories
                  .filter((c) => c.parent_id === category.id)
                  .map((child) => (
                    <li key={child.id}>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                        onClick={() => handleClick(child)}
                      >
                        {child.name}
                      </NavigationMenuLink>
                    </li>
                  ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// ---------------- Mobile Menu ----------------
function MobileMenu() {
  const { data } = useGetCategoryTreeQuery();
  const rootCategories = useSelector(selectRootCategories);
  const allCategories = useSelector(selectAllCategories); // خذ كل الفئات

  const router = useRouter();

  const handleClick = (category) => router.push(`/category/${category.id}`);

  const renderSubCategories = (parentId) => {
    // استخدم بيانات موجودة مسبقاً
    const children = allCategories.filter((c) => c.parent_id === parentId);
    if (!children || children.length === 0) return null;

    return (
      <ul className="pl-4 mt-2 flex flex-col gap-2">
        {children.map((child) => (
          <li key={child.id}>
            <button
              className="hover:text-red-500"
              onClick={() => handleClick(child)}
            >
              {child.name}
            </button>
            {renderSubCategories(child.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="فتح القائمة">
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[85vw] sm:w-96" dir="rtl">
        <SheetHeader>
          <SheetTitle className="text-right">القائمة</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[85vh] pe-2">
          <nav className="flex flex-col mt-8 text-right">
            {rootCategories.map((category) => (
              <div key={category.id} className="mb-3">
                <button
                  className="font-bold text-lg"
                  onClick={() => handleClick(category)}
                >
                  {category.name}
                </button>
                {renderSubCategories(category.id)}
              </div>
            ))}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

// ---------------- Search Dialog ----------------
function SearchBarDialog({ open, onOpenChange }) {
  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      className="w-[100%] backdrop-blur-2xl"
    >
      <Command>
        <CommandInput placeholder="ابحث عن عطر، ماركة، نوتة..." />
        <CommandList>
          <CommandEmpty>لا توجد نتائج.</CommandEmpty>
          <CommandGroup heading="العطور">
            <CommandItem>
              <Link href="/perfumes?cat=oud">عود</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/perfumes?cat=fruity">فواكه</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/perfumes?cat=vanilla">فانيلا</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
