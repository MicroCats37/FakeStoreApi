import { login,getUserByLogin,getProductById, getUserById} from '../api/productsService';
import type {CartUser} from '../api/types'
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevenir comportamiento por defecto

            const username = (document.getElementById('username') as HTMLInputElement).value;
            const password = (document.getElementById('password') as HTMLInputElement).value;

            try {

                const expirationDate = new Date();
                 expirationDate.setDate(expirationDate.getDate() + 1); 
                 // Ejemplo: expira en 1 dia
                const response = await login(username, password);

                const userId = await getUserByLogin(username, password);
                console.log((userId));
                if (userId !== null && userId !== undefined) {
                    // Obtener el carrito del localStorage
                    const cartDataString = localStorage.getItem(`cart_${userId}`);
                    if ((cartDataString === null)) {
                        // Si hay datos previos, parsearlos y asegurar el tipo
                        localStorage.setItem(`cart_${userId}`, JSON.stringify({userId:userId,cart:[]}as CartUser));
                    }
                    localStorage.setItem('userData', JSON.stringify({"id":userId}));    
                } else {
                    const userData= userId;
                }
                
                
                console.log('Login successful:', response);
                // Manejar la respuesta exitosa, por ejemplo, guardar el token y redirigir al usuario
                // window.location.href = '/dashboard'; // Redirigir a otra página después del login
                 // Almacenar el token en una cookie con una fecha de expiración
                 
                localStorage.setItem('authToken', 'your-auth-token');
                 document.cookie = `authToken=${response.token}; expires=${expirationDate.toUTCString()}; path=/`;
                 
                 window.location.href = '/';
               
            } catch (error) {
                console.error('Error during login:', error);
                const errorMessage = document.getElementById('error-message') as HTMLParagraphElement;
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                    errorMessage.textContent = 'Login failed. Please check your credentials and try again.';
                }
            }
        });
    }
});