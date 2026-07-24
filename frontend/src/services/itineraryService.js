import api from "./api";

// Backend: @RequestMapping("/api/itineraries") in ItineraryController.java

export const getAllItineraries = () => {
  return api.get("/itineraries");
};

export const getItineraryById = (id) => {
  return api.get(`/itineraries/${id}`);
};

export const saveItinerary = (plan) => {
  return api.post("/itineraries", plan);
};

export const updateItinerary = (id, plan) => {
  return api.put(`/itineraries/${id}`, plan);
};

export const deleteItinerary = (id) => {
  return api.delete(`/itineraries/${id}`);
};
