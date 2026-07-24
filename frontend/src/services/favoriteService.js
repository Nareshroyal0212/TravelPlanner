import axios from "axios";

// FIX: Target the absolute URL directly to bypass any hidden api.js configuration errors
const ABSOLUTE_URL = "http://localhost:9096/api/favorites";

export const getFavorites = () => {
  return axios.get(ABSOLUTE_URL);
};

export const addFavorite = (place) => {
  return axios.post(ABSOLUTE_URL, place);
};

export const deleteFavorite = (id) => {
  return axios.delete(`${ABSOLUTE_URL}/${id}`);
};
