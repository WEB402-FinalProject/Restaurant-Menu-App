// services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your API base URL
  timeout: 10000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const restaurantId = localStorage.getItem("selectedRestaurantId");
  if (restaurantId) {
    config.headers["x-restaurant-id"] = restaurantId;
  }
  return config;
});

export default api;
