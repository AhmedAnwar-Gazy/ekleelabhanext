"use client";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/CartContext";

export default function CartIcon() {
  const { cart, getTotalItems } = useCart();

  return (
    <Button variant="ghost" className="relative">
      <ShoppingCart className="w-6 h-6" />
      {getTotalItems() > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {getTotalItems()}
        </span>
      )}
    </Button>
  );
}
