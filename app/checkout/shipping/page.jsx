"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function ShippingPage() {
  const [info, setInfo] = useState({ name: "", address: "", phone: "" });

  return (
    <div className="max-w-2xl mx-auto p-6" dir="rtl">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>📦 معلومات الشحن</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="الاسم الكامل"
            value={info.name}
            onChange={(e) => setInfo({ ...info, name: e.target.value })}
          />
          <Input
            placeholder="العنوان"
            value={info.address}
            onChange={(e) => setInfo({ ...info, address: e.target.value })}
          />
          <Input
            placeholder="رقم الهاتف"
            value={info.phone}
            onChange={(e) => setInfo({ ...info, phone: e.target.value })}
          />
          <Link href="/checkout/payment">
            <Button className="w-full mt-4 rounded-2xl">التالي</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
