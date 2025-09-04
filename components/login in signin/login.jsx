"use client";

import * as React from "react";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [activeMode, setMode] = useState("login"); // login | signup
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("966");
  const [date, setDate] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Phone:", countryCode + phoneNumber);
  };

  return (
    <Sheet>
      <SheetTrigger>حسابي</SheetTrigger>
      <SheetContent>
        {activeMode === "login" ? (
          <>
            {/* شاشة تسجيل الدخول */}
            <SheetHeader className="items-center">
              <img src="/aka.png" alt="اكليل ابها " className="w-45 mb-4" />
              <SheetTitle className="text-center text-2xl font-bold">
                يا هلا بك في متجرنا!
              </SheetTitle>
            </SheetHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="flex gap-0 border border-gray-200 rounded-md overflow-hidden">
                  <Select value={countryCode} onValueChange={setCountryCode}>
                    <SelectTrigger className="w-20 border-none rounded-none border-r border-gray-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="966">966</SelectItem>
                      <SelectItem value="965">965</SelectItem>
                      <SelectItem value="971">971</SelectItem>
                      <SelectItem value="973">973</SelectItem>
                      <SelectItem value="974">974</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    type="tel"
                    placeholder="5xxxxxxxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="flex-1 border-none rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 text-right"
                    dir="ltr"
                  />
                </div>
              </div>

              <div className="absolute bottom-4 left-0 right-0 p-4">
                <Button className="w-full bg-black text-white py-4 mb-2 text-lg font-semibold">
                  إرسال الرمز
                </Button>
                <Button
                  variant="ghost"
                  className="w-full py-4 text-lg font-semibold cursor-pointer"
                  onClick={() => setMode("signup")}
                >
                  إنشاء حساب جديد
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            {/* شاشة إنشاء الحساب */}
            <SheetHeader className="items-center">
              <img src="/aka.png" alt="اكليل ابها " className="w-45 mb-4" />
              <SheetTitle className="text-center text-2xl font-bold">
                يرجى استكمال معلوماتك الشخصية.
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              <Input placeholder="الاسم" className="p-5 rounded-sm" />
              <Input
                placeholder="البريد الإلكتروني"
                className="p-5 rounded-sm"
              />
              <Input placeholder="رقم الهاتف" className="p-5 rounded-sm" />

              <div>
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
                {/* هنا ممكن تضيف الكالندر بداخل Popover زي كودك السابق */}
              </div>

              <div className="flex flex-col gap-2">
                <RadioGroup
                  defaultValue="male"
                  className="flex items-center gap-4"
                >
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
              <Button className="w-full bg-black text-white py-4 text-lg font-semibold mb-2">
                تسجيل جديد
              </Button>
              <Button
                variant="ghost"
                className="w-full py-4 text-lg font-semibold cursor-pointer"
                onClick={() => setMode("login")}
              >
                الرجوع لتسجيل الدخول
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
