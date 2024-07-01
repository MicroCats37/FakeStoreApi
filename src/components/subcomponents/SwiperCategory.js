import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

var swiper = new Swiper(".swiper_category", {
    
    initialSlide: 3, 
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    
    pagination: {
      el: ".swiper-pagination",
    },
  });