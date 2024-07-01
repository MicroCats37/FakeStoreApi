import { getLocalStorageItem } from '../utils/getcookies';
    import { loadQuantity } from '../utils/carts.ts'
    import type { CartUser } from '../api/types';
    const container = document.querySelector('.dropdown_content_cart') as HTMLElement;
    const userIdItem= getLocalStorageItem('userData');
    console.log(userIdItem);
    let id = 0;
    if(userIdItem){
        const userId=JSON.parse(userIdItem);
        id=userId.id;
    }
    
    container.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        const cartProduct = target.closest('.cart_product') as HTMLElement;
        if(cartProduct){
            const numberInput = cartProduct.querySelector('.number') as HTMLInputElement;
            const productId = cartProduct.querySelector('.cart_product_id') as HTMLInputElement;
            const deleteProdcut = cartProduct.querySelector('.delete_product') as HTMLInputElement
            // elimina si se preciona el boton x or trash del contenedor selecionado
            if (target.classList.contains('delete_product') && productId){
                const cart:CartUser =JSON.parse(getLocalStorageItem(`cart_${id}`) ?? 'error');
                if(cart && cart.cart){
                    cart.cart = cart.cart.filter(product => product.productId !== parseInt(productId.textContent ?? '0'));
                    // Guardar el carrito actualizado en el almacenamiento local
                    localStorage.setItem(`cart_${id}`, JSON.stringify(cart));
                }
                const cartProductforDelete = target.closest('.cart_product') as HTMLElement;
                if (cartProductforDelete) {
                    cartProductforDelete.remove(); // Eliminar el contenedor padre .cart_product
                }

            }
            
            if (target.classList.contains('increment')) {
                increment(numberInput);
            } else if (target.classList.contains('decrement')) {
                decrement(numberInput);
            }

            


            //update dentro de dropduwncart content
            if(productId){
                const cart:CartUser =JSON.parse(getLocalStorageItem(`cart_${id}`) ?? 'error');
                if(cart && cart.cart){
                    cart.cart.forEach(product => {
                        if(product.productId===parseInt(productId.textContent ?? '0')){
                            product.quantity=parseInt(numberInput.value);
                            localStorage.setItem(`cart_${id}`,JSON.stringify(cart))
                        } 
                    });
                }    
            }
        }
    });

    function increment(numberInput: HTMLInputElement) {
        const max = parseInt(numberInput.max);
        let currentValue = parseInt(numberInput.value);
        if (currentValue < max) {
            numberInput.value = (currentValue + 1).toString();
            
        }
    }

    function decrement(numberInput: HTMLInputElement) {
        const min = parseInt(numberInput.min);
        let currentValue = parseInt(numberInput.value);
        if (currentValue > min) {
            numberInput.value = (currentValue - 1).toString();
        }
    }
