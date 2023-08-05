import React, { useState, useEffect } from "react";
// eslint-disable-next-line
import CarCard from "./CarCard";

import SearchBar from "./SearchBar";
import BrandFilter from "./BrandFilter";
import SortByComponent from "./SortByComponent";
import BrandList from "./BrandList";
import BrandDetails from "./BrandDetails";



const CarApp = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [selectedBrand, setSelectedBrand] = useState(null);
  

  useEffect(() => {
    // Fetch data from the API
    fetch("https://api.npoint.io/6b49fadc38eab9e79911")
      .then((response) => response.json())
      .then((data) => {
        setCars(data.cars);
        setFilteredCars(data.cars);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Filter cars based on brand
    if (brandFilter) {
      const filtered = cars.filter((car) => car.brand === brandFilter);
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [brandFilter, cars]);

  useEffect(() => {
    // Sort cars based on selected criteria
    if (sortBy === "brand_asc") {
      setFilteredCars([...filteredCars].sort((a, b) => a.brand.localeCompare(b.brand)));
    } else if (sortBy === "brand_desc") {
      setFilteredCars([...filteredCars].sort((a, b) => b.brand.localeCompare(a.brand)));
    } else if (sortBy === "price_high") {
      setFilteredCars([...filteredCars].sort((a, b) => parseFloat(b.price.split(" ")[1]) - parseFloat(a.price.split(" ")[1])));
    } else if (sortBy === "price_low") {
      setFilteredCars([...filteredCars].sort((a, b) => parseFloat(a.price.split(" ")[1]) - parseFloat(b.price.split(" ")[1])));
    } else if (sortBy === "speed_high") {
      setFilteredCars([...filteredCars].sort((a, b) => parseFloat(b.maximum_speed.split(" ")[0]) - parseFloat(a.maximum_speed.split(" ")[0])));
    } else if (sortBy === "speed_low") {
      setFilteredCars([...filteredCars].sort((a, b) => parseFloat(a.maximum_speed.split(" ")[0]) - parseFloat(b.maximum_speed.split(" ")[0])));
    }
  }, [sortBy, filteredCars]);

  useEffect(() => {
    // Search functionality
    if (searchTerm) {
      const filtered = cars.filter((car) =>
        car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        car.model.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCars(filtered);
    } else {
      setFilteredCars(cars);
    }
  }, [searchTerm, cars]);

  const handleDeleteCar = (model) => {
    const updatedCars = cars.filter((car) => car.model !== model);
    setCars(updatedCars);
    setFilteredCars(updatedCars);
  };

  const handleBrandClick = (brand) => {
    setSelectedBrand(brand);
  };

  const handleBackClick = () => {
    setSelectedBrand(null);
  };

  return (
    <div className="car-app">
      <header className="app-header">
        <h1>Car Show Room</h1>
      </header>
      {!selectedBrand ? (
        <div>
          <div className="filter-section">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
            <BrandFilter
              brandFilter={brandFilter}
              onBrandFilterChange={setBrandFilter}
              brands={Array.from(new Set(cars.map((car) => car.brand)))}
            />
            <SortByComponent sortBy={sortBy} onSortByChange={setSortBy} />
          </div>
          <BrandList
            brands={Array.from(new Set(cars.map((car) => car.brand)))}
            onBrandClick={handleBrandClick}
          />
        </div>
      ) : (
        <div>
          <button onClick={handleBackClick}>Back</button>
          <BrandDetails
            brand={selectedBrand}
            cars={filteredCars.filter((car) => car.brand === selectedBrand)}
            onDelete={handleDeleteCar}
          />
        </div>
      )}
    </div>
  );
};

export default CarApp;
