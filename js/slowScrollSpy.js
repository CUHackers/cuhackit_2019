var scroll_offset=0;
var spy_offset=88;


$(document).ready(function(){

    $('body').scrollspy({target: "nav", offset: spy_offset});
    /*
    $("nav a").on('click', function(event) {
	event.preventDefault();
	$($(this).attr('href'))[0].scrollIntoView();
	scrollBy(0, -scroll_offset);
    });*/


    $("nav .nav-link").on('click', function(event) {
	event.preventDefault();
	if (this.hash !== "") {
	    var hash = this.hash;
	    $('html, body').animate({
		scrollTop: $(hash).offset().top + -scroll_offset
	    }, 800, function(){
		window.location.hash = hash;
	    });
	}
    });
});
