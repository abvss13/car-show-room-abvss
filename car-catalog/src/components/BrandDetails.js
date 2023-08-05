import React from "react";
import CarCard from "./CarCard";

const BrandDetails = ({ brand, cars, onDelete }) => {
  return (
    <div>
      <h2>{brand}</h2>
      <div className="car-list">
        {cars.map((car) => (
          <CarCard key={car.model} car={car} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default BrandDetails;
