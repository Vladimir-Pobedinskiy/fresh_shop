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
  
