var isiPad = navigator.userAgent.match(/iPad/i) != null;

$(window).resize(function(){
	if ( $(window).width() > 960 && !isiPad ) window.location.href = "/";
});

$(window).ready(function(){
	if ( $(window).width() > 960 && !isiPad ) window.location.href = "/";
});