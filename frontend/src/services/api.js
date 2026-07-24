import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9096/api",
});

export default api;