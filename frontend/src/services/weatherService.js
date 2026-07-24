import api from "./api";

export const getWeather = (city) => {
  return api.get(`/weather/${city}`);
};