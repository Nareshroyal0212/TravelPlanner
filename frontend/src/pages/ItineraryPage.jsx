import React, { useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import "../styles/itinerary.css";
import {
  getAllItineraries,
  saveItinerary,
  deleteItinerary,
} from "../services/itineraryService";

function ItineraryPage() {
  const [tripName, setTripName] = useState("");
  const [destination, setDestination] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [activities, setActivities] = useState("");

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load itineraries from the database when the page opens
  useEffect(() => {
    loadPlans();
  }, []);

  const loadPlans = () => {
    setLoading(true);
    getAllItineraries()
      .then((res) => {
        setPlans(res.data);
        setError("");
      })
      .catch(() => {
        setError("Could not load itineraries. Is the backend running?");
      })
      .finally(() => setLoading(false));
  };

  const addPlan = () => {
    if (!(tripName && destination && startDate && activities)) return;

    const newPlan = {
      tripName,
      destination,
      startDate,
      endDate,
      activities,
    };

    saveItinerary(newPlan)
      .then((res) => {
        // Append the record the backend actually saved (with real DB id)
        setPlans((prev) => [...prev, res.data]);
        setTripName("");
        setDestination("");
        setStartDate("");
        setEndDate("");
        setActivities("");
      })
      .catch(() => {
        setError("Could not save the plan to the database.");
      });
  };

  const deletePlan = (id) => {
    deleteItinerary(id)
      .then(() => {
        setPlans((prev) => prev.filter((plan) => plan.id !== id));
      })
      .catch(() => {
        setError("Could not delete the plan from the database.");
      });
  };

  return (
    <>
      <Navbar />

      <div className="itinerary-page">
        <div className="itinerary-header">
          <p>PLAN YOUR JOURNEY</p>
          <h1>Travel Itinerary Generator 🧳</h1>
          <span>Create your trip schedule and organize your adventures.</span>
        </div>

        <div className="itinerary-form">
          <h2>Add Trip Plan</h2>

          <input
            type="text"
            placeholder="Trip Name"
            value={tripName}
            onChange={(e) => setTripName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter Activities"
            value={activities}
            onChange={(e) => setActivities(e.target.value)}
          />

          <button onClick={addPlan}>➕ Add Plan</button>
        </div>

        {error && <p className="error-text">{error}</p>}

        <h2 className="plan-title">My Travel Plans</h2>

        {loading ? (
          <p>Loading plans...</p>
        ) : plans.length === 0 ? (
          <div className="empty-plan">
            <h2>No Plans Added</h2>
            <p>Start creating your travel itinerary.</p>
          </div>
        ) : (
          <div className="plan-grid">
            {plans.map((plan) => (
              <div className="plan-card" key={plan.id}>
                <h2>📍 {plan.destination}</h2>
                <p>🧳 {plan.tripName}</p>
                <p>
                  📅 {plan.startDate}
                  {plan.endDate ? ` - ${plan.endDate}` : ""}
                </p>
                <p>🎯 {plan.activities}</p>

                <button onClick={() => deletePlan(plan.id)}>Delete</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

export default ItineraryPage;
