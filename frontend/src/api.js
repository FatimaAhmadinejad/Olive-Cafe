import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api/menu',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getCategories = () => api.get('/categories');
export const getProducts = () => api.get('/products');
export const getProductsByCategory = (categoryId) => api.get(`/products/${categoryId}`);

export default api;