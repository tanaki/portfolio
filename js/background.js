// Filename: background.js
define([
	'jQuery',
	'Raphael'
], function($, Raphael){

	var 
		R = null,
		line = null,
		angle = 0,
		rectangle = null,
		elements = [],
		paused = false,
		timeoutResize = null;

	var 
		frameNum = 0,
		initialize = function(){

			R = Raphael(document.getElementById("background"), "100%", "100%");
			
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
				rectAttr = {
					"stroke" : "#222222",
					"stroke-width" : 0,
					"stroke-opacity" : 0,
					"fill" : "#222222"
				};
			/*
			line = R
				.path("M0," + fHeight + "L" + fWidth + ",0")
				.attr({
					"fill" : "#333333",
					"stroke" : "#333333",
					"stroke-width" : 1
				});
			*/
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

			requestAnimFrame( run );
			displayWhiteStuffs();
			
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
			/*
			if ( frameNum % 400 == 0 ) {
				displayWhiteStuffs();
			}
			*/
			if ( frameNum % 600 == 0 ) {
				rotateLine();
			}
			frameNum++;
			if (!paused) requestAnimFrame( run );
		},
		rotateLine = function() {
			/*
			angle = -1 * (angle + randomBetween(-2, 2) );
			line.animate({
				"transform" : "r" + angle + " 0 " + $(window).height()
			}, 250);
			*/
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

			// line.attr({ "path" : "M0," + fHeight + "L" + fWidth + ",0" });
			rectangle.attr("path", "M0,0L" + fWidth + ",0 " + fWidth + "," + fHeight + " 0," + fHeight + "Z");
		};

	return {
		initialize: initialize
	};
});
