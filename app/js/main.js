$(function(){




    // звездный рейтинг
  $(".star-box__star").rateYo({
    maxValue: 1.0,
    numStars: 1.0,
    readOnly: true,
    normalFill: "#FFB800",
    starWidth: "16px"
      
  });
  
  // галерея
  var containerEl1 = document.querySelector('[data-ref="mixitup-container-1"]');
  var containerEl2 = document.querySelector('[data-ref="mixitup-container-2"]');
 
  var config = {
    controls: {
      scope: 'local'
    }
  };
 
  var mixer1 = mixitup(containerEl1, config);
  var mixer2 = mixitup(containerEl2, config);

});


// JS

  // слайдер 

  new Swiper('.slider__top', {
    speed: 900,
    slidesPerView: 'auto',
    loop: true,
    grabCursor: true,
   // Navigation arrows
   navigation: {
     nextEl: '.slider__top-button-next',
     prevEl: '.slider__top-button-prev'
   },


   effect: 'coverflow',
   coverflowEffect: {
     rotate: 30,
     slideShadows: false,
   },

   pagination: {
    el: '.slider__top-pagination',
    dynamicBullets: true,
    clickable: true,
    
  },
   
  });

// открытие меню каталога

const catalogMenu = function () {

const list = document.querySelector('.header__bottom-catalog');
const catalogList = document.querySelector('.header__bottom-catalog-list');
const arrowCatalogList = document.querySelector('.header__bottom-catalog-icon-arrow');

list.addEventListener('click', (event) => {
  list.classList.toggle('--active');
  catalogList.classList.toggle('--active');
  arrowCatalogList.classList.toggle('--active');
})

window.addEventListener('click', (event) => { 
  const target = event.target; 
  if (!target.closest('.header__bottom-catalog')) { 
    list.classList.remove('--active');
    catalogList.classList.remove('--active');
    arrowCatalogList.classList.remove('--active');
  }
})

}

catalogMenu ();


// счетчик товаров каталога
const counter = function () {
  const btns = document.querySelectorAll('.counter__button');


  btns.forEach(btn => {
    btn.addEventListener('click', function () {
      const direction = this.dataset.direction;
      const inp = this.parentElement.querySelector('.counter__value');
      const currentValue = +inp.value;
      let newValue;

      if (direction === 'plus') {
        newValue = currentValue + 1;
      } else {
        newValue = currentValue - 1 > 0 ? currentValue - 1 : 0;
      }

      if (newValue > 99) {
        return 99;
      }

      inp.value = newValue;
    })
  })

}

counter();


