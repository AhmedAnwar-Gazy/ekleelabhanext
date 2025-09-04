"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User, Mail, MapPin, Edit, Calendar } from "lucide-react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("profile"); // تبويب افتراضي

  const [formData, setFormData] = useState({
    firstName: "زياد",
    lastName: "فيصل",
    email: "fisa1191919@gmail.com",
    phone: "571277089",
    countryCode: "+966",
    birthDate: "28-12-2001",
    gender: "ذكر",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // المحتوى يتغير حسب التبويب
  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return (
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-bold">حسابي</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">الإسم الأول</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) =>
                      handleInputChange("firstName", e.target.value)
                    }
                    className="text-right"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">الإسم الأخير</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) =>
                      handleInputChange("lastName", e.target.value)
                    }
                    className="text-right"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">الايميل</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="text-right"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <Label htmlFor="phone">رقم الجوال</Label>
                <div className="flex gap-2">
                  <Select
                    value={formData.countryCode}
                    onValueChange={(value) =>
                      handleInputChange("countryCode", value)
                    }
                  >
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="+966">🇸🇦 +966</SelectItem>
                      <SelectItem value="+971">🇦🇪 +971</SelectItem>
                      <SelectItem value="+965">🇰🇼 +965</SelectItem>
                      <SelectItem value="+973">🇧🇭 +973</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="flex-1 text-right"
                  />
                </div>
              </div>

              {/* Birth Date */}
              <div className="space-y-2">
                <Label htmlFor="birthDate">تاريخ الميلاد</Label>
                <div className="relative">
                  <Input
                    id="birthDate"
                    value={formData.birthDate}
                    onChange={(e) =>
                      handleInputChange("birthDate", e.target.value)
                    }
                    className="text-right"
                  />
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Gender */}
              <div className="space-y-3">
                <Label>الجنس</Label>
                <RadioGroup
                  value={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="ذكر" id="male" />
                    <Label htmlFor="male">ذكر</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="أنثى" id="female" />
                    <Label htmlFor="female">أنثى</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="pt-4">
                <Button className="w-full bg-black text-white py-4 text-lg font-semibold">
                  تعديل
                </Button>
              </div>
            </CardContent>
          </Card>
        );

      case "gift":
        return (
          <Card>
            <CardHeader>
              <CardTitle>إهداء رصيد</CardTitle>
            </CardHeader>
            <CardContent>هنا محتوى إهداء الرصيد</CardContent>
          </Card>
        );

      case "orders":
        return (
          <Card>
            <CardHeader>
              <CardTitle>الطلبات</CardTitle>
            </CardHeader>
            <CardContent>هنا محتوى الطلبات</CardContent>
          </Card>
        );

      case "reminders":
        return (
          <Card>
            <CardHeader>
              <CardTitle>تذكري</CardTitle>
            </CardHeader>
            <CardContent>هنا محتوى التذكير</CardContent>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4" dir="rtl">
      <div className="max-w-7xl mx-auto flex gap-6">
        {/* Sidebar */}
        <div className="w-64 space-y-2">
          <div className="bg-white rounded-md">
            <div className="p-4">
              <h1 className="text-2xl font-bold text-gray-900">
                مرحباً زياد فيصل
              </h1>
            </div>
            <div className="p-4">
              <div
                onClick={() => setActiveTab("profile")}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                  activeTab === "profile"
                    ? "text-teal-900 bg-teal-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <User className="h-5 w-5" />
                <span className="font-medium">حسابي</span>
              </div>
              <div
                onClick={() => setActiveTab("gift")}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                  activeTab === "gift"
                    ? "text-teal-900 bg-teal-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Edit className="h-4 w-4" />
                <span>إهداء رصيد</span>
              </div>
              <div
                onClick={() => setActiveTab("orders")}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                  activeTab === "orders"
                    ? "text-teal-900 bg-teal-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Mail className="h-4 w-4" />
                <span>الطلبات</span>
              </div>
              <div
                onClick={() => setActiveTab("reminders")}
                className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer ${
                  activeTab === "reminders"
                    ? "text-teal-900 bg-teal-100"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <MapPin className="h-4 w-4" />
                <span>تذكري</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
}
