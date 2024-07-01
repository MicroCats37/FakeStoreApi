

import api from './api';
import type { Root , AuthResponse, User } from './types'; // Importación solo de tipos // Asegúrate de que la ruta a 'types' sea correcta



// Función para hacer login
export const login = async (username: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { username, password });
  return response.data;
};

// Obtener todos los productos
export const getProducts = async (): Promise<Root[]> => {
  const response = await api.get<Root[]>('/products');
  return response.data;
};

// Obtener un producto por ID
export const getProductById = async (id: number): Promise<Root> => {
  const response = await api.get<Root>(`/products/${id}`);
  return response.data;
};

// Obtener todas las catgorias
export const getCategories = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/products/categories');
  return response.data;
};

export const getProductsByCategory = async (category: string): Promise<Root[]> => {
  const response = await api.get<Root[]>(`/products/category/${category}`);
  return response.data;
};


export async function getUserById(userId: number): Promise<User | null> {
  try {
      const response = await api.get<User>(`/users/${userId}`);
      // Verificar si la respuesta contiene datos
      if (response && response.data) {
          return response.data;
      } else {
          // Retornar null si no se encuentran datos
          return null;
      }
  } catch (error) {
      console.error('Error al obtener los datos del usuario:', error);
      // Retornar null en caso de error
      return null;
  }
}

// Función para obtener el ID del usuario
export async function getUserByLogin(username: string, password: string): Promise<number | null> {
  try {
      // Llamada a la API para obtener todos los usuarios usando la instancia de api
      const response = await api.get<User[]>('/users');
      const users = response.data;

      // Encontrar el usuario que coincida con el nombre de usuario y contraseña
      const user = users.find(user => user.username === username && user.password === password);
      // Si se encuentra el usuario, retornar el ID, si no, retornar null
      return user ? user.id : null;
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      return null;
  }
}