import React from "react";
import Head from "next/head";
import Link from "next/link";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>الشروط والأحكام - متجر العطور والمكياج</title>
        <meta
          name="description"
          content="شروط وأحكام استخدام متجرنا للعطور والمكياج في المملكة العربية السعودية"
        />
      </Head>

      <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* رأس الصفحة */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-black mb-4">
              الشروط والأحكام
            </h1>
            <p className="text-lg text-black opacity-80">
              آخر تحديث: {new Date().toLocaleDateString("ar-SA")}
            </p>
          </div>

          {/* زر العودة */}
          <div className="mb-8">
            <Link href="/" className="text-black hover:underline">
              ← العودة إلى الصفحة الرئيسية
            </Link>
          </div>

          {/* محتوى الشروط والأحكام */}
          <div className="prose prose-lg max-w-none text-black">
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">مقدمة</h2>
              <p className="mb-4">
                مرحبًا بكم في متجرنا الإلكتروني للعطور ومستحضرات التجميل. يرجى
                قراءة هذه الشروط والأحكام بعناية قبل استخدام الموقع أو إجراء أي
                عمليات شراء. باستخدامك لهذا الموقع، فإنك توافق على الالتزام بهذه
                الشروط والأحكام.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">المعلومات العامة</h2>
              <p className="mb-4">
                يعمل هذا المتجر الإلكتروني وفقًا لقوانين وأنظمة المملكة العربية
                السعودية. جميع المعاملات التي تتم عبر هذا الموقع تخضع للقوانين
                والتشريعات السعودية.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">المنتجات والأسعار</h2>
              <p className="mb-4">
                نحن نبذل قصارى جهدنا لضمان دقة معلومات المنتجات والأسعار
                المعروضة على الموقع. ومع ذلك، قد تحدث بعض الأخطاء في بعض
                الأحيان. نحتفظ بالحق في تصحيح أي أخطاء في الأسعار أو معلومات
                المنتج دون إشعار مسبق.
              </p>
              <p className="mb-4">
                الأسعار المعروضة تشمل ضريبة القيمة المضافة (15%) وفقًا لأنظمة
                المملكة العربية السعودية.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">الطلبات والدفع</h2>
              <p className="mb-4">
                عند تقديم طلب عبر الموقع، فإنك توافق على دفع السعر الكامل للطلب
                بما في ذلك رسوم الشحن (إن وجدت). نحن نقبل طرق الدفع المتاحة في
                المملكة العربية السعودية مثل:
              </p>
              <ul className="list-disc pr-6 mb-4">
                <li className="mb-2">الدفع عند الاستلام (للمدن المتاحة)</li>
                <li className="mb-2">الدفع بالبطاقة الإلكترونية</li>
                <li className="mb-2">التحويل البنكي</li>
                <li>الدفع عبر المحافظ الإلكترونية</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">الشحن والتسليم</h2>
              <p className="mb-4">
                نسعى لتسليم طلباتكم في أسرع وقت ممكن داخل المملكة العربية
                السعودية. مدة التسليم التقديرية من 2 إلى 7 أيام عمل حسب الموقع.
              </p>
              <p className="mb-4">
                قد تتأخر أوقات التسليم في الظروف غير العادية مثل الأعياد أو
                الأحداث الخاصة أو الظروف الجوية.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">
                سياسة الإرجاع والاستبدال
              </h2>
              <p className="mb-4">
                يمكنكم إرجاع أو استبدال المنتجات خلال 7 أيام من تاريخ الاستلام
                وفقًا للشروط التالية:
              </p>
              <ul className="list-disc pr-6 mb-4">
                <li className="mb-2">
                  أن يكون المنتج في حالته الأصلية وغير مستخدم
                </li>
                <li className="mb-2">أن يكون المنتج في عبوته الأصلية</li>
                <li className="mb-2">إرفاق فاتورة الشراء</li>
                <li>بعض المنتجات الاستهلاكية لا يمكن إرجاعها لأسباب صحية</li>
              </ul>
              <p className="mb-4">
                لمعالجة طلبات الإرجاع، يرجى التواصل مع خدمة العملاء على الرقم{" "}
                {`واتساب: 966500000000+`} أو عبر البريد الإلكتروني
                info@example.com
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">الخصوصية</h2>
              <p className="mb-4">
                نحن نلتزم بحماية خصوصيتكم. لا نشارك معلوماتكم الشخصية مع أي
                أطراف خارجية إلا للضرورات المتعلقة بتنفيذ الطلبات والالتزام
                بالأنظمة السعودية.
              </p>
              <p className="mb-4">
                بياناتكم محفوظة وفقًا لأنظمة حماية البيانات الشخصية في المملكة
                العربية السعودية.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">تعديل الشروط</h2>
              <p className="mb-4">
                نحتفظ بالحق في تعديل هذه الشروط والأحكام في أي وقت. سيتم نشر
                التعديلات على هذه الصفحة وسيكون تاريخ التحديث في أعلى الصفحة.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">الاتصال بنا</h2>
              <p className="mb-4">
                للاستفسارات أو الملاحظات حول الشروط والأحكام، يرجى التواصل معنا
                عبر:
              </p>
              <p className="mb-2">البريد الإلكتروني: info@example.com</p>
              <p className="mb-2">هاتف: 966110000000+</p>
              <p>واتساب: 966500000000+</p>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200">
              <p className="text-center text-black opacity-70">
                © {new Date().getFullYear()} متجر العطور والمكياج. جميع الحقوق
                محفوظة.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
