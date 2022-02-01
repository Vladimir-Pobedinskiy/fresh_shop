$(function(){

  // слайдер 
  $('.slider__top').slick({
    speed: 700,
    easing:'ease',
  });

    // звездный рейтинг
    $(".star").rateYo({
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



// js 

// открытие меню каталога

const list = document.querySelector('.header__bottom-catalog');
const catalogList = document.querySelector('.header__bottom-catalog-list');
const arrowCatalogList = document.querySelector('.header__bottom-catalog-icon-arrow');
const body = document.querySelector('.body');

list.addEventListener('click', (event) => {
  list.classList.toggle('__active');
  catalogList.classList.toggle('__active');
  arrowCatalogList.classList.toggle('__active');
})

window.addEventListener('click', (event) => { 
  const target = event.target 
  if (!target.closest('.header__bottom-catalog')) { 
    catalogList.classList.remove('__active');
    arrowCatalogList.classList.remove('__active');
    list.classList.remove('__active');
  }
})




