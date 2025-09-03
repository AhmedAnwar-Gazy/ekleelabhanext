import React, { useState } from 'react';
import { ChevronDown, Star, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState('description');
  const [showMoreDescription, setShowMoreDescription] = useState(false);

  const tabs = [
    { id: 'description', label: 'الوصف', count: null },
    { id: 'specifications', label: 'مواصفات', count: null },
    { id: 'reviews', label: 'التقييمات', count: 94 }
  ];

  const specifications = [
    { label: 'النوع', value: 'برايمر' },
    { label: 'الماركة', value: 'توب فيس (Topface)' },
    { label: 'الحجم', value: '30 مل' },
    { label: 'اللون', value: 'شفاف' },
    { label: 'نوع البشرة', value: 'جميع أنواع البشرة' },
    { label: 'المكونات الرئيسية', value: 'معادن طبيعية' },
    { label: 'بلد المنشأ', value: 'تركيا' },
    { label: 'مدة الصلاحية', value: '36 شهر' }
  ];

  const reviews = [
    {
      id: 1,
      name: 'سارة أحمد',
      rating: 5,
      date: '2024-01-15',
      comment: 'منتج ممتاز جداً، يجعل البشرة ناعمة ومخفي المسام بشكل رائع. أنصح به بشدة!',
      verified: true
    },
    {
      id: 2,
      name: 'نور محمد',
      rating: 5,
      date: '2024-01-10',
      comment: 'استخدمه يومياً قبل الميكب، يثبت الميكياج لفترة طويلة ولا يسبب حساسية.',
      verified: true
    },
    {
      id: 3,
      name: 'مريم علي',
      rating: 4,
      date: '2024-01-08',
      comment: 'جيد جداً لكن أتمنى لو كان الحجم أكبر. الملمس خفيف وغير دهني.',
      verified: false
    },
    {
      id: 4,
      name: 'فاطمة خالد',
      rating: 5,
      date: '2024-01-05',
      comment: 'أفضل برايمر جربته! يخفي المسام ويجعل البشرة مثل الحرير.',
      verified: true
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'description':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              برايمر سينسيتيف ميزرال لتصغير المسام من توب فيس
            </h3>
            <h4 className="text-lg font-medium text-gray-800">
              لبشرة مثالية وناعمة
            </h4>
            
            <div className="text-gray-700 leading-relaxed">
              <p className="mb-4">
                برايمر كريمي رقيق ملائم لمختلف درجات البشرة، حيث يعمل على ترطيبها وتركها ملمس ناعم، 
                يساعد في تقليل المسام وإزالة اللمعان الدهني، وما يجعل التخدد من أجل مكياج فخم بدون خطوط.
              </p>
              
              {showMoreDescription && (
                <div className="space-y-4">
                  <h5 className="font-medium text-gray-900">المميزات الرئيسية:</h5>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    <li>يقلل من ظهور المسام بشكل فوري</li>
                    <li>يوحد لون البشرة ويخفي العيوب الطفيفة</li>
                    <li>يثبت الميكياج لساعات أطول</li>
                    <li>مناسب لجميع أنواع البشرة بما في ذلك البشرة الحساسة</li>
                    <li>خالي من البارابين والكحول</li>
                    <li>يحتوي على معادن طبيعية مغذية للبشرة</li>
                  </ul>
                  
                  <h5 className="font-medium text-gray-900">طريقة الاستخدام:</h5>
                  <ol className="list-decimal list-inside space-y-2 text-gray-700">
                    <li>نظفي بشرتك جيداً وضعي المرطب</li>
                    <li>ضعي كمية صغيرة من البرايمر على الوجه</li>
                    <li>وزعيه بلطف بحركات دائرية</li>
                    <li>انتظري دقيقة قبل وضع كريم الأساس</li>
                  </ol>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              onClick={() => setShowMoreDescription(!showMoreDescription)}
              className="text-blue-600 hover:text-blue-800 p-0 h-auto"
            >
              {showMoreDescription ? 'مشاهدة أقل' : 'مشاهدة المزيد'}
              <ChevronDown 
                className={`h-4 w-4 mr-1 transition-transform ${
                  showMoreDescription ? 'rotate-180' : ''
                }`} 
              />
            </Button>
          </div>
        );

      case 'specifications':
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">
              مواصفات المنتج
            </h3>
            
            <div className="grid gap-4">
              {specifications.map((spec, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-900">{spec.label}</span>
                  <span className="text-gray-700">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-900">
                تقييمات العملاء ({reviews.length})
              </h3>
              <div className="flex items-center gap-2">
                {renderStars(5)}
                <span className="font-medium">5.0 من 5</span>
              </div>
            </div>

            <div className="grid gap-4">
              {reviews.map((review) => (
                <Card key={review.id} className="border border-gray-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h5 className="font-medium text-gray-900">{review.name}</h5>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  مشتري معتمد
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        {renderStars(review.rating)}
                      </div>
                      
                      <p className="text-gray-700 leading-relaxed">
                        {review.comment}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="min-w-32">
                عرض المزيد من التقييمات
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 m-5 bg-white" dir="rtl">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <div className="flex space-x-8 space-x-reverse">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-2 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-gray-900 text-gray-900'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.label}
              {tab.count && (
                <span className="mr-2 text-gray-400">({tab.count})</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="py-8">
        {renderTabContent()}
      </div>
    </div>
  );
};

export default ProductTabs;