import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Dodavanje tokena u svaki request
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

export default api;
