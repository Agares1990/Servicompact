let toTop = document.querySelector(".to-top");
const navScroll = document.querySelector("header");
$(window).scroll(function() {
	if (window.scrollY > 100) {
    navScroll.classList.add("scroll");
  } else {
    navScroll.classList.remove("scroll");
  }

});

$('.counter').each(function() {
  var $this = $(this),
      countTo = $this.attr('data-count');

  $({ countNum: $this.text()}).animate({
    countNum: countTo
  },

  {

    duration: 8000,
    easing:'linear',
    step: function() {
      $this.text(Math.floor(this.countNum));
    },
    complete: function() {
      $this.text(this.countNum);
      //alert('finished');
    }

  });
});
