$(function(){

//Меню бургер
$('.nav').on('click', function(){
	$('.menu-icon').toggleClass('menu-icon--active');
	$('.nav__body').toggleClass('nav__body--active');
	$('body').toggleClass('lock');
})


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
keyboard: {
	enabled: true,
	onlyInViewport: false,
},
  
});


// слайдер partners
new Swiper('.partners__swiper', {
  slidesPerView: 2,
  loop: true,

  grabCursor: true,
  speed: 600,
    
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  },

	breakpoints: {
    576: {
      slidesPerView: 3,
			spaceBetween: 93,

    },
    768: {
      slidesPerView: 4,

    },
    992: {
      slidesPerView: 5,
    },
		1200: {
      slidesPerView: 6,
			spaceBetween: 120,
    }
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

	
// кнопка поиска (скрытие, открытие при адаптиве)
const searchHeader = function () {

	const search = document.querySelector('.user-nav__item-search');
	const headerFormSearch = document.querySelector('.header-bottom__form');
	
	search.addEventListener('click', (event) => {
		headerFormSearch.classList.toggle('header-bottom__form--active');
	})
	
}
searchHeader ();

// замена значения placeholer при адаптиве
var inp = document.querySelector('.header-bottom__input');
window.addEventListener('resize', changePlaceholder);
changePlaceholder.call(window);

function changePlaceholder() {
  inp.setAttribute('placeholder', this.innerWidth >= 768 ? 'Найти в магазине ...' : 'Я ищу ...');
}

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

// добавление, удаление класса у button вида расположения товаров на странице каталога
const list = document.querySelectorAll('.content-filter__button')
list.forEach(item =>{ 
       item.addEventListener('click', (e) =>{
       list.forEach(el=>{ el.classList.remove('content-filter__button--active'); });
       item.classList.add('content-filter__button--active');
   })
 
});

// вид расположения товара на странице каталога
const buttonList = document.querySelector('.button-list');
const buttonGrid = document.querySelector('.button-grid');
const contentProduct = document.querySelectorAll('.filters-catalog__content-product');
const contentProductList = document.querySelectorAll('.filters-catalog__content-list');

buttonList.addEventListener("click", function(event) {
  event.preventDefault();
	contentProductList.forEach((el) => {
    el.classList.add("filters-catalog__content-list--list");
  });
  contentProduct.forEach((el) => {
    el.classList.add("filters-catalog__content-product--list");
  });
});

buttonGrid.addEventListener("click", function(event) {
  event.preventDefault();
	contentProductList.forEach((el) => {
    el.classList.remove("filters-catalog__content-list--list");
  });
  contentProduct.forEach((el) => {
    el.classList.remove("filters-catalog__content-product--list");
  });
});

// buttonList.addEventListener("click", function(event) {
//   event.preventDefault();
//   for(var i = 0; i < contentProduct.length; i++) {
//     contentProduct[i].classList.add("filters-catalog__content-product--list");
//   }
// });


// функция скрытия сайдбара при адаптиве
const sidebarHidden = function () {

const buttonFilters = document.querySelector('.content-filter__button-sidebar-hidden');
const sidebarBox = document.querySelector('.sidebar-box');
const menuIconSidebar = document.querySelector('.menu-icon-sidebar');
const bodyLock = document.querySelector('.body');

buttonFilters.addEventListener('click', (event) => {
	sidebarBox.classList.toggle('sidebar-box--active');
	bodyLock.classList.toggle('lock');
	menuIconSidebar.classList.toggle('menu-icon-sidebar--active');
})
menuIconSidebar.addEventListener('click', (event) => {
	sidebarBox.classList.toggle('sidebar-box--active');
	menuIconSidebar.classList.toggle('menu-icon-sidebar--active');
	bodyLock.classList.toggle('lock');
})

}
sidebarHidden ();


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




// Dynamic Adapt 

"use strict";

function DynamicAdapt(type) {
	this.type = type;
}

DynamicAdapt.prototype.init = function () {
	const _this = this;
	// массив объектов
	this.оbjects = [];
	this.daClassname = "_dynamic_adapt_";
	// массив DOM-элементов
	this.nodes = document.querySelectorAll("[data-da]");

	// наполнение оbjects объктами
	for (let i = 0; i < this.nodes.length; i++) {
		const node = this.nodes[i];
		const data = node.dataset.da.trim();
		const dataArray = data.split(",");
		const оbject = {};
		оbject.element = node;
		оbject.parent = node.parentNode;
		оbject.destination = document.querySelector(dataArray[0].trim());
		оbject.breakpoint = dataArray[1] ? dataArray[1].trim() : "767";
		оbject.place = dataArray[2] ? dataArray[2].trim() : "last";
		оbject.index = this.indexInParent(оbject.parent, оbject.element);
		this.оbjects.push(оbject);
	}

	this.arraySort(this.оbjects);

	// массив уникальных медиа-запросов
	this.mediaQueries = Array.prototype.map.call(this.оbjects, function (item) {
		return '(' + this.type + "-width: " + item.breakpoint + "px)," + item.breakpoint;
	}, this);
	this.mediaQueries = Array.prototype.filter.call(this.mediaQueries, function (item, index, self) {
		return Array.prototype.indexOf.call(self, item) === index;
	});

	// навешивание слушателя на медиа-запрос
	// и вызов обработчика при первом запуске
	for (let i = 0; i < this.mediaQueries.length; i++) {
		const media = this.mediaQueries[i];
		const mediaSplit = String.prototype.split.call(media, ',');
		const matchMedia = window.matchMedia(mediaSplit[0]);
		const mediaBreakpoint = mediaSplit[1];

		// массив объектов с подходящим брейкпоинтом
		const оbjectsFilter = Array.prototype.filter.call(this.оbjects, function (item) {
			return item.breakpoint === mediaBreakpoint;
		});
		matchMedia.addListener(function () {
			_this.mediaHandler(matchMedia, оbjectsFilter);
		});
		this.mediaHandler(matchMedia, оbjectsFilter);
	}
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, оbjects) {
	if (matchMedia.matches) {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			оbject.index = this.indexInParent(оbject.parent, оbject.element);
			this.moveTo(оbject.place, оbject.element, оbject.destination);
		}
	} else {
		for (let i = 0; i < оbjects.length; i++) {
			const оbject = оbjects[i];
			if (оbject.element.classList.contains(this.daClassname)) {
				this.moveBack(оbject.parent, оbject.element, оbject.index);
			}
		}
	}
};

// Функция перемещения
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
	element.classList.add(this.daClassname);
	if (place === 'last' || place >= destination.children.length) {
		destination.insertAdjacentElement('beforeend', element);
		return;
	}
	if (place === 'first') {
		destination.insertAdjacentElement('afterbegin', element);
		return;
	}
	destination.children[place].insertAdjacentElement('beforebegin', element);
}

