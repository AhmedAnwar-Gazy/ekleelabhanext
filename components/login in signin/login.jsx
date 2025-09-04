"use client";

import * as React from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Sigin from "./SignIn";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("966");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Phone:", countryCode + phoneNumber);
  };
  return (
    <Sheet>
      <SheetTrigger>حسابي</SheetTrigger>
      <SheetContent>
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

          {/* <Button
            type="submit"
            className="w-full bg-black hover:bg-neutral-700 text-white py-6 text-lg"
          >
            أرسل الرمز
          </Button> */}
          <div className="absolute bottom-4 left-0 right-0 p-4">
            <Button className="w-full bg-black text-white py-4 mb-2 text-lg font-semibold cursor-pointer">
              ارسال الرمز
            </Button>
            <Button
              variant="ghost"
              className="w-full py-4 text-lg font-semibold mb-2  cursor-pointer"
            >
              <Sigin />
            </Button>
          </div>
        </form>
        {/* <div className="absolute bottom-4 left-0 right-0 p-4">
          <Button className="w-full bg-black text-white py-4 mb-2 text-lg font-semibold cursor-pointer">
            تسجيل الدخول
          </Button>
          <Button
            variant="ghost"
            className="w-full py-4 text-lg font-semibold mb-2  cursor-pointer"
          >
            <Sigin />
          </Button>
        </div> */}
      </SheetContent>
    </Sheet>
  );
}
