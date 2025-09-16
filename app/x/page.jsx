"use client";

import React from "react";
import { useParams } from "next/navigation";
import { products } from "@/data/products";

export default function OffersPage() {
  const params = useParams();
  const brand = params.brand;
  const product = products.find((p) => p.brand === brand);
  if (!product) return <p>المنتج غير موجود</p>;
  if (!product) return <p>المنتج غير موجود</p>; // const [limit, setLimit] = useState(20);
  return <div></div>;
}
