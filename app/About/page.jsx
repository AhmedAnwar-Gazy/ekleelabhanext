export const dynamic = "force-static"; // يخلي الصفحة SSG

import React from "react";
import Head from "next/head";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AklilAbhaStore() {
  return (
    <>
      <Head>
        <title>اكليل أبها - متجر العطور ومستحضرات التجميل الفاخرة</title>
        <meta
          name="description"
          content="اكتشف أجمل العطور وأفضل مستحضرات التجميل من متجر اكليل أبها في المملكة العربية السعودية"
        />
      </Head>

      <div className="min-h-screen bg-white text-black">
        {/* الهيرو */}
        <div className="relative h-96 w-full mb-12">
          <Image
            src="/perfume-store-banner.jpg"
            alt="متجر اكليل أبها للعطور ومستحضرات التجميل"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
            <div className="text-center text-white">
              <h1 className="text-5xl font-bold mb-4">اكليل أبها</h1>
              <p className="text-xl">
                عطور فاخرة ومستحضرات تجميل استثنائية من قلب المملكة
              </p>
              <Button className="mt-6 bg-white text-black hover:bg-gray-100 px-8 py-3">
                تصفح المنتجات
              </Button>
            </div>
          </div>
        </div>

        {/* المحتوى الرئيسي */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* العمود الرئيسي */}
            <div className="md:col-span-2">
              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-black pb-2">
                  عن متجرنا
                </h2>
                <p className="mb-4 text-lg leading-relaxed">
                  متجر اكليل أبها هو الوجهة المثالية لعشاق العطور ومستحضرات
                  التجميل في المملكة العربية السعودية. نحن نقدم مجموعة مختارة
                  بعناية من أفضل العطور العالمية والمحلية، بالإضافة إلى مستحضرات
                  تجميل عالية الجودة من أشهر الماركات العالمية.
                </p>
                <p className="mb-4 text-lg leading-relaxed">
                  تأسس متجرنا في أبها عام 2010، ونسعى دائمًا لتقديم منتجات
                  استثنائية وخدمة عملاء متميزة، مع الحفاظ على أصالة وتراث
                  المنطقة الجنوبية للمملكة.
                </p>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-black pb-2">
                  فئات المنتجات
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">
                        عطور رجالية
                      </h3>
                      <p className="mb-4">
                        مجموعة مميزة من العطور الرجالية الفاخرة من أشهر الماركات
                        العالمية والمحلية.
                      </p>
                      <Button
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-white"
                      >
                        تصفح العطور الرجالية
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">
                        عطور نسائية
                      </h3>
                      <p className="mb-4">
                        أجمل العطور النسائية التي تناسب جميع الأذواق والمناسبات،
                        من أشهر بيوت العطور.
                      </p>
                      <Button
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-white"
                      >
                        تصفح العطور النسائية
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">
                        مستحضرات تجميل
                      </h3>
                      <p className="mb-4">
                        أفضل مستحضرات التجميل والعناية بالبشرة من ماركات عالمية
                        موثوقة.
                      </p>
                      <Button
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-white"
                      >
                        تصفح المستحضرات
                      </Button>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-gray-200 rounded-lg overflow-hidden">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-3">
                        عطور عربية أصيلة
                      </h3>
                      <p className="mb-4">
                        مجموعة خاصة من العطور العربية الأصيلة المستوحاة من تراث
                        وتقاليد المنطقة.
                      </p>
                      <Button
                        variant="outline"
                        className="border-black text-black hover:bg-black hover:text-white"
                      >
                        اكتشف العطور العربية
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-bold mb-6 border-b-2 border-black pb-2">
                  لماذا تختار اكليل أبها؟
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      جودة المنتجات
                    </h3>
                    <p className="mb-4">
                      نحن نضمن جودة جميع منتجاتنا ونعمل فقط مع موردين موثوقين
                      وماركات عالمية معروفة.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">خدمة العملاء</h3>
                    <p className="mb-4">
                      فريق خدمة العملاء لدينا متاح دائمًا لمساعدتك في اختيار
                      المنتجات المناسبة والإجابة على استفساراتك.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">شحن سريع</h3>
                    <p className="mb-4">
                      نقدم خدمة شحن سريعة وآمنة لجميع أنحاء المملكة العربية
                      السعودية، مع خيارات متعددة للتوصيل.
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* العمود الجانبي */}
            <div className="space-y-8">
              <Card className="bg-gray-100 border-0 rounded-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 border-b border-black pb-2">
                    معلومات المتجر
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="font-medium ml-2">العنوان:</span>
                      <span>أبها، حي الشفا، شارع الملك عبدالعزيز</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium ml-2">الهاتف:</span>
                      <span>017 123 4567</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium ml-2">الواتساب:</span>
                      <span>055 123 4567</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium ml-2">
                        البريد الإلكتروني:
                      </span>
                      <span>info@aklilabha.com</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-medium ml-2">ساعات العمل:</span>
                      <span>9 ص - 11 م (طوال الأسبوع)</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="bg-gray-100 border-0 rounded-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 border-b border-black pb-2">
                    العروض الخاصة
                  </h3>
                  <p className="mb-4">
                    استفد من عروضنا الخاصة هذا الأسبوع على مجموعة مختارة من
                    العطور ومستحضرات التجميل.
                  </p>
                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    مشاهدة العروض
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gray-100 border-0 rounded-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 border-b border-black pb-2">
                    اشترك في نشرتنا
                  </h3>
                  <p className="mb-4">
                    اشترك في نشرتنا البريدية لتصلك آخر العروض والمنتجات الجديدة
                    مباشرة إلى بريدك الإلكتروني.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="بريدك الإلكتروني"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                    />
                    <Button className="w-full bg-black text-white hover:bg-gray-800">
                      اشتراك
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* العلامات التجارية */}
          <section className="my-16">
            <h2 className="text-3xl font-bold mb-8 text-center">
              العلامات التجارية التي نتعامل معها
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="flex items-center justify-center h-24 border border-gray-200 rounded-lg p-4">
                <span className="text-xl font-bold">Channel</span>
              </div>
              <div className="flex items-center justify-center h-24 border border-gray-200 rounded-lg p-4">
                <span className="text-xl font-bold">Dior</span>
              </div>
              <div className="flex items-center justify-center h-24 border border-gray-200 rounded-lg p-4">
                <span className="text-xl font-bold">Yves Saint Laurent</span>
              </div>
              <div className="flex items-center justify-center h-24 border border-gray-200 rounded-lg p-4">
                <span className="text-xl font-bold">Arabian Oud</span>
              </div>
            </div>
          </section>

          {/* خاتمة */}
          <section className="text-center py-12 border-t border-gray-300">
            <h2 className="text-2xl font-bold mb-6">
              اكتشف عالم العطور والجمال مع اكليل أبها
            </h2>
            <p className="max-w-3xl mx-auto text-lg mb-8">
              نقدم لكم تجربة تسوق فريدة تجمع بين أصالة التراث السعودي وأناقة
              العطور العالمية. زورونا في متجرنا في أبها أو تسوقوا عبر موقعنا
              الإلكتروني.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-black text-white px-8 py-3 hover:bg-gray-800">
                زيارة المتجر
              </Button>
              <Button
                variant="outline"
                className="border-black text-black px-8 py-3 hover:bg-black hover:text-white"
              >
                التسوق عبر الإنترنت
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
