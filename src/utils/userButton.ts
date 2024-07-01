import {capitalizeFirstLetter} from '../utils/capitalizeFirstLetter'
    import { clearUserData } from '../utils/getcookies';
    import type {User} from '../api/types'
    import {getUserById}from '../api/productsService.ts'
    document.addEventListener('DOMContentLoaded', async () => {
        
        const userData = localStorage.getItem('userData');
        
        if (userData) {
            try{
                const userId=JSON.parse(userData);
                const user = await getUserById(userId.id) as User|null; 
                if (user){
                    const firstname = user.name?.firstname ?? 'Nombre no disponible';
                    const lastname = user.name?.lastname ?? 'Apellido no disponible';
                    const email = user?.email ?? 'Apellido no disponible';
                    const userNames = document.querySelectorAll('.user_name');
                    const userEmails = document.querySelectorAll('.user_email');
// Itera sobre cada elemento y asigna el contenido de texto
                    userNames.forEach((userName) => {
                        if (userName instanceof HTMLParagraphElement) {
                            userName.textContent = `¡Hola! ${capitalizeFirstLetter(firstname)} ${capitalizeFirstLetter(lastname)}`;
                        }
                    });  
                    userEmails.forEach((userEmail) => {
                        if (userEmail instanceof HTMLParagraphElement) {
                            userEmail.textContent = `email: ${email}`;
                        }
                    });           
                }        
            }
            catch (e) {
            console.error('Error parsing user data from localStorage', e);
        }
        
        };

        
            const logoutButtons = document.querySelectorAll('.logout-button');
    
            logoutButtons.forEach(button => {
                button.addEventListener('click', () => {
                    clearUserData();
                    window.location.href = '';
                });
            });
        
    });