// Filename: background.js
define([
	'jQuery',
	'Raphael'
], function($, Raphael){

	var 
		R = null,
		line = null,
		angle = 0,
		topLeft = null,
		topRight = null,
		rightTop = null,
		bottomLeft = null,
		leftBottom = null,
		leftTop = null,
		elements = [],
		paused = false,
		timeoutResize = null;

	var 
		frameNum = 0,
		initialize = function(){

			R = Raphael(document.getElementById("background"), "100%", "100%");
			angle = randomBetween(-20, 20);

			var
				fWidth = $(window).width(),
				fHeight = $(window).height(),
				hWidth = Math.round( $(window).width() / 2),
				hHeight = Math.round( $(window).height() / 2),
				defaultAttr = {
					"stroke" : "#ffffff",
					"stroke-width" : 0,
					"stroke-opacity" : 0,
					"fill" : "#ffffff"
				};

			line = R
				.path("M0," + fHeight + "L" + fWidth + ",0")
				.attr({
					"fill" : "#333333",
					"stroke" : "#333333",
					"stroke-width" : 1
				});
			
			topLeft = R.path("M0,0L0,0 " + hWidth + ",0Z").attr(defaultAttr);
			topRight = R.path("M" + hWidth + ",0L" + fWidth + ",0 " + fWidth + ",0Z").attr(defaultAttr);
			rightTop = R.path("M" + fWidth + ",0L" + fWidth + ",0 " + fWidth + "," + hHeight + "Z").attr(defaultAttr);
			bottomLeft = R.path("M0," + fHeight + "L0," + fHeight + " " + hWidth + "," + fHeight + "Z").attr(defaultAttr);
			leftBottom = R.path("M0," + fHeight + "L0," + hHeight + " 0," + fHeight + "Z").attr(defaultAttr);
			leftTop = R.path("M0,0L0," + hHeight + " 0,0").attr(defaultAttr);
			elements = [topLeft, topRight, rightTop, bottomLeft, leftBottom, leftTop];

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

			requestAnimFrame( run );
			$(window).resize(function(){
				clearTimeout(timeoutResize);
				paused = true;
				hideWhiteStuffs();
				timeoutResize = setTimeout(function(){
					paused = false;
					run();
				}, 1500);
			});
		},
		run = function() {
			if ( frameNum % 250 == 0 ) {
				displayWhiteStuffs();
			}
			if ( frameNum % 600 == 0 ) {
				rotateLine();
			}
			frameNum++;
			if (!paused) requestAnimFrame( run );
		},
		rotateLine = function() {
			angle = -1 * (angle + randomBetween(-2, 2) );
			line.animate({
				"transform" : "r" + angle + " 0 " + $(window).height()
			}, 250);
		},
		random = function(X) {
			return Math.floor(X * (Math.random() % 1));
		},
		randomBetween= function(MinV, MaxV) {
			return MinV + random(MaxV - MinV + 1);
		},
		displayWhiteStuffs = function(){
			var rand = random(elements.length);
			var
				duration = randomBetween(50, 150),
				randomOffset = random(30),
				fWidth = $(window).width(),
				fHeight = $(window).height(),
				hWidth = Math.round( $(window).width() / 2),
				hHeight = Math.round( $(window).height() / 2);
				
			switch (rand) {
				case 0 :
					if ( !topLeft.open ) {
						topLeft.animate({
							path : "M0,0L0," + randomOffset + " " + hWidth + ",0Z"
						}, duration, function(){
							topLeft.open = true;
						});
					} else {
						topLeft.animate({
							path : "M0,0L0,0 " + hWidth + ",0Z"
						}, duration, function(){
							topLeft.open = false;
						});
					}
					break;
				case 1 :
					if ( !topRight.open ) {
						topRight.animate({
							path : "M" + hWidth + ",0L" + fWidth + "," + randomOffset + " " + fWidth + ",0Z"
						}, duration, function(){
							topRight.open = true;
						});
					} else {
						topRight.animate({
							path : "M" + hWidth + ",0L" + fWidth + ",0 " + fWidth + ",0Z"
						}, duration, function(){
							topRight.open = false;
						});
					}
					break;
				case 2 :
					if ( !rightTop.open ) {
						rightTop.animate({
							path : "M" + fWidth + ",0L" + (fWidth - randomOffset) + ",0 " + fWidth + "," + hHeight + "Z"
						}, duration, function(){
							rightTop.open = true;
						});
					} else {
						rightTop.animate({
							path : "M" + fWidth + ",0L" + fWidth + ",0 " + fWidth + "," + hHeight + "Z"
						}, duration, function(){
							rightTop.open = false;
						});
					}
					break;
				case 3 :
					if ( !bottomLeft.open ) {
						bottomLeft.animate({
							path : "M0," + fHeight + "L0," + (fHeight - randomOffset) + " " + hWidth + "," + fHeight + "Z"
						}, duration, function(){
							bottomLeft.open = true;
						});
					} else {
						bottomLeft.animate({
							path : "M0," + fHeight + "L0," + fHeight + " " + hWidth + "," + fHeight + "Z"
						}, duration, function(){
							bottomLeft.open = false;
						});
					}
					break;
				case 4 :
					if ( !leftBottom.open ) {
						leftBottom.animate({
							path : "M0," + fHeight + "L0," + hHeight + " " + randomOffset + "," + fHeight + "Z"
						}, duration, function(){
							leftBottom.open = true;
						});
					} else {
						leftBottom.animate({
							path : "M0," + fHeight + "L0," + hHeight + " 0," + fHeight + "Z"
						}, duration, function(){
							leftBottom.open = false;
						});
					}
					break;
				case 5 :

					if ( !leftTop.open ) {
						leftTop.animate({
							path : "M0,0L0," + hHeight + " " + randomOffset + ",0"
						}, duration, function(){
							leftTop.open = true;
						});
					} else {
						leftTop.animate({
							path : "M0,0L0," + hHeight + " 0,0"
						}, duration, function(){
							leftTop.open = false;
						});
					}
					break;
				}
			},
			hideWhiteStuffs = function(){
				var
					fWidth = $(window).width(),
					fHeight = $(window).height(),
					hWidth = Math.round( $(window).width() / 2),
					hHeight = Math.round( $(window).height() / 2),
					defaultAttr = {
						"stroke" : "#ffffff",
						"stroke-width" : 0,
						"stroke-opacity" : 0,
						"fill" : "#ffffff"
					},
					duration = 100;

				line.attr({ "path" : "M0," + fHeight + "L" + fWidth + ",0" });
				topLeft.animate({path : "M0,0L0,0 " + hWidth + ",0Z"}, duration);
				topRight.animate({path : "M" + hWidth + ",0L" + fWidth + ",0 " + fWidth + ",0Z"}, duration);
				rightTop.animate({path : "M" + fWidth + ",0L" + fWidth + ",0 " + fWidth + "," + hHeight + "Z"}, duration);
				bottomLeft.animate({path : "M0," + fHeight + "L0," + fHeight + " " + hWidth + "," + fHeight + "Z"}, duration);
				leftBottom.animate({path : "M0," + fHeight + "L0," + hHeight + " 0," + fHeight + "Z"}, duration);
				leftTop.animate({path : "M0,0L0," + hHeight + " 0,0"}, duration);
			};

	return {
		initialize: initialize
	};
});
