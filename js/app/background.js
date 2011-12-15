
PF.Background = function() { 

	var 
		R = null,
		angle = 0,
		rectangle = null,
		paused = false,
		
		timeoutResize = null,
		
		initialize = function(){

			R = Raphael(document.getElementById("background"), "100%", "100%");
			
			var
				fWidth = $(window).width(),
				fHeight = $(window).height(),
				rectAttr = {
					"stroke" : "#222222",
					"stroke-width" : 0,
					"stroke-opacity" : 0,
					"fill" : "#222222"
				};
		
			rectangle = R.path("M0,0L" + fWidth + ",0 " + fWidth + "," + fHeight + " 0," + fHeight + "Z").attr(rectAttr);

			// shim layer with setTimeout fallback
			// Credit to Paul Irish http://bit.ly/fxq7EY
			window.requestAnimFrame = (function() {
				 return window.requestAnimationFrame ||
						window.webkitRequestAnimationFrame ||
						window.mozRequestAnimationFrame ||
						window.oRequestAnimationFrame ||
						window.msRequestAnimationFrame ||
						function( /* function */ callback, /* DOMElement */ element) {
							window.setTimeout(callback, 1000 / 60);
						};
			})();

			displayWhiteStuffs();
			$(window).resize(function(){
				resizeWhiteStuffs();
			});
		},
		
		random = function(X) {
			return Math.floor(X * (Math.random() % 1));
		},
		
		randomBetween= function(MinV, MaxV) {
			return MinV + random(MaxV - MinV + 1);
		},
		
		displayWhiteStuffs = function(){
			
			var duration = 3500;
			
			rectangle.animate({
				"transform" : "r0"
			}, duration, function(){
				angle = angle > 0 ? randomBetween(40, 100) * -.01 : randomBetween(40, 100) * .01;
				rectangle.animate({
					"transform" : "r" + angle
				}, duration, function(){
					displayWhiteStuffs();
				});
			});
		},
		
		resizeWhiteStuffs = function(){
			var
				fWidth = $(window).width(),
				fHeight = $(window).height();

			rectangle.attr("path", "M0,0L" + fWidth + ",0 " + fWidth + "," + fHeight + " 0," + fHeight + "Z");
		};

	initialize();
};
