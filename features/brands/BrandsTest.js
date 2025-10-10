import React, { useState } from "react";
import {
  useGetBrandsQuery,
  useGetFeaturedBrandsQuery,
  useGetBrandsByLetterQuery,
  useGetBrandByIdQuery,
} from "./brandsSlice";

export const BrandsTest = () => {
  const [selectedLetter, setSelectedLetter] = useState("A");
  const [selectedBrandId, setSelectedBrandId] = useState(null);

  // --- Hooks from RTK Query ---
  const {
    data: allBrands,
    isLoading: isLoadingAll,
    isError: isErrorAll,
  } = useGetBrandsQuery();

  const {
    data: featuredBrands,
    isLoading: isLoadingFeatured,
    isError: isErrorFeatured,
  } = useGetFeaturedBrandsQuery();

  const {
    data: brandsByLetter,
    isLoading: isLoadingLetter,
    isError: isErrorLetter,
  } = useGetBrandsByLetterQuery(selectedLetter);

  const {
    data: brandById,
    isLoading: isLoadingBrand,
    isError: isErrorBrand,
  } = useGetBrandByIdQuery(selectedBrandId, {
    skip: !selectedBrandId, // لا يتم الجلب إلا عند وجود ID
  });

  // --- Loading and error states ---
  if (isLoadingAll || isLoadingFeatured || isLoadingLetter || isLoadingBrand)
    return <p>Loading brands data...</p>;

  if (isErrorAll || isErrorFeatured || isErrorLetter || isErrorBrand)
    return <p>Error fetching brands data.</p>;

  return (
    <div className="p-6 space-y-8">
      {/* --- Featured Brands --- */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🌟 Featured Brands</h2>
        {featuredBrands?.length > 0 ? (
          <ul className="list-disc ml-6">
            {featuredBrands.map((brand) => (
              <li key={brand.id}>{brand.name}</li>
            ))}
          </ul>
        ) : (
          <p>No featured brands found.</p>
        )}
      </section>

      {/* --- All Brands --- */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🧾 All Brands</h2>
        {allBrands?.ids?.length > 0 ? (
          <ul className="list-disc ml-6">
            {allBrands.ids.map((id) => (
              <li key={id}>{allBrands.entities[id].name}</li>
            ))}
          </ul>
        ) : (
          <p>No brands found.</p>
        )}
      </section>

      {/* --- Filter by Letter --- */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🔤 Filter by Letter</h2>
        <div className="flex items-center gap-3 mb-2">
          <label htmlFor="letter">Select letter:</label>
          <input
            id="letter"
            type="text"
            value={selectedLetter}
            onChange={(e) => setSelectedLetter(e.target.value.toUpperCase())}
            maxLength={1}
            className="border px-2 py-1 rounded w-16 text-center"
          />
        </div>

        {brandsByLetter?.ids?.length > 0 ? (
          <ul className="list-disc ml-6">
            {brandsByLetter.ids.map((id) => (
              <li key={id}>{brandsByLetter.entities[id].name}</li>
            ))}
          </ul>
        ) : (
          <p>No brands for letter "{selectedLetter}".</p>
        )}
      </section>

      {/* --- Get Brand by ID --- */}
      <section>
        <h2 className="text-xl font-semibold mb-2">🔍 Get Brand by ID</h2>
        <div className="flex items-center gap-3 mb-2">
          <input
            type="number"
            placeholder="Enter Brand ID"
            value={selectedBrandId || ""}
            onChange={(e) =>
              setSelectedBrandId(e.target.value ? Number(e.target.value) : null)
            }
            className="border px-2 py-1 rounded w-32"
          />
        </div>

        {brandById ? (
          <div className="p-3 border rounded bg-gray-50">
            <p>
              <strong>Name:</strong> {brandById.name}
            </p>
            <p>
              <strong>ID:</strong> {brandById.id}
            </p>
            <p>
              <strong>Slug:</strong> {brandById.slug || "N/A"}
            </p>
          </div>
        ) : (
          selectedBrandId && <p>No brand found with ID {selectedBrandId}.</p>
        )}
      </section>
    </div>
  );
};

export default BrandsTest;

