$(function(){

// стилизация select
$('.select-style').styler();


// rangeSlider (фильтр цены)
var $range = $(".price-filter__input");
var $inputFrom = $(".price-filter__input-from");
var $inputTo = $(".price-filter__input-to");
var instance;
var min = 0;
var max = 1000;
var from = 0;
var to = 0;

$range.ionRangeSlider({
    skin: "round",
    type: "double",
    min: min,
    max: max,
    from: 200,
    to: 800,
    onStart: updateInputs,
    onChange: updateInputs,
    onFinish: updateInputs
});
instance = $range.data("ionRangeSlider");

function updateInputs (data) {
    from = data.from;
    to = data.to;

    $inputFrom.prop("value", from);
    $inputTo.prop("value", to);
}

$inputFrom.on("change", function () {
    var val = $(this).prop("value");

    // validate
    if (val < min) {
        val = min;
    } else if (val > to) {
        val = to;
    }

    instance.update({
        from: val
    });

    $(this).prop("value", val);

});

$inputTo.on("change", function () {
    var val = $(this).prop("value");

    // validate
    if (val < from) {
        val = from;
    } else if (val > max) {
        val = max;
    }

    instance.update({
        to: val
    });

    $(this).prop("value", val);
});

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

// слайдер header__top
new Swiper('.slider__top', {
  speed: 700,
  slidesPerView: 'auto',
  loop: true,
  grabCursor: true,

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
  clickable: true,
},
  
});


// слайдер partners
new Swiper('.partners__swiper', {
  slidesPerView: 6,
  loop: true,
  grabCursor: true,
  speed: 600,
    
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },
});


// добавление, удаление класса у button вида расположения товаров
const list = document.querySelectorAll('.content-filter__button')
list.forEach(item =>{ 
       item.addEventListener('click', (e) =>{
       list.forEach(el=>{ el.classList.remove('--active'); });
       item.classList.add('--active');
   })
 
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


// SPOLLERS
const spollersFilter = function () {

const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
	// Получение обычных слойлеров
	const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
		return !item.dataset.spollers.split(",")[0];
	});
	// Инициализация обычных слойлеров
	if (spollersRegular.length > 0) {
		initSpollers(spollersRegular);
	}

	// Инициализация
	function initSpollers(spollersArray, matchMedia = false) {
		spollersArray.forEach(spollersBlock => {
			if (!matchMedia) {
				spollersBlock.classList.add('--init');
				initSpollerBody(spollersBlock);
				spollersBlock.addEventListener("click", setSpollerAction);
			} else {
				spollersBlock.classList.remove('--init');
				initSpollerBody(spollersBlock, false);
				spollersBlock.removeEventListener("click", setSpollerAction);
			}
		});
	}
	// Работа с контентом
	function initSpollerBody(spollersBlock, hideSpollerBody = true) {
		const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
		if (spollerTitles.length > 0) {
			spollerTitles.forEach(spollerTitle => {
				if (hideSpollerBody) {
					spollerTitle.removeAttribute('tabindex');
					if (!spollerTitle.classList.contains('--active')) {
						spollerTitle.nextElementSibling.hidden = true;
					}
				} else {
					spollerTitle.setAttribute('tabindex', '-1');
					spollerTitle.nextElementSibling.hidden = false;
				}
			});
		}
	}

	function setSpollerAction(e) {
		const el = e.target;
		if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
			const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
			const spollersBlock = spollerTitle.closest('[data-spollers]');
			const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
			if (!spollersBlock.querySelectorAll('._slide').length) {
				if (oneSpoller && !spollerTitle.classList.contains('--active')) {
					hideSpollersBody(spollersBlock);
				}
				spollerTitle.classList.toggle('--active');
				_slideToggle(spollerTitle.nextElementSibling, 500);
			}
			e.preventDefault();
		}
	}

	function hideSpollersBody(spollersBlock) {
		const spollerActiveTitle = spollersBlock.querySelector('[data-spoller].--active');
		if (spollerActiveTitle) {
			spollerActiveTitle.classList.remove('--active');
			_slideUp(spollerActiveTitle.nextElementSibling, 500);
		}
	}
}

// анимация 
let _slideUp = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		window.setTimeout(() => {
			target.hidden = true;
			target.style.removeProperty('height');
			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideDown = (target, duration = 500) => {
	if (!target.classList.contains('_slide')) {
		target.classList.add('_slide');
		if (target.hidden) {
			target.hidden = false;
		}
		let height = target.offsetHeight;
		target.style.overflow = 'hidden';
		target.style.height = 0;
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight;
		target.style.transitionProperty = "height, margin, padding";
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		window.setTimeout(() => {
			target.style.removeProperty('height');
			target.style.removeProperty('overflow');
			target.style.removeProperty('transition-duration');
			target.style.removeProperty('transition-property');
			target.classList.remove('_slide');
		}, duration);
	}
}
let _slideToggle = (target, duration = 500) => {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

}
spollersFilter();



