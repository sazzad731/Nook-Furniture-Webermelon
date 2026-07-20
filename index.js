import Swiper from "https://cdn.jsdelivr.net/npm/swiper@12/swiper-bundle.min.mjs";



document.addEventListener("DOMContentLoaded", function(){
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


  // Futura stat Animation
  function handleStats() {
    const stats = document.querySelectorAll(".stat-value");

    function startCounting(element) {
      const target = parseInt(element.getAttribute('data-stat-value'));
      let count = 0;
      const duration = 2000;
      const increment = target / (duration / 20);

      const counter = setInterval(() => { 
        count += increment;
        if (count >= target)
        {
          element.textContent = `${target} +`
          clearInterval(counter)
        } else { 
          element.textContent = `${Math.floor(count)} +`
        }
      }, 20)
    }


    const observer = new IntersectionObserver((entries, observer) =>
    {
      entries.forEach(entry =>
      {
        if (entry.isIntersecting)
        {
          startCounting(entry.target);
          observer.unobserve(entry.target);
        }
      })
    }, { threshold: 0.5 });

    stats.forEach((stat) => {
      observer.observe(stat);
    });
    
  }
  handleStats();


  // text message character count
  function countCharacter() { 
    const textArea = document.querySelector(".text-area");
    const countDisplay = document.querySelector(".text-count-display");

    textArea.addEventListener("input", (e) => {
      countDisplay.innerText = `${e.target.value.length}/200`;
      if (e.target.value.length > 200) {
        countDisplay.style.color = "#f8b7b7";
      }else{
        countDisplay.style.color = "#989898";
      }
    })
  }
  countCharacter()
})








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