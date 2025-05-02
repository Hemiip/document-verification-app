import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Maintenance from "./components/Maintenance";

const App = () => {
  const maintenanceMode = import.meta.env.VITE_MAINTENANCE === "true";

  return (
    <Routes>
      {maintenanceMode ? (
        <Route path="*" element={<Maintenance />} />
      ) : (
        <>
          <Route path="*" element={<Home />} />
        </>
      )}
    </Routes>
  );
};

export default App;
