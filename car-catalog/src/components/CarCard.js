import React, { useState } from "react";

const CarCard = ({ car, onDelete }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className={`car-card${showDetails ? " active" : ""}`}>
      <img src={car.img_url} alt={car.model} />
      <h3>{car.brand} - {car.model}</h3>
      {showDetails && (
        <div className="details">
          <p>Type: {car.type}</p>
          <p>Price: {car.price}</p>
          <p>Engine Type: {car.engine_type}</p>
          <p>Acceleration: {car.acceleration}</p>
          <p>Maximum Speed: {car.maximum_speed}</p>
          <p>Release Date: {car.release_date}</p>
        </div>
      )}
      <div className={`show-details-btn${showDetails ? " active" : ""}`} onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "Hide Details" : "Show Details"}
      </div>
      <button className="delete-btn" onClick={() => onDelete(car.model)}>Delete</button>
    </div>
  );
};

export default CarCard;
