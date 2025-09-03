import { useState, useEffect } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function FilterSidebar({
  availableBrands = [],
  selectedBrands = [],
  onBrandChange,
  onFiltersChange,
  onClearFilters,
  disableClearAll = false, // ✅ معامل جديد لتعطيل زر مسح الكل
}) {
  const [internalSelectedBrands, setInternalSelectedBrands] =
    useState(selectedBrands);
  const [selectedCare, setSelectedCare] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [brandSearch, setBrandSearch] = useState("");

  // Use available brands from props or fallback to default
  const brands =
    availableBrands.length > 0
      ? availableBrands
      : [
          "adidas",
          "chanel",
          "dior",
          "gucci",
          "armani",
          "burberry",
          "calvin klein",
          "estée lauder",
          "giorgio armani",
          "l'oréal",
          "mac",
          "nivea",
          "revlon",
        ];

  const careTypes = [
    { id: "skin-care", label: "Skin Care" },
    { id: "hair-care", label: "Hair Care" },
    { id: "body-care", label: "Body Care" },
    { id: "nail-care", label: "Nail Care" },
    { id: "oral-care", label: "Oral Care" },
  ];

  const ingredients = [
    { id: "vitamin-c", label: "Vitamin C" },
    { id: "hyaluronic-acid", label: "Hyaluronic Acid" },
    { id: "retinol", label: "Retinol" },
    { id: "niacinamide", label: "Niacinamide" },
    { id: "salicylic-acid", label: "Salicylic Acid" },
    { id: "glycolic-acid", label: "Glycolic Acid" },
    { id: "ceramides", label: "Ceramides" },
    { id: "peptides", label: "Peptides" },
  ];

  // Sync with external state changes
  useEffect(() => {
    setInternalSelectedBrands(selectedBrands);
  }, [selectedBrands]);

  const filteredBrands = brands.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const handleBrandChange = (brand, checked) => {
    let newSelectedBrands;
    if (checked) {
      newSelectedBrands = [...internalSelectedBrands, brand];
    } else {
      newSelectedBrands = internalSelectedBrands.filter((b) => b !== brand);
    }

    setInternalSelectedBrands(newSelectedBrands);

    // Send changes to parent component immediately
    if (onBrandChange) {
      onBrandChange(newSelectedBrands);
    }
  };

  const handleCareChange = (care, checked) => {
    if (checked) {
      setSelectedCare([...selectedCare, care]);
    } else {
      setSelectedCare(selectedCare.filter((c) => c !== care));
    }
  };

  const handleIngredientChange = (ingredient, checked) => {
    if (checked) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    } else {
      setSelectedIngredients(
        selectedIngredients.filter((i) => i !== ingredient)
      );
    }
  };

  const clearAllFilters = () => {
    setInternalSelectedBrands([]);
    setSelectedCare([]);
    setSelectedIngredients([]);
    setBrandSearch("");

    // Notify parent component
    if (onClearFilters) {
      onClearFilters();
    }
    if (onBrandChange) {
      onBrandChange([]);
    }
  };

  const removeFilter = (type, value) => {
    switch (type) {
      case "brand":
        const newBrands = internalSelectedBrands.filter((b) => b !== value);
        setInternalSelectedBrands(newBrands);
        if (onBrandChange) {
          onBrandChange(newBrands);
        }
        break;
      case "care":
        setSelectedCare(selectedCare.filter((c) => c !== value));
        break;
      case "ingredient":
        setSelectedIngredients(selectedIngredients.filter((i) => i !== value));
        break;
    }
  };

  const totalFilters =
    internalSelectedBrands.length +
    selectedCare.length +
    selectedIngredients.length;

  return (
    <div className="w-[240px] h-[700px] p-6 border rounded-xl bg-white  flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">فرز المحتوى </h2>
        {totalFilters > 0 && !disableClearAll && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
          >
            مسح
          </Button>
        )}
      </div>

      {/* Selected Filters */}
      {totalFilters > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            التصفية الحالية ({totalFilters})
          </h3>
          <div className="space-y-2">
            {internalSelectedBrands.map((brand) => (
              <Badge
                key={brand}
                variant="secondary"
                className="flex items-center gap-2 w-fit"
              >
                {brand}
                {/* <X
                  className="w-3 h-3 cursor-pointer hover:text-red-600"
                  onClick={() => removeFilter("brand", brand)}
                /> */}
              </Badge>
            ))}
            {selectedCare.map((care) => (
              <Badge
                key={care}
                variant="secondary"
                className="flex items-center gap-2 w-fit"
              >
                {care}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-600"
                  onClick={() => removeFilter("care", care)}
                />
              </Badge>
            ))}
            {selectedIngredients.map((ingredient) => (
              <Badge
                key={ingredient}
                variant="secondary"
                className="flex items-center gap-2 w-fit"
              >
                {ingredient}
                <X
                  className="w-3 h-3 cursor-pointer hover:text-red-600"
                  onClick={() => removeFilter("ingredient", ingredient)}
                />
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Filter Accordion */}
      <Accordion type="multiple" className="w-full">
        {/* Brands Section */}
        <AccordionItem value="brands" className="border-gray-200">
          <AccordionTrigger className="text-gray-800 hover:text-blue-600">
            الماركات{" "}
            {internalSelectedBrands.length > 0 &&
              `(${internalSelectedBrands.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <Input
              placeholder="Search brands..."
              className="mb-3 border-gray-300 focus:border-blue-500"
              value={brandSearch}
              onChange={(e) => setBrandSearch(e.target.value)}
            />
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {filteredBrands.map((brand, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Checkbox
                    id={`brand-${index}`}
                    checked={internalSelectedBrands.includes(brand)}
                    onCheckedChange={(checked) =>
                      handleBrandChange(brand, checked)
                    }
                    className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label
                    htmlFor={`brand-${index}`}
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900 capitalize"
                  >
                    {brand}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Care Section */}
        <AccordionItem value="care" className="border-gray-200">
          <AccordionTrigger className="text-gray-800 hover:text-blue-600">
            Care Type {selectedCare.length > 0 && `(${selectedCare.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              {careTypes.map((care) => (
                <div key={care.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={care.id}
                    checked={selectedCare.includes(care.label)}
                    onCheckedChange={(checked) =>
                      handleCareChange(care.label, checked)
                    }
                    className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label
                    htmlFor={care.id}
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    {care.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Ingredients Section */}
        <AccordionItem value="ingredients" className="border-gray-200">
          <AccordionTrigger className="text-gray-800 hover:text-blue-600">
            Key Ingredients{" "}
            {selectedIngredients.length > 0 &&
              `(${selectedIngredients.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className="flex items-center space-x-3"
                >
                  <Checkbox
                    id={ingredient.id}
                    checked={selectedIngredients.includes(ingredient.label)}
                    onCheckedChange={(checked) =>
                      handleIngredientChange(ingredient.label, checked)
                    }
                    className="border-gray-400 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label
                    htmlFor={ingredient.id}
                    className="text-sm text-gray-700 cursor-pointer hover:text-gray-900"
                  >
                    {ingredient.label}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* Apply Filters Button */}
      {/* {totalFilters > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Apply {totalFilters} Filter{totalFilters > 1 ? "s" : ""}
          </Button>
        </div>
      )} */}
    </div>
  );
}
