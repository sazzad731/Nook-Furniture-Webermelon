import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";



document.addEventListener("DOMContentLoaded", function(){
  // navbar dropdown functionality
  function handleMenuDropdown(){
    const menuBar = document.querySelector(".menu-bar");
    const navDropdown = document.querySelector(".nav-dropdown");
    menuBar.addEventListener("click", (e)=>{
      if(navDropdown.classList.contains("active")){
        navDropdown.classList.remove("active");
      }else{
        navDropdown.classList.add("active");
      }
      navDropdown.addEventListener("click", function () {
        navDropdown.classList.remove("active");
      })
    })

  }
  handleMenuDropdown();
  
  
  
  // marquee functionality
  function handleMarquee(){
    const track = document.getElementById("tickerTrack");

    const clone = track.innerHTML;
    track.innerHTML = clone + clone + clone + clone;

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
  };
  handleMarquee();




  // category functionality
  function handleCategory(){
    const tabs = document.querySelectorAll(".tab-item")
    const productCardContainer = document.querySelector(".collection-grid")
    const productCard = document.querySelectorAll(".collection-grid-item");

    function filterCategory(category){
      productCard.forEach(product=> {
        
        if(category === "all"){
          product.classList.remove("hide")
        }else if(product.dataset.category === category){
          product.classList.remove("hide")
        }else{
          product.classList.add("hide")
        }
      })

      tabs.forEach(tab=> category === tab.dataset.filter? tab.classList.add("active") :  tab.classList.remove("active"))
    }


    tabs.forEach(tab=>{
      tab.addEventListener("click", function(){
        filterCategory(this.dataset.filter);
      })
    })

  }
  handleCategory();


  // Futura section stats
  function handleStats(){
    const statsValue = document.querySelectorAll(".stat-value")

    function startCounting(element){
      const target = parseInt(element.getAttribute("data-stat-value"));
      let count = 0;
      const duration = 2000;
      const increment = target / (duration / 20);

      const counter = setInterval(()=>{
        count += increment;
        if(count >= target){
          element.textContent = `${target} +`
          clearInterval(counter);
        }else{
          element.textContent = `${Math.floor(count)} +`
        }
      },20)
    }

    const observer = new IntersectionObserver((entries, observer)=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          startCounting(entry.target);
          observer.unobserve(entry.target);
        }
      })
    }, {threshold: 0.5})

    statsValue.forEach(stat=> observer.observe(stat));
  }
  handleStats();


  // show character length in textarea
  function handleTextarea(){
    const textarea = document.querySelector(".text-area");
    const charDisplay = document.querySelector(".textarea-char-display");

    textarea.addEventListener("input", (event)=>{
      charDisplay.textContent = `${event.target.value.length}/200`
      if(event.target.value.length > 200){
        charDisplay.style.color = "#f8bcbc";
      }else{
        charDisplay.style.color = "#989898";
      }
    })
  };
  handleTextarea()
})






let slidesPerView = 4.21;
// if(screen.width === 1024){
//   slidesPerView = 3;
// }
if(screen.width <= 768){
  slidesPerView = 3;
}
if(screen.width <= 425){
  slidesPerView = 2;
}
const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  mousewheel: true,
  slidesPerView: slidesPerView,
  // freeMode: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next-custom",
    prevEl: ".swiper-button-prev-custom",
  },
});