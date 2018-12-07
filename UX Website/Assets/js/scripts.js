$('.hamburger').on('click', function()
{
	"use strict";
	
	$('.menu').toggleClass('open');
	$('.line').toggleClass('transition');
	$('.overlay').toggleClass('show');
	$('body').toggleClass('noScroll');
	$('.carousel-indicators').toggleClass('hide');
});

$('.overlay').on('click', function()
{
	"use strict";
	$('.menu').removeClass('open');
	$('.line').removeClass('transition');
	$('.overlay').removeClass('show');
	$('body').removeClass('noScroll');
	
	$('.carousel-indicators').removeClass('hide');
	
});