// Функция возврата
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
	element.classList.remove(this.daClassname);
	if (parent.children[index] !== undefined) {
		parent.children[index].insertAdjacentElement('beforebegin', element);
	} else {
		parent.insertAdjacentElement('beforeend', element);
	}
}

// Функция получения индекса внутри родителя
DynamicAdapt.prototype.indexInParent = function (parent, element) {
	const array = Array.prototype.slice.call(parent.children);
	return Array.prototype.indexOf.call(array, element);
};

// Функция сортировки массива по breakpoint и place 
// по возрастанию для this.type = min
// по убыванию для this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
	if (this.type === "min") {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return -1;
				}

				if (a.place === "last" || b.place === "first") {
					return 1;
				}

				return a.place - b.place;
			}

			return a.breakpoint - b.breakpoint;
		});
	} else {
		Array.prototype.sort.call(arr, function (a, b) {
			if (a.breakpoint === b.breakpoint) {
				if (a.place === b.place) {
					return 0;
				}

				if (a.place === "first" || b.place === "last") {
					return 1;
				}

				if (a.place === "last" || b.place === "first") {
					return -1;
				}

				return b.place - a.place;
			}

			return b.breakpoint - a.breakpoint;
		});
		return;
	}
};

const da = new DynamicAdapt("max");
da.init();