import type {CartUser,User} from '../api/types'
    import { getProductById } from '../api/productsService';
    import {loadProducts} from '../utils/carts'
    import { getLocalStorageItem } from '../utils/getcookies';
    document.addEventListener('DOMContentLoaded', async () => {
    const userId = getLocalStorageItem('userData');

    let id = "0";// para cuando no haya usuario logeado.

    if (userId) {
        const user=JSON.parse(userId);
        if(user){
            id=user.id
        }
    } 

    const cart = getLocalStorageItem(`cart_${id}`);
    if (cart){
        const userCart = JSON.parse(cart) as CartUser;
        for (const item of userCart.cart) {
            if (item.productId && item.quantity) {
            try {
                const product = await getProductById(item.productId);
                loadProducts(product,item.quantity);
                
            } catch (error) {
                console.error('Error fetching product:', error);
            }
            }
        }
    }
    else{
        localStorage.setItem('cart_0', JSON.stringify({ userId: 0, cart: [] } as CartUser));
    }
});

//se usa en NavBar.astro

    