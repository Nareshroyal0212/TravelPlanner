import api from "./api";

export const getAllHotels = () => {
  return api.get("/hotels");
};