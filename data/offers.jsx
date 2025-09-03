// data/offers.js

export const OFFER_CATEGORIES = {
  SUMMER_DEALS: "summer_deals",
  LUXURY_PERFUMES: "luxury_perfumes",
  MAKEUP_BEAUTY: "makeup_beauty",
  SKINCARE: "skincare",
  NEW_ARRIVALS: "new_arrivals",
  BESTSELLERS: "bestsellers",
};

export const OFFER_TYPES = {
  PERCENTAGE: "percentage",
  FIXED_AMOUNT: "fixed_amount",
  BUY_ONE_GET_ONE: "bogo",
  FREE_SHIPPING: "free_shipping",
};

export const offersData = [
  {
    id: 1,
    name: "عرض العطور الفاخرة",
    description: "خصم 30% على مجموعة مختارة من العطور الفاخرة",
    originalPrice: 450,
    discountedPrice: 315,
    discountPercentage: 30,
    image:
      "https://d1aq4ubbxe020v.cloudfront.net/image/catalog%2Fapp_component%2F53389929_Popup_Artboard1copy-051.png?format=auto&width=1600",
    category: OFFER_CATEGORIES.LUXURY_PERFUMES,
    offerType: OFFER_TYPES.PERCENTAGE,
    brand: "Tom Ford",
    validUntil: "2025-09-30",
    isActive: true,
    featured: true,
    tags: ["عطور", "فاخر", "رجالي", "نسائي"],
  },
  {
    id: 2,
    name: "عروض الصيف الحصرية",
    description: "تخفيضات تصل إلى 50% على العطور الصيفية المنعشة",
    originalPrice: 320,
    discountedPrice: 160,
    discountPercentage: 50,
    image:
      "https://d1aq4ubbxe020v.cloudfront.net/image/catalog%2Fapp_component%2F55192633_summerbanner-calla-117.png?format=auto&width=1600",
    category: OFFER_CATEGORIES.SUMMER_DEALS,
    offerType: OFFER_TYPES.PERCENTAGE,
    brand: "Chanel",
    validUntil: "2025-08-31",
    isActive: true,
    featured: true,
    tags: ["صيفي", "منعش", "خفيف"],
  },
  {
    id: 3,
    name: "مجموعة الماكياج والتجميل",
    description: "اشتري قطعتين واحصلي على الثالثة مجاناً",
    originalPrice: 280,
    discountedPrice: 186,
    discountPercentage: 33,
    image:
      "https://d1aq4ubbxe020v.cloudfront.net/image/catalog%2Fapp_component%2F23503985_makeover22banner-2-140.png?format=auto&width=1600",
    category: OFFER_CATEGORIES.MAKEUP_BEAUTY,
    offerType: OFFER_TYPES.BUY_ONE_GET_ONE,
    brand: "MAC Cosmetics",
    validUntil: "2025-10-15",
    isActive: true,
    featured: false,
    tags: ["ماكياج", "تجميل", "أحمر شفاه", "كونسيلر"],
  },
  {
    id: 4,
    name: "منتجات العناية بالبشرة",
    description: "خصم 25% على جميع منتجات العناية والترطيب",
    originalPrice: 195,
    discountedPrice: 146,
    discountPercentage: 25,
    image:
      "https://d1aq4ubbxe020v.cloudfront.net/image/catalog%2Fapp_component%2F77336971_summerbanner-web-29.png?format=auto&width=1150",
    category: OFFER_CATEGORIES.SKINCARE,
    offerType: OFFER_TYPES.PERCENTAGE,
    brand: "La Mer",
    validUntil: "2025-09-15",
    isActive: true,
    featured: false,
    tags: ["عناية", "ترطيب", "مضاد للشيخوخة"],
  },
  {
    id: 5,
    name: "الوافدات الجديدة",
    description: "اكتشف أحدث العطور لعام 2025 مع خصم 20%",
    originalPrice: 380,
    discountedPrice: 304,
    discountPercentage: 20,
    image:
      "https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2004&q=80",
    category: OFFER_CATEGORIES.NEW_ARRIVALS,
    offerType: OFFER_TYPES.PERCENTAGE,
    brand: "Dior",
    validUntil: "2025-12-31",
    isActive: true,
    featured: true,
    tags: ["جديد", "2025", "محدود"],
  },
  {
    id: 6,
    name: "الأكثر مبيعاً",
    description: "العطور الأكثر طلباً بأسعار مخفضة",
    originalPrice: 420,
    discountedPrice: 336,
    discountPercentage: 20,
    image:
      "https://images.unsplash.com/photo-1588405748880-12d1d2a59d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: OFFER_CATEGORIES.BESTSELLERS,
    offerType: OFFER_TYPES.PERCENTAGE,
    brand: "Versace",
    validUntil: "2025-11-30",
    isActive: true,
    featured: false,
    tags: ["الأكثر مبيعاً", "شائع", "مفضل"],
  },
  {
    id: 7,
    name: "عطور رجالية كلاسيكية",
    description: "تشكيلة من أفخم العطور الرجالية الكلاسيكية",
    originalPrice: 350,
    discountedPrice: 245,
    discountPercentage: 30,
    image:
      "https://images.unsplash.com/photo-1594035910387-fea47794261f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    category: OFFER_CATEGORIES.LUXURY_PERFUMES,
    offerType: OFFER_TYPES.PERCENTAGE,
    brand: "Hugo Boss",
    validUntil: "2025-10-31",
    isActive: true,
    featured: false,
    tags: ["رجالي", "كلاسيكي", "أنيق"],
  },
  {
    id: 8,
    name: "عطور نسائية رومانسية",
    description: "عطور نسائية بروائح زهرية رومانسية مع خصم 35%",
    originalPrice: 290,
    discountedPrice: 188,
    discountPercentage: 35,
    image:
      "https://images.unsplash.com/photo-1574582145792-dca5fb2f9d0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    category: OFFER_CATEGORIES.LUXURY_PERFUMES,
    offerType: OFFER_TYPES.PERCENTAGE,
    brand: "Lancôme",
    validUntil: "2025-09-20",
    isActive: true,
    featured: true,
    tags: ["نسائي", "رومانسي", "زهري"],
  },
  {
    id: 9,
    name: "مجموعة العناية الشاملة",
    description: "مجموعة متكاملة للعناية بالوجه والجسم",
    originalPrice: 520,
    discountedPrice: 364,
    discountPercentage: 30,
    image:
      "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80",
    category: OFFER_CATEGORIES.SKINCARE,
    offerType: OFFER_TYPES.PERCENTAGE,
    brand: "Clinique",
    validUntil: "2025-11-15",
    isActive: true,
    featured: false,
    tags: ["عناية شاملة", "مجموعة", "وجه وجسم"],
  },
  {
    id: 10,
    name: "أطقم الهدايا الفاخرة",
    description: "أطقم هدايا فاخرة مثالية للمناسبات الخاصة",
    originalPrice: 680,
    discountedPrice: 476,
    discountPercentage: 30,
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2112&q=80",
    category: OFFER_CATEGORIES.LUXURY_PERFUMES,
    offerType: OFFER_TYPES.PERCENTAGE,
    brand: "Hermès",
    validUntil: "2025-12-25",
    isActive: true,
    featured: true,
    tags: ["هدايا", "فاخر", "أطقم", "مناسبات"],
  },
];

export const getOffersByCategory = (category) => {
  return offersData.filter(
    (offer) => offer.category === category && offer.isActive
  );
};

export const getFeaturedOffers = () => {
  return offersData.filter((offer) => offer.featured && offer.isActive);
};

export const getActiveOffers = () => {
  return offersData.filter((offer) => offer.isActive);
};
