import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function Offers({ className, items }) {
  return (
    <div className="grid grid-cols-12 gap-4 px-1 py-5 max-w-screen-2xl mx-auto lg:p-4">
      {items.map((item, i) => {
        let colSpan = "col-span-12"; // الافتراضي = كامل العرض

        const mod = i % 7;
        if (mod === 0) colSpan = "col-span-12"; // صف كامل
        else if (mod === 1 || mod === 2) colSpan = "col-span-6"; // صف فيه 2
        else if (mod === 3 || mod === 4 || mod === 5)
          colSpan = "col-span-4"; // صف فيه 3
        else if (mod === 6) colSpan = "col-span-12"; // صف كامل

        return (
          <div key={i} className={colSpan}>
            <a href={item.href}>
              <img
                src={item.src}
                alt={`عرض ${i + 1}`}
                className="w-full h-[240px] object-cover rounded-md"
              />
            </a>
          </div>
        );
      })}
    </div>
  );
}
