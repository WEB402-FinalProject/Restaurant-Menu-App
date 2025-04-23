import api from '../api'

export default {
  getMenus() {
    return api.get('/menu', {
      withCredentials: true
    });
  },

  createMenu(menuData) {
    return api.post('/menu', menuData, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },

  updateMenu(id, menuData) {
    return api.put(`/menu/${id}`, menuData, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },

  deleteMenu(id) {
    return api.delete(`/menu/${id}`, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  },

  getMenuById(id) {
    return api.get(`/menu/${id}`, {
      withCredentials: true, // Ensure credentials are sent with the request
    });
  }
}
