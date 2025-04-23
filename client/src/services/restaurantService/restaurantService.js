import api from "../api";

export default {
  getRestaurants() {
    return api.get("/restaurants", {
      withCredentials: true,
    });
  },

  createRestaurant(restaurantData) {
    return api.post("/restaurants", restaurantData, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },

  updateRestaurant(id, restaurantData) {
    return api.put(`/restaurants/${id}`, restaurantData, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },

  deleteRestaurant(id) {
    return api.delete(`/restaurants/${id}`, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },

  getRestaurantById(id) {
    return api.get(`/restaurants/${id}`, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },
};
