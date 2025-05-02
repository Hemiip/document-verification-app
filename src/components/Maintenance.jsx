import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import "../styles/Maintenance.css";
const Maintenance = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <div className="maintenance-container mt-4 sm:mt-10">
        <div className="maintenance-box">
          <h1>🚧 Under Maintenance</h1>
          <p>
            Our website is currently undergoing scheduled maintenance.
            <br />
            We’ll be back shortly. Thank you for your patience!
          </p>
          <div className="spinner"></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Maintenance;
