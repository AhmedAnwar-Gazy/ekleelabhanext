import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-8xl p-8">
      <Card className="p-6 md:p-8">
        {/* 1. Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">
            أهلاً بك في إكليل أبها
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            قصةٌ من الطبيعة، نبعت من قلب مدينة أبها الخضراء لتقدم لكم أجود
            منتجات العسل والزيوت.
          </p>
        </section>

        {/* 2. Our Story Section */}
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">قصتنا</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              بدأت رحلتنا في عام 2020، بحبٍ خالص لجمال الطبيعة في أبها. من هنا،
              جاءت فكرة "إكليل أبها" لنوصل لكم خيرات الأرض الطيبة.
            </p>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              نعمل بشغفٍ لنقدم لكم منتجات طبيعية 100%، بدءاً من اختيار أفضل
              مواقع إنتاج العسل وصولاً إلى عصر الزيوت بأحدث الطرق، لنضمن لكم
              جودة لا مثيل لها.
            </p>
          </div>
          <div className="relative">
            {/* You can put an image here related to Abha or your products */}
            <div className="w-full h-80 bg-gray-200 rounded-lg"></div>
          </div>
        </section>

        {/* 3. Mission and Vision Section */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-8">
            رؤيتنا ورسالتنا
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>رسالتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  تقديم منتجات طبيعية عالية الجودة من قلب أبها، لتكون جزءاً من
                  حياة صحية ومستدامة لعملائنا.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>رؤيتنا</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  أن نصبح الخيار الأول للمنتجات الطبيعية الموثوقة في المملكة،
                  بفضل جودتنا العالية وقيمنا الأصيلة.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 4. Testimonials Section (using Carousel) */}
        <section>
          <h2 className="text-3xl font-semibold text-center mb-8">
            ماذا يقول عملاؤنا؟
          </h2>
          <Carousel className="w-full max-w-lg mx-auto">
            <CarouselContent>
              <CarouselItem>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <p className="italic">
                      "جودة العسل تفوق الوصف! لقد أصبح منتجكم الأساسي في بيتي."
                    </p>
                    <p className="mt-4 font-semibold">- سارة .أ</p>
                  </CardContent>
                </Card>
              </CarouselItem>
              <CarouselItem>
                <Card>
                  <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                    <p className="italic">
                      "الزيوت الطبيعية من إكليل أبها غيّرت روتين العناية ببشرتي
                      تماماً. شكراً لكم!"
                    </p>
                    <p className="mt-4 font-semibold">- محمد .ع</p>
                  </CardContent>
                </Card>
              </CarouselItem>
              {/* Add more testimonials here */}
            </CarouselContent>
          </Carousel>
        </section>

        {/* 5. Call to Action Section */}
        <section className="text-center space-y-4">
          <h2 className="text-3xl font-semibold">استكشف منتجاتنا</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            نحن ندعوك لتجربة منتجاتنا الطبيعية والفريدة.
          </p>
          <Button size="lg" className="mt-4">
            تسوق الآن
          </Button>
        </section>
      </Card>
    </div>
  );
}
