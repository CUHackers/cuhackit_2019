
$(document).ready(function(){
  // Add scrollspy to <body>
  $('body').scrollspy({target: "#myNavbar", offset: 100});

  // Add smooth scrolling on all links inside the navbar
  $("#myNavbar a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
        window.location.hash = hash;
      });
    }
  });



    function activateOnScroll() {
	var x = $('#myNavbar  a.active').attr('href');
	console.log("active: " + x);
	if (x === "#top") {
	    $('#hideOnCountdown').hide();
	} else {
	    $('#hideOnCountdown').show();
	}

    }



    $(window).on('activate.bs.scrollspy', activateOnScroll)
    activateOnScroll();

});
