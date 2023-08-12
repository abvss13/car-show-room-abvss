import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import your CSS styles

function CarApp() {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [sortBy, setSortBy] = useState('price-asc');
  const [selectedCar, setSelectedCar] = useState(null);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get('https://api.npoint.io/6b49fadc38eab9e79911');
        setCars(response.data.cars);
      } catch (error) {
        console.error('Error fetching car data:', error);
      }
    };

    fetchCarData();
  }, []);

  const handleContactClick = (contactInfo) => {
    setSelectedCar(contactInfo);
  };

  const handleModalClose = () => {
    setSelectedCar(null);
  };

  const handleAddToCart = (car) => {
    setCart([...cart, car]);
  };

  const handleRemoveFromCart = (car) => {
    const updatedCart = cart.filter((item) => item !== car);
    setCart(updatedCart);
  };

  const filteredCars = cars.filter(
    (car) =>
      car.brand.toLowerCase().includes(selectedBrand.toLowerCase()) &&
      (car.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.model.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortBy === 'price-asc') {
      return parseFloat(a.price.replace(/[^0-9.-]+/g, '')) - parseFloat(b.price.replace(/[^0-9.-]+/g, ''));
    } else if (sortBy === 'price-desc') {
      return parseFloat(b.price.replace(/[^0-9.-]+/g, '')) - parseFloat(a.price.replace(/[^0-9.-]+/g, ''));
    }
    return 0;
  });

  return (
    <div className="car-app">
      <header className="app-header">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search by brand or model"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
          >
            <option value="">All Brands</option>
            {Array.from(new Set(cars.map((car) => car.brand))).map((brand, index) => (
              <option key={index} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </header>
      <div className="car-list">
        {sortedCars.map((car, index) => (
          <div className="car-item" key={index}>
            <img src={car.img_url} alt={car.model} />
            <div className="car-details">
              <h3>{car.brand} - {car.model}</h3>
              <p>Price: {car.price}</p>
              <p>Engine: {car.engine_type}</p>
              <p>Acceleration: {car.acceleration}</p>
              <p>Maximum Speed: {car.maximum_speed}</p>
            </div>
            <div className="action-buttons">
              <button
                className="contact-button"
                onClick={() => handleContactClick(car)}
              >
                Contact Dealer
              </button>
              {cart.includes(car) ? (
                <button className="cart-button remove" onClick={() => handleRemoveFromCart(car)}>
                  Remove from Cart
                </button>
              ) : (
                <button className="cart-button add" onClick={() => handleAddToCart(car)}>
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedCar && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleModalClose}>&times;</span>
            <h2>Contact Dealer</h2>
            <p>Telephone: +254798491946</p>
            <p>Gmail: abdulabass1738@gmail.com</p>
          </div>
        </div>
      )}
      <footer className="app-footer">
        <p>&copy; 2023 Abvss Car Dealership. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CarApp;
