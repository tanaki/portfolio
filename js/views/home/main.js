// Filename: views/home/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'Raphael',
	'text!templates/home/main.html'
], function($, _, Backbone, Raphael, mainHomeTemplate){
	
	
	var 
		object = null,
		R = null,
		square = null,
		pull = null,
		pullLabel = null,
		pullCircle = null,
		blob = null,
		isMenu = false,
		
		circles = null,
		labels = null,
		areas = null,
		sets = null,

		offsetX = -90,
		offsetY = -20,
		
		winWidth = $(window).width(),
		winHeight = $(window).height(),
		
		halfWidth = Math.round(winHeight / 2),

		nameX = Math.round(winWidth * .89),
		nameY = Math.round(winHeight * .49),

		initialOffset = 102,
		offsetLeftX = Math.round(winWidth * .15);
	
	var mainHomeView = Backbone.View.extend({
		
		container: "main-canvas",
		el: $("#page .content"),
		initialize: function(){
			
			object = this;
			
			var self = this;
			$(window).resize(function(){
				
				winWidth = $(window).width();
				winHeight = $(window).height();

				halfWidth = Math.round(winHeight / 2);

				nameX = Math.round(winWidth * .89);
				nameY = Math.round(winHeight * .49);

				offsetLeftX = Math.round(winWidth * .15);
				
				if (isMenu) {
					console.log("move the menu");
				} else {
					
					if (R) R.clear();
					$("#" + self.container).empty();
					self._initRaphael();
					
				}
			});
		},
		hide: function(target){
			
			var self = this;
			if ( circles ) {
				$.each(circles, function(i, el){
					el.animate({
						"cx" : i * 30 + 15,
						"cy" : halfWidth
					}, i * 100 + 300, function(){
						if ( i == circles.length - 1) {
							self.el.fadeOut(300, function(){
								EH.trigger("hidden", target);
								R.clear();
								$("#" + self.container).empty();
							});
						}
					});
					
					areas[i].remove();
					labels[i].remove();
					if (i == 0) {
						square.animate({
							"opacity" : 0
						}, 200);
						blob.animate({
							"cx" : 180,
							"cy" : halfWidth,
							"opacity" : 0
						}, 800);
					}
				})
			} else {
				this.el.fadeOut(300, function(){
					EH.trigger("hidden", target);
					R.clear();
					this.el.empty();
				});
			}
		},
		render: function(){
			EH.trigger("hideNav");
			
			var self = this;
			this.el.html(mainHomeTemplate).fadeIn(300, function(){
				self._initRaphael();
			});
		},
		
		_initRaphael : function(){
			R = Raphael(document.getElementById(this.container), "100%", "100%");
			this._initGraphics();
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
				.rect(pullX, pullY - 20, 100, 40)
				.attr({
					"fill" : "#222",
					"opacity" : 0,
					"stroke-width" : 0,
					"stroke-opacity" : 0,
					"cursor": "pointer"
				});
			pull.drag(this._handleMove, this._handleStart, this._handleStop);
			
			pullLabel = R.text(pullX + 50, pullY, "Nicolas Pigelet").attr({
				"font" : "8px Copy0855",
				"fill" : "#ffffff",
				"cursor" : "pointer"
			});
			pullLabel.drag(this._handleMove, this._handleStart, this._handleStop);
			
			pullCircle = R.circle(pullX + 102, pullY, 5).attr({
				"fill" : "#ddd",
				"stroke-width" : 0,
				"stroke-opacity" : 0,
			});
		},

		_handleMove: function ( dx, dy, mouseX, mouseY, e ){
			if (object) object._move(false, dx, dy);
		},
		
		_handleStart: function(){
			// TODO something... ?
		},
		
		_handleStop: function( e ){
			if ( e.pageX < Math.round(winWidth * .66) ) {
				isMenu = true;
				pull.undrag();
				pullLabel.undrag();
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
					"y": pullY - 20
				}, duration, easing);
				
				pullLabel.animate({
					"x": pullX + 50,
					"y": pullY
				}, duration, easing);
				
				pullCircle.animate({
					"cx": pullX + 102,
					"cy": pullY
				}, duration, easing);

				square.animate({
					"path": path
				}, duration, easing);

				blob.animate({
					"path": blobPath
				}, duration, easing, function(){
					if (isMenu) {
						object._initMenu(left, top, right, bottom, center);
					}
				});

			} else {
				
				pull.attr({
					"x": pullX,
					"y": pullY - 20
				});
				
				pullLabel.attr({
					"x": pullX + 50,
					"y": pullY
				});
				
				pullCircle.attr({
					"cx": pullX + 102,
					"cy": pullY
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
		},
		
		
		/* FUNCTIONNAL MENU */
		_initMenu : function(left, top, right, bottom, center){
			
			pull.remove();
			pullCircle.remove();
			pullLabel.animate({
				"opacity" : 0
			}, 300, function(){
				pullLabel.remove();
			});
			
			blob.remove();
			blob = R.circle(center.x, center.y, 79).attr({
				"scale" :[0.1,0.1],
				"fill" : "#161616",
				"stroke-width" : "0",
				"stroke-opacity" : "0"
			});
			
			var 
				circleAttr = {
					"fill" : "#ddd",
					"stroke-width" : 0,
					"stroke-opacity" : 0,
					"opacity" : 0.5
				},
				rectAttr = {
					"fill" : "#222",
					"opacity" : 0,
					"stroke-width" : 0,
					"stroke-opacity" : 0,
					"cursor" : "pointer"
				},
				textAttr = {
					"font" : "8px Copy0855",
					"fill" : "#ffffff",
					"cursor" : "pointer",
					"opacity" : 0
				},
				positions = [left, bottom, right, top],
				href = ["about", "work", "stuffs", "links"];
			
			var 
				aboutCircle = R.circle(left.x, left.y, 3).attr(circleAttr),
				workCircle = R.circle(bottom.x, bottom.y, 3).attr(circleAttr),
				stuffsCircle = R.circle(right.x, right.y, 3).attr(circleAttr),
				linksCircle = R.circle(top.x, top.y, 3).attr(circleAttr);
				
			var 
				aboutLabel = R.text(left.x - 30, left.y, "About").attr(textAttr),
				workLabel = R.text(bottom.x, bottom.y + 20, "Work").attr(textAttr),
				stuffsLabel = R.text(right.x + 30, right.y, "Stuffs").attr(textAttr),
				linksLabel = R.text(top.x, top.y - 20, "Links").attr(textAttr);
				
			var 
				aboutArea = R.rect(left.x - 100, left.y - 50, 100, 100).attr(rectAttr).toFront(),
				workArea = R.rect(bottom.x - 50, bottom.y, 100, 100).attr(rectAttr).toFront(),
				stuffsArea = R.rect(right.x, right.y - 50, 100, 100).attr(rectAttr).toFront(),
				linksArea = R.rect(top.x - 50, top.y - 100, 100, 100).attr(rectAttr).toFront();
				
			var 
				aboutSet = R.set(),
				workSet = R.set(),
				stuffsSet = R.set(),
				linksSet = R.set();
			
			circles = [aboutCircle, workCircle, stuffsCircle, linksCircle];
			labels = [aboutLabel, workLabel, stuffsLabel, linksLabel];
			areas = [aboutArea, workArea, stuffsArea, linksArea];
			sets = [aboutSet, workSet, stuffsSet, linksSet];
				
			aboutSet.push(aboutArea, aboutCircle, aboutLabel);
			workSet.push(workArea, workCircle, workLabel);
			stuffsSet.push(stuffsArea, stuffsCircle, stuffsLabel);
			linksSet.push(linksArea, linksCircle, linksLabel);
			
			var self = this;
			$.each(areas, function(i, area){
				self._addEvents(i, area, circles, labels, positions, href, left, top, right, bottom);
			});
				
		},
		
		_addEvents : function(i, target, circles, labels, positions, href, left, top, right, bottom ) {
			
			target.mousemove(function(e, mouseX, mouseY){
					
					var 
						circleX = mouseX + 30,
						circleY = mouseY,
						labelX = mouseX,
						labelY = mouseY,
						path = "M" + circleX + "," + circleY + "L" + top.x + "," + top.y + "L" + right.x + "," + right.y + "L" + bottom.x + "," + bottom.y + "Z";
						
					if ( i == 1 ) {
						circleX = mouseX;
						circleY = mouseY - 20;
						
						path = "M" + left.x + "," + left.y + "L" + top.x + "," + top.y + "L" + right.x + "," + right.y + "L" + circleX + "," + circleY + "Z";
					} else if ( i == 2 ) {
						circleX = mouseX - 30;
						
						path = "M" + left.x + "," + left.y + "L" + top.x + "," + top.y + "L" + circleX + "," + circleY + "L" + bottom.x + "," + bottom.y + "Z";
					} else if ( i == 3 ) {
						circleX = mouseX;
						circleY = mouseY + 20;
						
						path = "M" + left.x + "," + left.y + "L" + circleX + "," + circleY + "L" + right.x + "," + right.y + "L" + bottom.x + "," + bottom.y + "Z";
					}
					
					circles[i].attr({
						"cx" : circleX,
						"cy" : circleY,
						"opacity" : 1
					});
					
					labels[i].attr({
						"x" : labelX,
						"y" : labelY,
						"opacity" : 1
					});
					
					square.attr({
						"path": path
					});
					
				}).mouseout(function(){
					
					var duration = 200;
					circles[i].animate({
						"cx" : positions[i].x,
						"cy" : positions[i].y,
						"opacity" : 0.5
					}, duration);
					
					var 
						labelX = left.x - 30,
						labelY = left.y;
						
					if ( i == 1 ) {
						labelX = bottom.x;
						labelY = bottom.y + 20;
					} else if ( i == 2 ) {
						labelX = right.x + 30;
						labelY = right.y;
					} else if ( i == 3 ) {
						labelX = top.x;
						labelY = top.y - 20;
					}
					
					labels[i].animate({
						"x" : labelX,
						"y" : labelY,
						"opacity" : 0
					}, duration);
					
					var path = "M" + left.x + "," + left.y + "L" + top.x + "," + top.y + "L" + right.x + "," + right.y + "L" + bottom.x + "," + bottom.y + "Z";
					square.animate({
						"path": path
					}, duration);
					
				}).click(function(){
					window.location.hash = "/" + href[i];
				});
			
		}
	});
	
	return new mainHomeView;
});
