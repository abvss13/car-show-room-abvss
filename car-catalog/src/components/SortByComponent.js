import React from "react";

const SortByComponent = ({ sortBy, onSortByChange }) => {
  return (
    <select value={sortBy} onChange={(e) => onSortByChange(e.target.value)}>
      <option value="">Sort By</option>
      <option value="brand_asc">Brand (A-Z)</option>
      <option value="brand_desc">Brand (Z-A)</option>
      <option value="price_high">Price (High to Low)</option>
      <option value="price_low">Price (Low to High)</option>
      <option value="speed_high">Maximum Speed (High to Low)</option>
      <option value="speed_low">Maximum Speed (Low to High)</option>
    </select>
  );
};

export default SortByComponent;
