"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function AuthPage() {
  const [mode, setMode] = useState("guest");

  return (
    <div className="max-w-2xl mx-auto p-6" dir="rtl">
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle>👤 تسجيل الدخول</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant={mode === "guest" ? "default" : "secondary"}
            className="w-full rounded-2xl"
            onClick={() => setMode("guest")}
          >
            متابعة كضيف
          </Button>
          <Button
            variant={mode === "login" ? "default" : "secondary"}
            className="w-full rounded-2xl"
            onClick={() => setMode("login")}
          >
            تسجيل الدخول
          </Button>
          <Link href="/checkout/shipping">
            <Button className="w-full mt-4 rounded-2xl">التالي</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
