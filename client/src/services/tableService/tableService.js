import api from '../api';

const tableService = {
  // Fetch all tables
  getTables: () => api.get('/tables'),

  // Create a new table
  createTable: (data) => api.post('/tables', data),

  // Update an existing table
  updateTable: (id, data) => api.put(`/tables/${id}`, data),

  // Delete a table
  deleteTable: (id) => api.delete(`/tables/${id}`)
};

export default tableService;
