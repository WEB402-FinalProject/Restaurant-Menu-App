import api from '../api'

export default {
  getMenus() {
    return api.get('/menu', {
      withCredentials: true
    });
  },

  createMenu(menuData) {
    return api.post('/menu', menuData);
  },

  updateMenu(id, menuData) {
    return api.put(`/menu/${id}`, menuData);
  },

  deleteMenu(id) {
    return api.delete(`/menu/${id}`);
  },

  getMenuById(id) {
    return api.get(`/menu/${id}`);
  }
}
