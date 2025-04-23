import api from '../api'

export default {
  getCategories() {
    return api.get('/category', {
      withCredentials: false
    })
  },

  createCategory(categoryData) {
    return api.post('/category', categoryData)
  },

  updateCategory(id, categoryData) {
    return api.put(`/category/${id}`, categoryData)
  },

  deleteCategory(id) {
    return api.delete(`/category/${id}`)
  },

  getCategoryById(id){
    return api.get(`/category/${id}`)
  }
  }
  

  