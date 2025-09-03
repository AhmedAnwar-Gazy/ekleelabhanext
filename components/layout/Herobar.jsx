import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function Herobar({ imges, className, size }) {
  return (
    <div dir="rtl" className={cn("", className)}>
      <Carousel
        opts={{
          // containScroll: "trimSnaps", // يمنع ظهور سلايد فاضي في النهاية
          direction: "rtl", // لو موقعك عربي RTL. احذفها إن كان موقعك LTR
          loop: false, // اجعله true لو تبغى تدوير لا نهائي
        }}
        className="w-full max-w-8xl "
      >
        <CarouselContent>
          <CarouselItem className="w-full">
            <img
              src={imges}
              alt="صورة 1"
              className={cn("w-full object-cover", className)}
            />
          </CarouselItem>
          <CarouselItem className="w-full">
            <img
              src="/images/laura.jpg"
              alt="صورة 2"
              className={cn("w-full object-cover", className)}
            />
          </CarouselItem>
          <CarouselItem className="w-full">
            <img
              src="/images/ulysse.jpg"
              alt="صورة 3"
              className={cn("w-full object-cover", className)}
            />
          </CarouselItem>
        </CarouselContent>

        <div className="absolute top-90 left-10 flex gap-2 p-2 z-10">
          <CarouselNext className=" border-current static h-15 w-15 rounded-full hover:bg-gray-200  flex items-center justify-center transition" />
          <CarouselPrevious className=" border-current static h-15 w-15 rounded-full hover:bg-gray-200 flex items-center justify-center transition" />
        </div>
        {/* <CarouselPrevious />
        <CarouselNext /> */}
      </Carousel>
    </div>
  );
}
