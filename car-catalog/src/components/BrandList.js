import React from "react";

const BrandList = ({ brands, onBrandClick }) => {
  return (
    <div>
      <h2>Brands</h2>
      <ul>
        {brands.map((brand) => (
          <li key={brand}>
            <button onClick={() => onBrandClick(brand)}>{brand}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandList;
