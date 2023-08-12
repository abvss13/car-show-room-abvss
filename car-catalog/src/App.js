import React from 'react';
import './App.css';
import CarApp from './CarApp'; // Import the CarApp component

function App() {
  return (
    <div className="app">
      {/* Header */}
      <header className="app-header">
        <h1>Abvss Car Dealership</h1>
      </header>

      {/* Main Content */}
      <main className="app-main">
        <CarApp /> {/* Render the CarApp component */}
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>&copy; {new Date().getFullYear()} Car Dealership</p>
      </footer>
    </div>
  );
}

export default App;
