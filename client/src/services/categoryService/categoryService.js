import api from "../api";

export default {
  getCategories() {
    return api.get("/category", {
      withCredentials: true,
    });
  },

  createCategory(categoryData) {
    return api.post("/category", categoryData, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },

  updateCategory(id, categoryData) {
    return api.put(`/category/${id}`, categoryData, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },

  deleteCategory(id) {
    return api.delete(`/category/${id}`, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },

  getCategoryById(id) {
    return api.get(`/category/${id}`, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },
};
