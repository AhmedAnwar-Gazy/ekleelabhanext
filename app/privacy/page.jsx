export const dynamic = "force-static"; // يخلي الصفحة SSG

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Shield,
  Calendar,
  Database,
  Mail,
  Globe,
  Lock,
  Eye,
  UserCheck,
} from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-purple-50"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex items-center justify-center mb-6">
            <Shield className="w-12 h-12 ml-4" />
            <h1 className="text-4xl font-bold">سياسة الخصوصية</h1>
          </div>
          <div className="text-center">
            <p className="text-xl opacity-90 mb-2">
              إكليل أبها للعطور ومستحضرات التجميل
            </p>
            <div className="flex items-center justify-center text-sm opacity-80">
              <Calendar className="w-4 h-4 ml-2" />
              <span>آخر تحديث: 28/07/2024</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Introduction */}
        <Card className="mb-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardContent className="p-8">
            <p className="text-gray-700 leading-8 text-lg">
              نحن في إكليل أبها نهتم بخصوصيتكم وثقة عملائنا. تصف جميع أنواع
              المعلومات الشخصية التي نجمعها من عملائنا وطريقة استخدامنا
              للمعلومات ومع من قد نشاركها والخيارات المتوفرة لعملائنا بالنسبة
              لاستخدامنا للمعلومات والمقاييس التي نتخذها لحماية المعلومات وكيفية
              تواصل عملائنا معنا فيما يخص إجراءاتنا الخاصة.
            </p>
          </CardContent>
        </Card>

        {/* Data Collection */}
        <Card className="mb-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl text-purple-800">
              <Database className="w-7 h-7 ml-3" />
              البيانات التي نقوم بجمعها من خلال زياراتك لموقع نايس ون
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-7">
              في كل مرة تقوم بزيارة موقع نايس ون الإلكتروني، نقوم بإرسال
              المعلومات من المتصفح الخاص بك إلى خادم خاص لدينا والذي يقوم بتخزين
              هناك والذي تتم مراجعة بياناته والتحقق والتنقيح التي قمت بعرضها
              ومتى وعنوان المعلومات الشخصية.
            </p>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border-r-4 border-purple-400">
              <p className="text-gray-700 leading-7">
                إذا قام بالتحقق الخاص بك والعنوان الإلكتروني الذي قام بتوجيهك
                إلى موقع نايس ون الإلكتروني ونوع المتصفح ونظام تشغيل الجهاز
                المستخدم.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Information Storage */}
        <Card className="mb-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl text-purple-800">
              <Lock className="w-7 h-7 ml-3" />
              أمن المعلومات
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-700 leading-7">
              كجزء من تسجيلك في هذا الموقع سوف نطلب منك أن تقدم لنا بعض
              المعلومات الشخصية، مثل اسمك، عنوان الشحن، وعنوان البريد الإلكتروني
              ورقم الهاتف ومعلومات أخرى مماثلة وكذلك بعض المعلومات الإضافية
              الخاصة عنك مثل تاريخ الميلاد أو جهتها من المعلومات الشخصية.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <Eye className="w-5 h-5 text-blue-600 ml-2" />
                  <h4 className="font-semibold text-blue-800">الشفافية</h4>
                </div>
                <p className="text-sm text-gray-700">
                  نلتزم بالشفافية الكاملة حول كيفية جمع واستخدام بياناتكم
                  الشخصية.
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-6 rounded-lg">
                <div className="flex items-center mb-3">
                  <UserCheck className="w-5 h-5 text-green-600 ml-2" />
                  <h4 className="font-semibold text-green-800">الموافقة</h4>
                </div>
                <p className="text-sm text-gray-700">
                  نحصل على موافقتكم الصريحة قبل جمع أو استخدام أي من معلوماتكم
                  الشخصية.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Data Storage */}
        <Card className="mb-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl text-purple-800">
              <Database className="w-7 h-7 ml-3" />
              تخزين المعلومات
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-7 mb-6">
              نحن نقوم بتخزين المعلومات الشخصية الخاصة بك على خوادم أمينة
              ومحمية. في خلال تقديم المعلومات الشخصية الخاصة بك فإنت تقبل بنقل
              معلوماتك الشخصية وتخزينها على الخوادم الخاصة بنا.
            </p>

            <div className="bg-amber-50 border-r-4 border-amber-400 p-6 rounded-lg">
              <p className="text-gray-700 leading-7">
                <strong>تنويه مهم:</strong> على الرغم من أننا نبذل قصارى جهدنا
                لحماية البيانات الخاصة بك، فإنك تفهم أنه لا يمكن ضمان أمن
                البيانات المرسلة إلى موقعنا أو وقت نقلها إليك عبر الإنترنت.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Email Communications */}
        <Card className="mb-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl text-purple-800">
              <Mail className="w-7 h-7 ml-3" />
              البريد الإلكتروني
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-7">
              في بعض الأحيان قد نرسل معلومات متعلقة بالعروض التسويقية أو
              المبادلات والتي تعتقد أنها قد تكون ذات فائدة لك. قمت بتقديم هذه
              الخدمة إذا كنت ترغب في ذلك، ويمكنك إيقاف الاشتراك من قائمة التسويق
              لدينا في أي وقت عن طريق النقر على رابط إلغاء الاشتراك داخل أي
              رسالة بريد إلكتروني نرسلها لك.
            </p>
          </CardContent>
        </Card>

        {/* Cookie Policy */}
        <Card className="mb-8 shadow-lg border-0 bg-white/70 backdrop-blur-sm">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-2xl text-purple-800">
              <Globe className="w-7 h-7 ml-3" />
              ملفات تعريف الارتباط (الكوكيز)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-7">
              يستخدم موقع نايس ون الإلكتروني ملفات تعريف الارتباط "الكوكيز" لجمع
              الجلسة على متصفحك وقد يتم جمع أي معلومات شخصية من خلاله حيث أننا
              نقوم بتخزين الكوكيز لتسهل لك استخدام الموقع وبان نتفاعل مع الموقع
              بشكل متوافق.
            </p>
          </CardContent>
        </Card>

        {/* Contact Section */}
        <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-100 via-pink-100 to-rose-100">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl text-purple-800">
              للتواصل معنا
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-reverse space-x-8">
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-purple-600 ml-2" />
                <span className="text-gray-700">info@akleelabha.com</span>
              </div>
              <div className="flex items-center">
                <Globe className="w-5 h-5 text-purple-600 ml-2" />
                <span className="text-gray-700">www.akleelabha.com</span>
              </div>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              إذا كان لديك أي استفسارات حول سياسة الخصوصية هذه أو ممارساتنا
              المتعلقة بمعلوماتك الشخصية، يرجى التواصل معنا عبر البريد
              الإلكتروني أو الموقع الإلكتروني.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-purple-400 ml-3" />
            <h3 className="text-2xl font-bold">إكليل أبها</h3>
          </div>
          <p className="text-gray-300 mb-2">للعطور ومستحضرات التجميل</p>
          <p className="text-sm text-gray-400">
            جميع الحقوق محفوظة © {new Date().getFullYear()} إكليل أبها
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
