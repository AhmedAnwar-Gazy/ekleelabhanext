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
import SearchBarDialog from "./SearchBarDialog";

export default function PerfumeNavbar() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 gap-2 sm:gap-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="flex items-center text-2xl font-extrabold tracking-tight"
          >
            <img src="/aka.png" alt="Logo" className="w-28 sm:w-32" />
          </Link>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-1 sm:gap-3">
          {/* Menu Icon (always visible on mobile) */}

          <div
            dir="ltr" // هذا يجعل كل شيء في الداخل يبدأ من اليسار
            className="relative w-[300px] sm:w-full"
          >
            <Button
              variant="ghost"
              type="text"
              onClick={() => setOpenSearch(true)}
              className="pl-12 pr-6 py-2 sm:py-3 sm:pl-12 sm:pr-24 bg-white rounded-4xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 text-sm sm:text-base flex items-center justify-start"
            >
              {/* أيقونة البحث */}
              <Search className="h-5 w-5 text-gray-400" />

              {/* نص البحث يظهر فقط على الشاشات الكبيرة */}
              <span className="ml-2 hidden sm:inline">ابحث في اكليل ابها</span>
            </Button>
          </div>

          {/* Language Button */}
          <Button variant="ghost" size="sm" className="gap-1 px-2">
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">العربية</span>
          </Button>

          {/* Delivery Sheet */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                size="sm"
                className="gap-1 rounded-full bg-transparent  hover:bg-gray-100"
              >
                <MapPin className="h-4 w-4 text-black " />
                <span className="hidden sm:inline text-black">
                  التوصيل: الرياض
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[90vw] sm:w-[400px] md:w-[600px] p-4 sm:p-6"
            >
              <SheetHeader>
                <SheetTitle className="text-lg font-semibold">
                  اختر موقع التوصيل
                </SheetTitle>
              </SheetHeader>
              <div className="mt-4 w-full h-64 sm:h-80 rounded-lg overflow-hidden ">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.137282162715!2d46.67529621544409!3d24.713551984126468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2f03875a0d12c9%3A0x73b90c7c82aefb8!2z2KfZhNmF2YjYudmK2Kkg2KfZhNmF2LPYqNmK2Kkg2KfZhNmF2YjYudmK2Kkg2YXYr9mK2YjZhNin2Kog2KfZhNi62LHYqNix2Yog2YXYpNiz2YrYqQ!5e0!3m2!1sar!2ssa!4v1692280012345!5m2!1sar!2ssa"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Delivery Map"
                ></iframe>
              </div>

              <div className="mt-4 sm:mt-6 space-y-2">
                {["الرياض", "جدة", "الدمام"].map((city) => (
                  <p
                    key={city}
                    className="w-full py-2 text-center border rounded-lg hover:bg-pink-50 cursor-pointer transition-colors"
                  >
                    {city}
                  </p>
                ))}
              </div>
            </SheetContent>
          </Sheet>

          {/* User/Login */}
          <div className="flex items-center gap-1 p-1 sm:p-0">
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">
              <Login />
            </span>
          </div>
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
            <NavigationMenuContent className="bg-white rounded-md shadow-lg border border-gray-100 p-6">
              <ul
                className="
      grid gap-3 p-4
      sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      md:w-[1120px]
    "
              >
                {allCategories
                  .filter((c) => c.parent_id === category.id)
                  .map((child) => (
                    <li key={child.id}>
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} block text-gray-700 hover:text-gray-900 hover:bg-gray-50 rounded-md transition`}
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
        <Link
          href="/brands"
          className="px-3 py-2 text-lg transition hover:underline hover:opacity-80"
        >
          الماركات
        </Link>
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
        <SheetHeader className="text-right">
          <SheetTitle className="text-left">القائمة</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[85vh] pe-2 pr-5">
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
