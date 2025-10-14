// export default ShoppingCart;

"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, ShoppingCart as ShoppingCartIcon, X } from "lucide-react";

// ✅ بيانات وهمية للسلة (بدون API أو Redux)
const useMockCart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: "item-1",
      quantity: 2,
      product: {
        id: "p1",
        name: "سماعة رأس لاسلكية",
        price: 299.99,
        image: "/placeholder-headphones.jpg",
      },
    },
    {
      id: "item-2",
      quantity: 1,
      product: {
        id: "p2",
        name: "ساعة ذكية",
        price: 399.99,
        image: "/placeholder-watch.jpg",
      },
    },
    {
      id: "item-3",
      quantity: 3,
      product: {
        id: "p3",
        name: "حقيبة كمبيوتر",
        price: 89.99,
        image: "/placeholder-backpack.jpg",
      },
    },
  ]);

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return {
    cartItems,
    removeItem,
    updateQuantity,
    totalItems,
    subtotal,
    isLoading: false,
    isError: false,
  };
};

// CartItem Component (كما هو)
const CartItem = ({ item, onRemove, onUpdateQuantity }) => {
  return (
    <div className="flex py-4">
      <div className="flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border">
        <img
          src={item.product?.image || "/placeholder.jpg"}
          alt={item.product?.name || "Product"}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="ml-4 flex-1 flex flex-col pr-3">
        <div>
          <div className="flex justify-between text-base font-medium">
            <h3 className="text-foreground">{item.product?.name}</h3>
            <p className="ml-4">
              ${((item.product?.price || 0) * item.quantity).toFixed(2)}
            </p>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            ${(item.product?.price || 0).toFixed(2)}
          </p>
        </div>

        <div className="flex-1 flex items-end justify-between mt-2">
          <div className="flex items-center border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="px-2 text-sm">{item.quantity}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => onRemove(item.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Main ShoppingCart Component
const ShoppingCart = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ استخدام البيانات الوهمية بدلًا من useGetCartQuery
  const { cartItems, totalItems, subtotal, removeItem, updateQuantity } =
    useMockCart();

  const handleUpdateQuantity = (id, newQuantity) => {
    updateQuantity(id, newQuantity);
  };

  const handleRemove = (id) => {
    removeItem(id);
  };

  return (
    <div>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <ShoppingCartIcon className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Button>
        </SheetTrigger>

        <SheetContent className="flex flex-col w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>سلة التسوق</SheetTitle>
            <SheetDescription>
              {cartItems.length > 0
                ? `لديك ${cartItems.length} منتجات في سلة التسوق`
                : "سلة التسوق فارغة"}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto py-6 px-2">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCartIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium">سلة التسوق فارغة</h3>
                <p className="mt-1 text-muted-foreground">
                  ابدأ بإضافة بعض المنتجات إلى سلة التسوق
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {cartItems.map((item) => (
                  <React.Fragment key={item.id}>
                    <CartItem
                      item={item}
                      onRemove={handleRemove}
                      onUpdateQuantity={handleUpdateQuantity}
                    />
                    <Separator />
                  </React.Fragment>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-border px-2 py-6">
              <div className="space-y-4">
                <div className="flex justify-between text-base font-medium">
                  <p>المجموع الفرعي</p>
                  <p>${subtotal.toFixed(2)}</p>
                </div>
                <p className="text-sm text-muted-foreground">
                  سيتم حساب الشحن والضرائب عند الدفع
                </p>
                <div className="flex space-x-3">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => setIsOpen(false)}
                  >
                    متابعة التسوق
                  </Button>
                  <Button className="flex-1">الدفع الآن</Button>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default ShoppingCart;
