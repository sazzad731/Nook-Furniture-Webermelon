import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";



const track = document.getElementById("tickerTrack");

const clone = track.innerHTML;
track.innerHTML += clone;

let speed = 1;
let position = 0;

function scrollTicker() {
  position -= speed;

  if (Math.abs(position) >= track.scrollWidth / 2) {
    position = 0;
  }

  track.style.transform = `translateX(${position}px)`;

  requestAnimationFrame(scrollTicker);
}

scrollTicker();








const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  mousewheel: true,
  
  
  // If we need pagination
  pagination: {
      el: ".swiper-pagination",
    },
    
    // Navigation arrows
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    slidesPerView: 4,
});