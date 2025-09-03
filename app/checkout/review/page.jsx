"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ReviewPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, []);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const vat = Math.round(subtotal * 0.15);
  const shipping = cart.length ? 25 : 0;
  const total = subtotal + vat + shipping;

  return (
    <div className="max-w-3xl mx-auto p-6" dir="rtl">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>✅ مراجعة الطلب</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between py-2">
              <span>
                {item.title} × {item.qty}
              </span>
              <span>{item.price * item.qty} ر.س</span>
            </div>
          ))}
          <Separator className="my-4" />
          <div className="flex justify-between">
            <span>الإجمالي</span>
            <span>{total} ر.س</span>
          </div>
          <Link href="/checkout/success">
            <Button className="w-full mt-4 rounded-2xl">تأكيد الطلب</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
