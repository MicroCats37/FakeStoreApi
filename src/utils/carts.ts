import getAuth from './loginverification';
import { getLocalStorageItem } from './getcookies';
import { getProductById } from '../api/productsService';
import type { Root,CartUser } from '../api/types';

document.addEventListener('DOMContentLoaded', () => {
  const addToCartButton = document.getElementById('add_to_cart');
  const addQuantityCart = document.querySelector('.quantity-page') as HTMLInputElement | null;
  const cartContent = document.querySelector('.dropdown_content_cart') as HTMLElement;
  const cartProductTemplate = document.getElementById('template-card') as HTMLElement;
  if (addToCartButton !== null && addToCartButton !== undefined && addQuantityCart !== null && addQuantityCart !== undefined) {
    addToCartButton.addEventListener('click', async function(event) {
      event.preventDefault();
      const idElement = document.getElementById('id_to_cart')?.textContent;
      if (idElement !== null && idElement !== undefined) {
        const id = parseInt(idElement);
        try {
          
          const product = await getProductById(id);
          appendProductCart(id,parseInt(addQuantityCart.value),product);
          console.log((addQuantityCart.value))
          
        } catch(error) {
          console.error('Error al obtener el producto:', error);
          alert('Error al obtener el producto. Por favor, inténtalo de nuevo.');
        }
      }
    });
  }
});

//carga y dibuja lso productos en la dropdown content cart
export function loadProducts(product:Root,quantity:number):void{
  const cartContent = document.querySelector('.dropdown_content_cart') as HTMLElement;
  const cartProductTemplate = document.getElementById('template-card') as HTMLElement;
  const cartFooter = document.querySelector('.footer_cart') as HTMLElement;
  
  if (!cartProductTemplate) {
      console.error('El elemento de plantilla con id "template-card" no fue encontrado.');
      return;
  }
  
  if (!cartContent) {
      console.error('El elemento de contenido del carrito con id "cart-content" no fue encontrado.');
      return;
  }

  if (!cartFooter) {
    console.error('El elemento de footer del carrito con clase "dropdown_footer" no fue encontrado.');
    return;
  }
  
  const clone = cartProductTemplate.cloneNode(true) as HTMLElement;
  clone.removeAttribute('id'); // Eliminar el id para evitar duplicados
  (clone.querySelector('.cart_title') as HTMLElement).textContent = product.title;
  (clone.querySelector('.cart_product_id') as HTMLElement).textContent = product.id.toString();
  (clone.querySelector('.cart_price') as HTMLElement).textContent = `$/ ${product.price.toString()}`;
  (clone.querySelector('.cart_image') as HTMLImageElement).src = product.image;
  (clone.querySelector('.quantity') as HTMLInputElement).value = quantity.toString();
  clone.style.display = 'flex';
  cartContent.insertBefore(clone, cartFooter);
}


//agrega los productos y actualiza visualmente y a nivel de data
function appendProductCart(productId:number,quantity:number,product:Root): void {
  const userData = getLocalStorageItem('userData');
  const auth = getAuth();
  if (userData && auth){
      const id = JSON.parse(userData);
      const cart = getLocalStorageItem(`cart_${id.id}`);
      if(cart){
        let userCart = JSON.parse(cart) as CartUser;
        updateCart(userCart,id.id,productId,quantity,product); 
      }
  }
  else{
    const cart = getLocalStorageItem('cart_0');
      if(cart){
        let userCart = JSON.parse(cart) as CartUser;
        updateCart(userCart,0,productId,quantity,product);
      }   
  }
}

//actualiza visualmente y a nivel de data
function updateCart(userCart:CartUser ,userId:number , productId:number, quantityToAdd:number,product:Root): void {
  let found = false;
  for (const item of userCart.cart) {
    if (item.productId === productId) {
        // Sumar la cantidad a la cantidad existente
        if (item.quantity !== null) {
            item.quantity += quantityToAdd;
        } else {
            item.quantity = quantityToAdd;
        }
        found = true;
        //si encontro un elemento productId ya almacenado simplemente le suma la nueva cantidad 
        loadQuantity(productId,item.quantity)
        break;
    }
  }
  if (!found) {
      // Si no se encontró un elemento con el mismo productId, agregar uno nuevo
      userCart.cart.push({ productId: productId, quantity: quantityToAdd });
      loadProducts(product,quantityToAdd); 
  }
  // Convertir userCart de nuevo a JSON
  const cartJson = JSON.stringify(userCart);
  console.log(userCart)
  // Guardar cartJson en el almacenamiento local
  localStorage.setItem(`cart_${userId}`, cartJson); 
}

//si encuentra el mismo producto simplemte suma las cantidades
export function loadQuantity(productId:number,quantity:number):void{
  const cartContent = document.querySelector('.dropdown_content_cart') as HTMLElement;
  const products = cartContent.querySelectorAll('.cart_product') as NodeListOf<HTMLElement>;
  products.forEach(product=>{
    const idContainer = product.querySelector('.cart_product_id') as HTMLParagraphElement|null;
    if(idContainer && idContainer.textContent===productId.toString()){
      
      const quantityValue = product.querySelector('.quantity') as HTMLInputElement|null;
      if (quantityValue){
        quantityValue.value=quantity.toString();
        console.log(quantity)
      }
    }
  })
}


