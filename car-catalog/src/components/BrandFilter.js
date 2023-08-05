import React from "react";

const BrandFilter = ({ brandFilter, onBrandFilterChange, brands }) => {
  return (
    <select value={brandFilter} onChange={(e) => onBrandFilterChange(e.target.value)}>
      <option value="">All Brands</option>
      {brands.map((brand) => (
        <option key={brand} value={brand}>
          {brand}
        </option>
      ))}
    </select>
  );
};

export default BrandFilter;
