import api from '../api'

export default {
  getCategories() {
    return api.get('/category', {
      withCredentials: false
    })
  },

  createCategory(categoryData) {
    return api.post('/category', categoryData)
  }

  }

  