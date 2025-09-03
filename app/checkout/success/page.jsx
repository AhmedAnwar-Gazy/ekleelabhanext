// 📁 app/checkout/success/page.jsx
"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="max-w-xl mx-auto p-6 text-center" dir="rtl">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>🎉 تم تأكيد الطلب</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-muted-foreground">
            شكراً لتسوقك معنا! سنقوم بتجهيز طلبك قريباً.
          </p>
          <Link href="/">
            <Button className="rounded-2xl">عودة للرئيسية</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
