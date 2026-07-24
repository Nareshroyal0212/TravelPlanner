import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import DestinationsPage from "../pages/DestinationsPage";
import HotelsPage from "../pages/HotelsPage";
import BudgetPage from "../pages/BudgetPage";
import WeatherPage from "../pages/WeatherPage";
import FavoritesPage from "../pages/FavoritesPage";
import ItineraryPage from "../pages/ItineraryPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/destinations" element={<DestinationsPage />} />
        <Route path="/hotels" element={<HotelsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/itinerary" element={<ItineraryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;