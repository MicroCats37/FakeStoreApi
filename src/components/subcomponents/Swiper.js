import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';
const imagenesSwiper = document.getElementsByClassName('swiper_image');

// Crear un array para almacenar los enlaces de las imágenes
const images = [];

// Iterar sobre cada elemento con la clase 'swiper_image' y obtener su atributo src (enlace de la imagen)
// Obtener todas las imágenes con la clase 'swiper_image

// Iterar sobre cada elemento con la clase 'swiper_image' y obtener su atributo src (enlace de la imagen)
for (let i = 0; i < imagenesSwiper.length; i++) {
  images.push(imagenesSwiper[i].src);
}

// Ahora, `enlacesImagenesSwiper` contiene los enlaces de todas las imágenes con la clase 'swiper_image'


var swiper = new Swiper(".mySwiper", {
  effect: "flip",
  lazy: true,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  pagination: {
    direction: "vertical",
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {/*return '<span style="width:100%; height:auto; margin:4px;border-radius: 0; padding: 0; background-color: transparent" class="' + className + ' swiper-pagination-bullet-active' +'">'
    +'<div style="width:100%; height:auto; border: 1px solid black; overflow:hidden;">'  
    + '<img style="width:100%; height:100%; transition: transform 0.3s ease-in;" src="' + images[index] + '" alt="Bullet Image" ' 
    + 'onmouseover="this.style.transform=\'scale(1.1)\';" onmouseout="this.style.transform=\'scale(1)\';">' +'</div>'
    + '</span>';*/ 
      return '<span style="width:100%; height:auto; margin:4px;border-radius: 0; padding: 0; background-color: transparent" class="' + className + ' swiper-pagination-bullet-active' +'">'
      +'<div style="width:100%; aspect-ratio:1/1; border: 1px solid black; overflow:hidden;">'  
      + '<img style="width:100%; height:100%; transition: transform 0.3s ease-in;" src="' + images[index] + '" alt="Bullet Image" ' 
      + 'onmouseover="this.style.transform=\'scale(1.1)\';" onmouseout="this.style.transform=\'scale(1)\';">' +'</div>'
      + '</span>';
    },
  },
});

/*
var swiper = new Swiper(".mySwiper", {

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
    renderBullet: function (index, className) {
      return '<span style="width:auto; height:100%; gap:0px;" class="' + className + ' swiper-pagination-bullet-active' +'">'  
      + '<img style="width:auto; height:100%; border: 1px solid black; transition: box-shadow 0.3s ease;" src="' + images[index] + '" alt="Bullet Image" ' 
      + 'onmouseover="this.style.boxShadow=\'0 0 5px black\';" onmouseout="this.style.boxShadow=\'none\';">' 
      + '</span>';
    },
  },
});
*/

