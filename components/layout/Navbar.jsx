"use client";

import { useState } from "react";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Menu,
  Search,
  MapPin,
  ShoppingCart,
  User,
  Globe,
  Gift,
  Percent,
  Sparkles,
  ChevronLeft,
  ChevronDown,
  Star,
  Layers,
} from "lucide-react";
import Sigin from "../login in signin/SignIn";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Sss from "./sssss";
import Login from "../login in signin/login";

// import ShoppingCarts from "@/components/cart/ShoppingCart";

const categories = [
  {
    title: "رجالي",
    href: "/shop?g=men",
    items: [
      { title: "عود", href: "/shop/men?cat=oud" },
      { title: "سبرتي", href: "/shop/men?cat=sport" },
      { title: "بارفيوم", href: "/shop/men?cat=parfum" },
      { title: "مجموعات هدايا", href: "/shop/men?cat=gifts" },
    ],
  },
  {
    title: "نسائي",
    href: "/shop?g=women",
    items: [
      { title: "فانيلا", href: "/shop/women?cat=floral" },
      { title: "فواكه", href: "/shop/women?cat=fruity" },
      { title: "بارفيوم", href: "/shop/women?cat=parfum" },
      { title: "مجموعات هدايا", href: "/shop/women?cat=gifts" },
    ],
  },
];

export default function PerfumeNavbar() {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header
      dir="rtl"
      className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-sm">
        <div className="flex items-center gap-2">
          {/* <Badge variant="secondary" className="rounded-full px-3 py-1">
            شحن سريع داخل السعودية
          </Badge>
          <span className="text-muted-foreground hidden md:inline">
            استبدال خلال 7 أيام
          </span> */}
          <Link href="/" className=" text-2xl font-extrabold tracking-tight">
            <img src="/aka.png " className="w-35 "></img>
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
          {/* <Sss /> */}
          {/* <Link href="/login"> */}
          <Button variant="ghost" size="sm" className="gap-1 px-2">
            <Login />
            <User className="size-4" />
          </Button>
          {/* </Link> */}
          {/* <ShoppingCarts /> */}
          {/* <ShoppingCarts></ShoppingCarts> */}

          <Button variant="outline" size="sm" className="gap-2 rounded-full">
            <MapPin className="size-4" />
            <Sheet>
              <SheetTrigger className=" font-semibold flex items-center gap-2 ">
                التوصيل: <span className="">الرياض</span>
              </SheetTrigger>

              <SheetContent side="left" className="w-[90vw] md:w-[600px] p-6">
                <SheetHeader>
                  <SheetTitle>اختر موقع التوصيل</SheetTitle>
                  <SheetDescription>
                    حدد موقعك على الخريطة أو اختر مدينة جاهزة.
                  </SheetDescription>
                </SheetHeader>

                {/* 🔹 خريطة Google Maps */}
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

                {/* 🔹 أزرار مدن جاهزة */}
                <div className="mt-6 space-y-3">
                  <p className="w-full py-2 border rounded-lg hover:bg-pink-50">
                    الرياض
                  </p>
                  <p className="w-full py-2 border rounded-lg hover:bg-pink-50">
                    جدة
                  </p>
                  <p className="w-full py-2 border rounded-lg hover:bg-pink-50">
                    الدمام
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </Button>
        </div>
      </div>

      <Separator />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3">
        <div className="flex items-center gap-2 lg:hidden">
          <MobileMenu />
        </div>
        <div className="hidden flex-1 justify-center lg:flex">
          <DesktopMegaMenu0 />
          <DesktopMegaMenu />
        </div>
      </div>

      <SearchBarDialog open={openSearch} onOpenChange={setOpenSearch} />
    </header>
  );
}

function DesktopMegaMenu0({ className }) {
  return (
    <div className={cn("flex", className)}>
      <NavigationMenu dir="rtl">
        <NavigationMenuList className="gap-3">
          <NavigationMenuItem>
            <NavigationMenuTrigger> الكل</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px]">
                <li>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href="#"
                  >
                    قسم 1
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href="#"
                  >
                    قسم 2
                  </NavigationMenuLink>
                </li>
                <li>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    href="#"
                  >
                    قسم 3
                  </NavigationMenuLink>
                </li>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/make_up" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                المكياج
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/perfumes" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                العطور
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/health" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                الصحة والتغذية
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/brands" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                الماركات
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function DesktopMegaMenu() {
  return (
    <NavigationMenu orientation="horizontal" className="max-w-none">
      <NavigationMenuList className="gap-1">
        <NavigationMenuItem>
          <NavigationMenuTrigger className="rounded-2xl px-4 text-base">
            التسوق
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[600px] grid-cols-2 gap-6 p-6">
              {categories.map((cat) => (
                <Link
                  key={cat.title}
                  href={cat.href}
                  className="group rounded-2xl border p-4 hover:shadow-sm"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-semibold">{cat.title}</span>
                    <ChevronLeft className="size-4 opacity-60" />
                  </div>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {cat.items.map((it) => (
                      <li key={it.title}>
                        <Link href={it.href} className="hover:text-foreground">
                          {it.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </Link>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileMenu() {
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
          <nav className="mt-4 space-y-2">
            <DesktopMegaMenu0 className="flex flex-col space-y-2 p-4 " />
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({ href, label, subtle, badge, icon }) {
  return (
    <Link
      href={href}
      className={[
        "group flex items-center justify-between rounded-xl border px-3 py-2",
        subtle ? "text-muted-foreground border-dashed" : "hover:bg-muted/60",
      ].join(" ")}
    >
      <span className="flex items-center gap-2">
        {icon}
        {label}
      </span>
      <span className="flex items-center gap-2">
        {badge ? <Badge className="rounded-full">{badge}</Badge> : null}
        <ChevronLeft className="size-4 opacity-60" />
      </span>
    </Link>
  );
}

function SearchBarDialog({ open, onOpenChange }) {
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command>
        {/* 🔍 حقل البحث */}
        <CommandInput placeholder="ابحث عن عطر، ماركة، نوتة..." />

        <CommandList>
          <CommandEmpty>لا توجد نتائج.</CommandEmpty>

          {/* ✅ أقسام البحث */}
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

          <CommandGroup heading="الماركات">
            <CommandItem>
              <Link href="/brands/chanel">Chanel</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/brands/dior">Dior</Link>
            </CommandItem>
            <CommandItem>
              <Link href="/brands/gucci">Gucci</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  );
}
