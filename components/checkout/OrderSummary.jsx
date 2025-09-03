"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { sar } from "@/lib/currency";

export default function OrderSummary({ subtotal, vat, shipping, total }) {
  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>الملخص</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2" dir="rtl">
        <div className="flex justify-between">
          <span>المجموع</span>
          <span>{sar(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>الضريبة (15%)</span>
          <span>{sar(vat)}</span>
        </div>
        <div className="flex justify-between">
          <span>الشحن</span>
          <span>{sar(shipping)}</span>
        </div>
        <Separator />
        <div className="flex justify-between font-bold text-lg">
          <span>الإجمالي</span>
          <span>{sar(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
