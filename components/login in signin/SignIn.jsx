"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Sigin() {
  const [date, setDate] = React.useState(null);

  return (
    <Sheet>
      <SheetTrigger>انشاء حساب جديد </SheetTrigger>
      <SheetContent>
        <SheetHeader className="items-center">
          <img src="/aka.png" alt="اكليل ابها " className="w-45 mb-4" />
          <SheetTitle className="text-center text-2xl font-bold">
            يرجى استكمال معلوماتك الشخصية.
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-4 p-4">
          <Input placeholder=" الاسم" className="p-5 rounded-sm" />
          <Input placeholder="البريد الإلكتروني" className="p-5 rounded-sm" />
          <Input placeholder="رقم الهاتف" className="p-5 rounded-sm" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="ml-2 h-4 w-4" />
                {date ? (
                  format(date, "PPP")
                ) : (
                  <span>تاريخ الميلاد (DD-MM-YYYY)</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <div className="flex flex-col gap-2">
            <RadioGroup defaultValue="male" className="flex items-center gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="male" id="male" />
                <Label htmlFor="male">ذكر</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="female" id="female" />
                <Label htmlFor="female">أنثى</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 p-4">
          <Button className="w-full bg-black text-white py-6 text-lg font-semibold">
            تسجيل جديد
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
