import api from "../api";

export default {
  getRestaurants() {
    return api.get("/restaurants", {
      withCredentials: true,
    });
  },

  createRestaurant(restaurantData) {
    return api.post("/restaurants", restaurantData);
  },

  updateRestaurant(id, restaurantData) {
    return api.put(`/restaurants/${id}`, restaurantData);
  },

  deleteRestaurant(id) {
    return api.delete(`/restaurants/${id}`);
  },

  getRestaurantById(id) {
    return api.get(`/restaurants/${id}`);
  },
};
