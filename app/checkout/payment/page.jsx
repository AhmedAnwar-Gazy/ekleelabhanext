"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function PaymentPage() {
  const [card, setCard] = useState({
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  return (
    <div className="max-w-2xl mx-auto p-6" dir="rtl">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>💳 الدفع</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="اسم حامل البطاقة"
            value={card.holder}
            onChange={(e) => setCard({ ...card, holder: e.target.value })}
          />
          <Input
            placeholder="رقم البطاقة"
            value={card.number}
            onChange={(e) => setCard({ ...card, number: e.target.value })}
          />
          <Input
            placeholder="تاريخ الانتهاء"
            value={card.expiry}
            onChange={(e) => setCard({ ...card, expiry: e.target.value })}
          />
          <Input
            placeholder="CVV"
            value={card.cvv}
            onChange={(e) => setCard({ ...card, cvv: e.target.value })}
          />
          <Link href="/checkout/review">
            <Button className="w-full mt-4 rounded-2xl">التالي</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
