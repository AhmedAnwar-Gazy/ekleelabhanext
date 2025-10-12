"use client";
import React, { useEffect } from "react";

export default function PaymentPage() {
  useEffect(() => {
    // ✅ تعريف إعدادات Hyperpay (wpwlOptions)
    window.wpwlOptions = {
      style: "plain",
      locale: "ar",
      rtl: true,
      billingAddress: {
        country: "SA",
        state: "RY",
        city: "الرياض",
        street1: "الطريق الرئيسي",
        street2: "",
        postcode: "11432",
      },
      forceCardHolderEqualsBillingName: true,
      showCVVHint: true,
      brandDetection: true,
      onReady: function () {
        // تنسيقات الحقول
        const $ = window.jQuery;

        $(".wpwl-label").css({
          "font-weight": "600",
          color: "#333",
          "margin-bottom": "4px",
          display: "block",
          "font-size": "14px",
        });

        $(".wpwl-control").css({
          border: "1px solid #d1d5db",
          "border-radius": "8px",
          padding: "10px 12px",
          "font-size": "15px",
          width: "100%",
          transition: "border-color 0.2s ease",
        });

        $(".wpwl-control")
          .focus(function () {
            $(this).css("border-color", "#ef4444");
          })
          .blur(function () {
            $(this).css("border-color", "#d1d5db");
          });

        $(".wpwl-button-pay")
          .css({
            "background-color": "#ef4444",
            color: "white",
            border: "none",
            "border-radius": "10px",
            padding: "12px 0",
            width: "100%",
            "font-size": "16px",
            "font-weight": "600",
            cursor: "pointer",
            "margin-top": "10px",
            transition: "background-color 0.3s ease",
          })
          .hover(function () {
            $(this).css("background-color", "#dc2626");
          });
      },
      onChangeBrand: function (e) {
        const $ = window.jQuery;
        $(".wpwl-brand-custom").css("opacity", "0.3");
        $(".wpwl-brand-" + e).css("opacity", "1");
      },
    };

    // ✅ تحميل سكربت Hyperpay بعد ضبط wpwlOptions
    const script = document.createElement("script");
    script.src =
      "https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=A56486966E056AFC0A30ADB5AD03377B.uat01-vm-tx02";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // تنظيف عند الخروج من الصفحة
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6" dir="rtl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        إتمام عملية الدفع
      </h2>

      {/* ✅ النموذج الخاص بـ Hyperpay */}
      <form
        action="/"
        className="paymentWidgets"
        data-brands="VISA MASTER MADA"
        data-theme="light"
        data-alignment="center"
      ></form>
    </div>
  );
}
