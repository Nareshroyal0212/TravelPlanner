import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchBox() {

  const navigate = useNavigate();

  const [destination, setDestination] = useState("");
  const [people, setPeople] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const handleSearch = () => {

    if (
      destination === "" ||
      people === "" ||
      checkIn === "" ||
      checkOut === ""
    ) {
      alert("Please fill all details");
      return;
    }

    alert("Searching for " + destination);

    navigate("/destinations");

  };

  return (

    <div className="search-box">

      <div className="search-item">

        <label>Search Destination</label>

        <input
          type="text"
          placeholder="Enter Destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        />

      </div>

      <div className="search-item">

        <label>Pax Number</label>

        <input
          type="number"
          placeholder="No. of People"
          value={people}
          onChange={(e) => setPeople(e.target.value)}
        />

      </div>

      <div className="search-item">

        <label>Check-in Date</label>

        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />

      </div>

      <div className="search-item">

        <label>Checkout Date</label>

        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />

      </div>

      <div className="search-item">

        <button
          className="search-btn"
          onClick={handleSearch}
        >
          SEARCH NOW
        </button>

      </div>

    </div>

  );
}

export default SearchBox;