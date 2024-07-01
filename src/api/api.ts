import axios from 'axios';

// Crear una instancia de Axios
const api = axios.create({
  baseURL: 'https://fakestoreapi.com', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
