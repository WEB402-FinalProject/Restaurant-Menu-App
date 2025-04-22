// services/authService.js
import api from '../api'

export default {
  login(username, password) {
    return api.post('/auth/login', { username, password }, {
      withCredentials: false
    })
  },

  }
