import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-gray-500">
              Document Verification
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
