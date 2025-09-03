"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const vat = Math.round(subtotal * 0.15);
  const shipping = cart.length ? 25 : 0;
  const total = subtotal + vat + shipping;

  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>🛒 سلة المشتريات</CardTitle>
        </CardHeader>
        <CardContent>
          {cart.length === 0 ? (
            <p className="text-muted-foreground">سلتك فارغة.</p>
          ) : (
            <>
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between py-2">
                  <span>{item.title} × {item.qty}</span>
                  <span>{item.price * item.qty} ر.س</span>
                </div>
              ))}
              <Separator className="my-4"/>
              <div className="flex justify-between"><span>المجموع</span><span>{subtotal} ر.س</span></div>
              <div className="flex justify-between"><span>الضريبة</span><span>{vat} ر.س</span></div>
              <div className="flex justify-between"><span>الشحن</span><span>{shipping} ر.س</span></div>
              <Separator className="my-4"/>
              <div className="flex justify-between font-bold text-lg"><span>الإجمالي</span><span>{total} ر.س</span></div>
              <Link href="/checkout/auth">
                <Button className="mt-4 w-full rounded-2xl">إتمام الشراء</Button>
              </Link>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}