"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Truck, MapPin, Plus, Star } from "lucide-react";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [selectedDelivery, setSelectedDelivery] = useState("standard");

  const [selectedPayment, setSelectedPayment] = useState("");
  const router = useRouter();

  const handlePaymentChange = (value) => {
    setSelectedPayment(value);

    // الانتقال فقط عند اختيار البطاقة الائتمانية
    if (value === "card") {
      router.push("checkout/payment"); // ضع هنا رابط الصفحة المطلوبة
    }
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ direction: "rtl" }}>
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Summary Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-right">ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>الإجمالي</span>
                  <span>66 ر.س</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>رسوم الشحن</span>
                  <span>19 ر.س</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>الإجمالي الباقي شامل الضريبة</span>
                  <span>85 ر.س</span>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-700 text-center">
                    هل لديك كوبون خصم أو قسيمة قدم الآن
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Payment and Delivery Methods Combined */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  طريقة الدفع أو التسليم
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Delivery Options */}
                {/* <div>
                  <RadioGroup
                    value={selectedDelivery}
                    onValueChange={setSelectedDelivery}
                  >
                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="pickup" id="pickup" />
                      <Label htmlFor="pickup" className="flex-1">
                        <div>
                          <p className="font-medium">الدفع عند الاستلام</p>
                          <p className="text-sm text-gray-500">
                            رسوم هذه الخدمة 28 ر.س
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="online" id="online" />
                      <Label htmlFor="online" className="flex-1">
                        <div>
                          <p className="font-medium">تاب</p>
                          <p className="text-sm text-gray-500">
                            قسط مشترياتك على 4 دفعات بدون رسوم أو فوائد
                          </p>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-2 p-4 border rounded-lg">
                      <RadioGroupItem value="tamara" id="tamara" />
                      <Label htmlFor="tamara" className="flex-1">
                        <div>
                          <p className="font-medium">تمار</p>
                          <p className="text-sm text-gray-500">
                            قسم مشترياتك على 4 دفعات بدون رسوم أو فوائد
                          </p>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </div> */}

                <Separator />

                {/* Payment Methods Section */}
                <div>
                  <h3 className="font-medium mb-4">اختر طريقة الدفع</h3>

                  <div className="grid grid-cols-4 gap-4 mb-6">
                    <div className="p-3 border rounded-lg flex justify-center">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        VISA
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg flex justify-center">
                      <div className="w-12 h-8 bg-red-500 rounded flex items-center justify-center text-white text-xs font-bold">
                        MC
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg flex justify-center">
                      <div className="w-12 h-8 bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                        AMEX
                      </div>
                    </div>
                    <div className="p-3 border rounded-lg flex justify-center">
                      <div className="w-12 h-8 bg-purple-600 rounded flex items-center justify-center text-white text-xs font-bold">
                        mada
                      </div>
                    </div>
                  </div>
                  <RadioGroup
                    value={selectedPayment}
                    onValueChange={handlePaymentChange}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="pickup" id="pickup" />
                        <Label htmlFor="pickup" className="flex-1">
                          <div>
                            <p className="font-medium">الدفع عند الاستلام</p>
                            <p className="text-sm text-gray-500">
                              رسوم هذه الخدمة 28 ر.س
                            </p>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1">
                          البطاقة الائتمانية
                        </Label>
                      </div>

                      <div className="flex items-center space-x-2 p-4 border rounded-lg">
                        <RadioGroupItem value="stcpay" id="stcpay" />
                        <Label htmlFor="stcpay" className="flex-1">
                          STCPAY
                        </Label>
                      </div>
                    </div>
                  </RadioGroup>

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">فيصل_قناة_qitaf</p>
                        <p className="text-sm text-gray-500">
                          ستحصل على 6 نقاط
                        </p>
                        <p className="text-sm text-gray-500">
                          سيتم استرداد ضريبة في حالة طلبك
                        </p>
                      </div>
                      <Badge variant="secondary">5%</Badge>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      يجب أن يكون إجمالي أكثر من 250 ر.س لاستخدام الكوبون ولا
                      يمكن الجمع بين كوبون وعند اختيار قسائم شراء
                    </p>
                  </div>

                  <Button className="w-full mt-6">اتمام الطلب</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Delivery Info */}
            <Card>
              <CardHeader>
                <CardTitle>موعد التسليم</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">من 16 إلى 6 أيام</p>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">عنوان التسليم</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>زياد فيصل</p>
                    <p>
                      أم خميس مخيط - Khamis Mushayt، المملكة العربية السعودية
                    </p>
                    <p>966671277089</p>
                  </div>
                  <Button variant="link" className="p-0 text-blue-600 mt-2">
                    تعديل العنوان
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Product Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span>1</span>
                  العناصر
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                    <img
                      src="/api/placeholder/80/80"
                      alt="المنتج"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">The Ordinary</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      تونر مقشر بحمض الجليكوليك 7% - من ذا أورديناري - 240مل
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-bold">66 ر.س</span>
                      <div className="text-sm text-gray-500">الكمية: 1</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
