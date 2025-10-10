"use client";

import React from "react";
import {
  useGetCategoryTreeQuery,
  selectRootCategories,
  selectCategoryChildren,
} from "@/features/categories/categoriesSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // App Router
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu"; // من shadcn/ui

export default function CategoriesNavigation() {
  const { data } = useGetCategoryTreeQuery();
  const rootCategories = useSelector(selectRootCategories);
  const categories = useSelector((state) => state); // يمكن استخدام selectors إضافية
  const router = useRouter();

  const handleClick = (category) => {
    router.push(`/category/${category.id}`);
  };

  const renderSubCategories = (parentId) => {
    // استخدم selector selectCategoryChildren
    const children = useSelector((state) =>
      selectCategoryChildren(state, parentId)
    );

    if (!children || children.length === 0) return null;

    return (
      <ul className="pl-4 mt-2">
        {children.map((child) => (
          <li key={child.id}>
            <button
              className="hover:text-red-500"
              onClick={() => handleClick(child)}
            >
              {child.name}
            </button>
            {renderSubCategories(child.id)}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <NavigationMenu>
      {rootCategories.map((category) => (
        <NavigationMenuItem key={category.id}>
          <NavigationMenuLink onClick={() => handleClick(category)}>
            {category.name}
          </NavigationMenuLink>

          {/* إذا كانت هناك subcategories */}
          {renderSubCategories(category.id) && (
            <NavigationMenuContent>
              {renderSubCategories(category.id)}
            </NavigationMenuContent>
          )}
        </NavigationMenuItem>
      ))}
    </NavigationMenu>
  );
}
