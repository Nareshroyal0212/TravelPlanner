import api from "./api";

export const getAllDestinations = () => {
  return api.get("/destinations");
};