"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import "@/components/ui.css";

export default function PaymentPage() {
  const [card, setCard] = useState({
    holder: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  return (
    // <div className="max-w-2xl mx-auto p-6" dir="rtl">
    //   <h2>Complete Your Payment</h2>

    //   <script src="https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=A56486966E056AFC0A30ADB5AD03377B.uat01-vm-tx02"></script>

    //   <form
    //     action="/"
    //     class="paymentWidgets"
    //     data-brands="VISA MASTER MADA OXXO"
    //   ></form>
    // </div>

    <div className="max-w-2xl mx-auto p-6" dir="rtl">
      <h2>Complete Your Payment</h2>

      <script src="https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=A56486966E056AFC0A30ADB5AD03377B.uat01-vm-tx02"></script>

      <form
        action="/"
        class="paymentWidgets"
        data-brands="VISA MASTER MADA OXXO"
        data-theme="light"
        data-alignment="right"
      ></form>
    </div>
  );
}
