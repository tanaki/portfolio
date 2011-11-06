// Filename: views/home/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'Raphael',
	'text!templates/home/main.html'
], function($, _, Backbone, mainHomeTemplate){

	var
		object = null,
		R = null,
		square = null,
		pull = null,
		blob = null,
		isMenu = false,

		offsetX = -90,
		offsetY = -20,
		
		winWidth = $(window).width(),
		winHeight = $(window).height(),

		halfHeight = Math.round(winHeight / 2),
		halfWidth = Math.round(winWidth / 2),

		nameX = Math.round(winWidth * .89),
		nameY = Math.round(winHeight * .49),

		initialOffset = 102,
		offsetLeftX = Math.round(winWidth * .15);
		
	var mainHomeView = Backbone.View.extend({
		container: "main-canvas",
		el: $("#page .content"),
		initialize: function(){
			object = this;
		},
		hide: function(app_router){
			this.el.fadeOut(300, function(){
				app_router.trigger("hide");
			});
		},
		render: function(app_router){
			app_router.trigger("hideNav");
			this.el.html(mainHomeTemplate).fadeIn();

			var self = this;
			$(window).ready(self._initRaphael());
		},

		_initRaphael: function() {
			var self = this;

			R = new Raphael(document.getElementById(self.container), 1024, 768);
			$(window).resize( self._resizeRaphael );
			setTimeout(function(){
				self._resizeRaphael();
				self._initGraphics();
			}, 100);
		},

		_resizeRaphael: function() {
			winWidth = $(window).width(),
			winHeight = $(window).height(),
			
			halfHeight = Math.round(winHeight / 2),
			halfWidth = Math.round(winWidth / 2),

			nameX = Math.round(winWidth * .89),
			nameY = Math.round(winHeight * .49),

			offsetLeftX = Math.round(winWidth * .15);
			
			if (R) R.setSize( winWidth, winHeight );
			if (object && R && pull && square) object._move(false, 0, 0);
		},

		_initGraphics: function() {
			var
				pullX = nameX + offsetX,
				pullY = nameY + offsetY;
			
			var
				left = {
					x : (pullX + initialOffset),
					y : pullY
				},
				top = {
					x : (pullX + offsetLeftX),
					y : -100
				},
				right = {
					x : (winWidth + 200),
					y : pullY
				},
				bottom = {
					x : (pullX + offsetLeftX),
					y : (winHeight + 100)
				};

			blob = R.path( this._getBlobPath(right, bottom, left, top, 0) );
			blob.attr({
				"fill" : "#161616",
				"stroke-width" : "0",
				"stroke-opacity" : "0"
			});

			square = R
				.path("M" + left.x + "," + left.y + "L" + top.x + "," + top.y + "L" + right.x + "," + right.y + "L" + bottom.x + "," + bottom.y + "Z")
				.attr({
					"stroke" : "#666",
					"stroke-width" : "1"
				});
				
			pull = R
				.rect(pullX, pullY, 100, 40)
				.attr({
					"fill" : "#fff",
					"stroke-width" : 0,
					"stroke-opacity" : 0,
					"cursor": "pointer"
				});
			pull.drag(this._handleMove, this._handleStart, this._handleStop);
		},

		_handleMove: function ( dx, dy, mouseX, mouseY, e ){
			if (object) object._move(false, dx, dy);
		},
		
		_handleStart: function(){
			console.log("handle start");
		},
		
		_handleStop: function( e ){
			if ( e.pageX < Math.round(winWidth * .66) ) {
				isMenu = true;
				pull.undrag();
			}
			if (object) object._move(true, 0, 0);
			
		},

		_move : function(animate, dx, dy){
			
			var
				pullX = isMenu ? Math.round(winWidth * .33) : nameX + dx + offsetX,
				pullY = nameY + dy + offsetY,
				halfY = nameY + offsetY,
				middleX = nameX + Math.round(dx / 3) + offsetX;

			var
				left = {
					x : (pullX + initialOffset),
					y : pullY
				},
				top = {
					x : isMenu ? left.x + 70 : (middleX + offsetLeftX),
					y : isMenu ? pullY - 140 : -100
				},
				right = {
					x : isMenu ? left.x + 216 : (winWidth + 200),
					y : isMenu ? left.y - 57 : halfY
				},
				bottom = {
					x : isMenu ? left.x + 135 : (middleX + offsetLeftX),
					y : isMenu ? left.y + 85 : (winHeight + 100)
				},
				center = {
					x : Math.round((left.x + right.x) / 2) - 1,
					y : Math.round((top.y + bottom.y) / 2)
				},
				path = "M" + left.x + "," + left.y + "L" + top.x + "," + top.y + "L" + right.x + "," + right.y + "L" + bottom.x + "," + bottom.y + "Z",
				blobPath = object._getBlobPath(right, bottom, left, top, dx);
				
			if ( animate ) {

				var
					duration = 300,
					easing = "easeOut";

				pull.animate({
					"x": pullX,
					"y": pullY
				}, duration, easing);

				square.animate({
					"path": path
				}, duration, easing);

				blob.animate({
					"path": blobPath
				}, duration, easing, function(){
					if (isMenu) {
						blob.remove();
						blob = R
							.circle(center.x, center.y, 79);
						blob.attr({
							"scale" :[0.1,0.1],
							"fill" : "#161616",
							"stroke-width" : "0",
							"stroke-opacity" : "0"
						});
					}
				});

			} else {
				
				pull.attr({
					"x": pullX,
					"y": pullY
				});

				square.attr( "path", path );
				blob.attr("path", blobPath);
			}

		},

		_getBlobPath : function(right, bottom, left, top, dx) {
			var offsetBlob = Math.abs(dx / 10) + 20,
				lefttop = {
					x : Math.round((left.x + top.x) / 2),
					y : Math.round((left.y + top.y) / 2)
				},
				righttop = {
					x : Math.round((right.x + top.x) / 2),
					y : Math.round((right.y + top.y) / 2)
				},
				leftbottom = {
					x : Math.round((left.x + bottom.x) / 2),
					y : Math.round((left.y + bottom.y) / 2)
				},
				rightbottom = {
					x : Math.round((right.x + bottom.x) / 2),
					y : Math.round((right.y + bottom.y) / 2)
				};
			
			var blobPath = "";
			blobPath += "M" + (right.x - offsetBlob) + "," + right.y;
			blobPath += "R" + rightbottom.x + "," + rightbottom.y;
			blobPath += "," + bottom.x + "," + (bottom.y - offsetBlob);
			blobPath += "," + leftbottom.x + "," + leftbottom.y;
			blobPath += "," + (left.x + offsetBlob) + "," + left.y;
			blobPath += "," + lefttop.x + "," + lefttop.y;
			blobPath += "," + top.x + "," + (top.y + offsetBlob);
			blobPath += "," + righttop.x + "," + righttop.y;
			blobPath += "," + (right.x - offsetBlob) + "," + right.y;
			
			return blobPath;
		}
	});
	
	return new mainHomeView;
});
