import type { User } from '../api/types'; 

// Obtener un valor de localStorage
export function getLocalStorageItem(name: string): string | null {
    return localStorage.getItem(name);
}

// Obtener el objeto de usuario desde localStorage
export const getUserFromLocalStorage = function(itemName: string): User | null {
    const userDataString = localStorage.getItem(itemName);
    
    if (!userDataString) {
        return null; // No se encontró el ítem en localStorage
    }

    try {
        return JSON.parse(userDataString) as User;
    } catch (error) {
        console.error("Error al parsear el objeto de usuario desde localStorage:", error);
        return null;
    }
};

// Eliminar un ítem del localStorage
export function removeLocalStorageItem(name: string): void {
    localStorage.removeItem(name);
}

// Eliminar los datos del usuario y el token de autenticación del localStorage
export function clearUserData(): void {
    removeLocalStorageItem('userData');
    removeLocalStorageItem('authToken');

}