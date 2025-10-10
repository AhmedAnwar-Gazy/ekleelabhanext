// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import PerfumeNavbar from "@/components/layout/Navbar";
import { Footer2 } from "@/components/layout/footer2";
// import { CartProvider } from "@/lib/CartContext";
// import { Cairo } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "./store/providers";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// const cairo = Cairo({
//   subsets: ["arabic", "latin"], // ضروري للغة العربية
//   weight: ["400", "700"], // الأوزان اللي تحتاجها
//   variable: "--font-cairo", // نربطه بـ CSS variable
// });

export const metadata = {
  title: {
    default: "اكليل ابها",
    template: "%s | اكليل ابها", // لكل صفحة يضيف اسم الموقع
  },
  description:
    "اكليل ابها - متجر عطور فاخر يقدم أفضل وأرقى العطور العالمية والمحلية. تسوق الآن واكتشف تشكيلتنا المميزة.",
  keywords: [
    "اكليل ابها",
    "متجر عطور",
    "عطور نسائية",
    "عطور رجالية",
    "Luxury Perfumes",
    "Perfume Store",
  ],
  openGraph: {
    title: "اكليل ابها | متجر العطور الفاخر",
    description:
      "اكتشف تشكيلتنا المميزة من العطور الفاخرة. تسوق الآن من اكليل ابها.",
    url: "https://your-domain.com",
    siteName: "اكليل ابها",
    images: [
      {
        url: "https://your-domain.com/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "اكليل ابها - متجر العطور الفاخر",
      },
    ],
    locale: "ar_SA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "اكليل ابها | متجر العطور الفاخر",
    description: "أفضل العطور الرجالية والنسائية من اكليل ابها.",
    images: ["https://your-domain.com/images/og-banner.png"],
    creator: "@your_twitter_handle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  // manifest: "/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      {/* <body className={`${cairo.variable}  antialiased`}> */}
      <body className="antialiased">
        <Providers>
          {/* <body> */}
          <PerfumeNavbar />
          <div className="bg-neutral-50">{children}</div>
          <Footer2 />
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
