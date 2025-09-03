"use client";
import React from "react";
import {
  CheckCircle2,
  CreditCard,
  LogIn,
  ShoppingCart,
  Truck,
} from "lucide-react";

export default function Stepper({ step }) {
  const steps = [
    { title: "السلة", icon: <ShoppingCart className="h-4 w-4" /> },
    { title: "تسجيل/ضيف", icon: <LogIn className="h-4 w-4" /> },
    { title: "الشحن", icon: <Truck className="h-4 w-4" /> },
    { title: "الدفع", icon: <CreditCard className="h-4 w-4" /> },
    { title: "المراجعة", icon: <CheckCircle2 className="h-4 w-4" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-4" dir="rtl">
      <div className="grid grid-cols-5 gap-2">
        {steps.map((s, i) => {
          const active = step === i;
          const done = step > i;
          return (
            <div key={s.title} className="flex items-center gap-3">
              <div
                className={`h-9 w-9 rounded-2xl flex items-center justify-center text-sm font-semibold shadow ${
                  done
                    ? "bg-green-100 text-green-700"
                    : active
                    ? "bg-black text-white"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {s.icon}
              </div>
              <div
                className={`text-sm ${active ? "font-bold" : "font-medium"}`}
              >
                {s.title}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
