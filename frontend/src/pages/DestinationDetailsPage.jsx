import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";

function DestinationDetailsPage() {

  const { state } = useLocation();

  if (!state) {
    return <h2 style={{ textAlign: "center" }}>Destination Not Found</h2>;
  }

  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          textAlign: "center",
          minHeight: "80vh",
          background: "#f5f5f5",
        }}
      >
        <img
          src={state.imageUrl}
          alt={state.placeName}
          style={{
            width: "70%",
            height: "400px",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />

        <h1 style={{ marginTop: "20px" }}>
          {state.placeName}
        </h1>

        <h3>
          {state.state}, {state.country}
        </h3>

        <p
          style={{
            marginTop: "20px",
            fontSize: "18px",
          }}
        >
          {state.description}
        </p>

        <h3>
          ⭐ Rating : {state.rating}
        </h3>

        <h3>
          📅 Best Time : {state.bestTime}
        </h3>
      </div>

      <Footer />
    </>
  );
}

export default DestinationDetailsPage;