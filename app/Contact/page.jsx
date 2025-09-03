
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
    subject: "",
    category: "",
    subCategory: "",
    message: "",
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  const cities = [
    "الرياض",
    "جدة",
    "الدمام",
    "مكة المكرمة",
    "المدينة المنورة",
    "الطائف",
    "تبوك",
  ];
  const states = [
    "المنطقة الشرقية",
    "منطقة الرياض",
    "منطقة مكة المكرمة",
    "المنطقة الشمالية",
    "منطقة عسير",
  ];
  const categories = [
    "العطور",
    "المكياج",
    "العناية بالبشرة",
    "العناية بالشعر",
    "الإكسسوارات",
  ];
  const subCategories = {
    العطور: ["عطور نسائية", "عطور رجالية", "عطور أطفال", "عطور طبيعية"],
    المكياج: ["أحمر شفاه", "كريم أساس", "ماسكارا", "آيشادو", "بودرة"],
    "العناية بالبشرة": ["كريم مرطب", "غسول وجه", "تونر", "سيروم", "واقي شمس"],
    "العناية بالشعر": ["شامبو", "بلسم", "زيوت طبيعية", "ماسك للشعر"],
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (field === "category") {
      setFormData((prev) => ({ ...prev, subCategory: "" }));
    }
  };

  const handleSubmit = () => {
    console.log("Form submitted:", formData);
    alert("تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.");
  };

  const DropdownField = ({ label, value, options, field, placeholder }) => (
    <div className="relative mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2 text-right">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpenDropdown(openDropdown === field ? null : field)}
          className="w-full p-3 border border-gray-300 rounded-lg bg-white text-right flex items-center justify-between hover:border-purple-300 focus:border-purple-500 focus:outline-none transition-colors"
        >
          <ChevronDown
            className={`w-5 h-5 text-gray-400 transform transition-transform ${
              openDropdown === field ? "rotate-180" : ""
            }`}
          />
          <span className={value ? "text-gray-800" : "text-gray-400"}>
            {value || placeholder}
          </span>
        </button>

        {openDropdown === field && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={() => {
                  handleInputChange(field, option);
                  setOpenDropdown(null);
                }}
                className="w-full p-3 text-right hover:bg-purple-50 border-b border-gray-100 last:border-b-0 transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-amber-50 from-pink-50 to-purple-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">اتصل بنا</h1>
          <p className="text-gray-600 leading-relaxed text-right">
            يسعدنا أن نتلقى استفساراتكم وآرائكم حول جميع منتجاتنا الجمالية من
            عطور ومكياج ومنتجات العناية. فريقنا متاح للإجابة على كل أسئلتكم
            وتقديم المساعدة والإرشاد. للحصول على أفضل خدمة، يرجى ملء النموذج
            أدناه بالتفصيل.
          </p>
          <p className="text-sm  mt-2">
            خدمة العملاء: <span className="font-bold">0501234567</span>
          </p>
        </div>

        {/* Contact Form */}
        <Card className=" border">
          <CardContent className="p-8">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 text-right">
                  الاسم *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-right focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="اكتب اسمك الكامل"
                />
              </div>

              {/* Email Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 text-right">
                  البريد الإلكتروني *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-right focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="example@email.com"
                />
              </div>

              {/* City Dropdown */}
              <DropdownField
                label="المدينة"
                value={formData.city}
                options={cities}
                field="city"
                placeholder="-- اختر المدينة --"
              />

              {/* State Dropdown */}
              <DropdownField
                label="المنطقة"
                value={formData.state}
                options={states}
                field="state"
                placeholder="-- اختر المنطقة --"
              />

              {/* Subject Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 text-right">
                  العنوان *
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg text-right focus:border-purple-500 focus:outline-none transition-colors"
                  placeholder="عنوان الرسالة"
                />
              </div>

              {/* Category Dropdown */}
              <DropdownField
                label="الموضوع"
                value={formData.category}
                options={categories}
                field="category"
                placeholder="-- اختر نوع المنتج --"
              />

              {/* Sub-Category Dropdown */}
              {formData.category && (
                <DropdownField
                  label="الموضوع الفرعي"
                  value={formData.subCategory}
                  options={subCategories[formData.category] || []}
                  field="subCategory"
                  placeholder="-- اختر المنتج المحدد --"
                />
              )}

              {/* Message Field */}
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2 text-right">
                  الرسالة *
                </label>
                <textarea
                  required
                  value={formData.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg text-right focus:border-purple-500 focus:outline-none transition-colors resize-none"
                  placeholder="اكتب رسالتك هنا..."
                />
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-teal-900 from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
              >
                إرسال
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <div className="mt-8 text-center">
          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-purple-600 mb-2">
                أوقات العمل
              </h3>
              <p>السبت - الخميس: 9:00 - 22:00</p>
              <p>الجمعة: 14:00 - 22:00</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-purple-600 mb-2">التوصيل</h3>
              <p>توصيل مجاني للطلبات فوق 200 ريال</p>
              <p>توصيل سريع خلال 24 ساعة</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-purple-600 mb-2">الضمان</h3>
              <p>ضمان الجودة 100%</p>
              <p>إمكانية الإرجاع خلال 7 أيام</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
