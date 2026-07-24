import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminLoginPage from "./pages/AdminLoginPage";

import HomePage from "./pages/HomePage";
import DestinationsPage from "./pages/DestinationsPage";
import DestinationDetailsPage from "./pages/DestinationDetailsPage";
import HotelsPage from "./pages/HotelsPage";
import HotelDetailsPage from "./pages/HotelDetailsPage";
import BookingPage from "./pages/BookingPage";   // <-- Add this
import BookingConfirmedPage from "./pages/BookingConfirmedPage";
import BudgetPage from "./pages/BudgetPage";
import WeatherPage from "./pages/WeatherPage";
import FavortiesPage from "./pages/FavoritesPage";
import Itineararypage from "./pages/ItineraryPage";
import ProfilePage from "./pages/ProfilePage";

import AdminDashboard from "./pages/AdminDashboard";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Register */}
        <Route path="/" element={<RegisterPage />} />

        {/* User Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLoginPage />} />

        {/* Home */}
        <Route path="/home" element={<HomePage />} />

        {/* Destinations */}
        <Route path="/destinations" element={<DestinationsPage />} />

        {/* Destination Details */}
        <Route
          path="/destination/:id"
          element={<DestinationDetailsPage />}
        />

        {/* Hotels */}
        <Route
          path="/hotels"
          element={<HotelsPage />}
        />

        {/* Hotel Details */}
        <Route
          path="/hotel/:id"
          element={<HotelDetailsPage />}
        />

        {/* Booking Page */}
        <Route
          path="/booking"
          element={<BookingPage />}
        />

        {/* Booking Confirmed */}
        <Route
          path="/booking-confirmed"
          element={<BookingConfirmedPage />}
        />

        {/* Budget */}
        <Route
          path="/budget"
          element={<BudgetPage />}
        />

        {/* Weather */}
        <Route
          path="/weather"
          element={<WeatherPage />}
        />

        {/* Favorites */}
        <Route
          path="/favorites"
          element={<FavortiesPage />}
        />

        {/* Itinerary */}
        <Route
          path="/itinerary"
          element={<Itineararypage />}
        />
         <Route
  path="/profile"
  element={<ProfilePage />}
/>

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={<AdminDashboard />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;