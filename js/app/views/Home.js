
var 
	object = null,
	R = null,
	isMenu = false,

	square = null,
	blob = null,
	pull = null,
	pullLabel = null,
	pullCircle = null,

	pullHelp = null,
	squareHelp = null,
	circleHelp = null,

	circles = null,
	labels = null,
	areas = null,

	offsetX = -90,
	offsetY = -20,

	winWidth = $(window).width(),
	winHeight = $(window).height(),

	halfWidth = Math.round(winHeight / 2),

	nameX = Math.round(winWidth * .89),
	nameY = Math.round(winHeight * .49),

	initialOffset = 102,
	offsetLeftX = Math.round(winWidth * .15);
	
PF.View.Home = Backbone.View.extend({
	
	container: "main-canvas",
	el: "#page .content",

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
				self._moveMenu();
			} else {
				if (R) R.clear();
				$("#" + self.container).empty();
				self._initRaphael();			
			}
		});
	},
	hide: function( callbackEvent ){
		
		var self = this;
		if ( circles ) {
			$.each(circles, function(i, circle){
				circle.animate({
					"cx" : i * 30 + 15,
					"cy" : halfWidth
				}, i * 100 + 300, function(){
					if ( i == circles.length - 1 ) {
						$(self.el).fadeOut(300, function(){
							isMenu = false;
							R.clear();
							$("#" + self.container).empty();
							if (callbackEvent) PF.EventManager.trigger(callbackEvent);
						});
					}
				});

				if ( areas[i] ) areas[i].remove();
				if ( labels[i] ) labels[i].remove();
				if (i == 0) {
					square.animate({
						"opacity" : 0
					}, 200, function(){
						square.remove();
					});
					blob.animate({
						"cx" : 180,
						"cy" : halfWidth,
						"opacity" : 0,
						"transform" : "s0.2,0.2"
					}, 600, function(){
						blob.remove();
					});
				}
			})
		} else {
			$(self.el).fadeOut(300, function(){
				isMenu = false;
				R.clear();
				$(this).empty();
				if (callbackEvent) PF.EventManager.trigger(callbackEvent);
			});
		}
	},
	render: function(){
		$("body").attr("class", "");
			
		$(this.el).empty();
		this._initRaphael();
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

		squareHelp = R
			.path("M" + top.x + "," + top.y + "L" + left.x + "," + left.y + "L" + bottom.x + "," + bottom.y)
			.attr({
				"stroke" : "#444",
				"stroke-width" : "1",
				"opacity" : 0
			});

		pullHelp = R.text(pullX + 80, pullY, "Pull").attr({
			"font" : "8px Copy0855",
			"fill" : "#ffffff",
			"cursor" : "pointer",
			"opacity" : 0
		});

		pullLabel = R.text(pullX + 50, pullY, "Nicolas Pigelet").attr({
			"font" : "8px Copy0855",
			"fill" : "#ffffff",
			"cursor" : "pointer"
		});

		pullCircle = R.circle(pullX + 102, pullY, 5).attr({
			"fill" : "#ddd",
			"stroke-width" : 0,
			"stroke-opacity" : 0
		});

		circleHelp = R.circle(pullX + 102, pullY, 5).attr({
			"fill" : "#777",
			"stroke-width" : 0,
			"stroke-opacity" : 0,
			"opacity" : 0
		});

		pull = R
			.rect(pullX, pullY - 40, 120, 80)
			.attr({
				"fill" : "#222",
				"opacity" : 0,
				"stroke-width" : 0,
				"stroke-opacity" : 0,
				"cursor": "pointer"
			});
		pull.drag(this._handleMove, this._handleStart, this._handleStop);

		pull
			.mouseover(this._mouseOver)
			.mouseout(this._mouseOut);
	},

	_mouseOver : function(){
		var pullX = nameX + offsetX;

		pullLabel.animate({
			"x" : pullX + 30,
			"opacity" : 0
		}, 100);

		pullHelp.animate({
			"x" : pullX + 50,
			"opacity" : 1
		}, 100);

		squareHelp.animate({
			"opacity": 1,
			"transform" : "t-100,0"
		}, 100);
		circleHelp.animate({
			"opacity": 1,
			"transform" : "t-100,0"
		}, 100);
	},

	_mouseOut : function(){
		var pullX = nameX + offsetX;

		pullLabel.animate({
			"x" : pullX + 50,
			"opacity" : 1
		}, 100);

		pullHelp.animate({
			"x" : pullX + 80,
			"opacity" : 0
		}, 100);

		squareHelp.animate({
			"opacity": 0,
			"transform" : "t0,0"
		}, 100);

		circleHelp.animate({
			"opacity": 0,
			"transform" : "t0,0"
		}, 100);
	},

	_handleMove: function ( dx, dy ){
		if (object) object._move(false, dx, dy);
	},

	_handleStart: function(){
		object._mouseOut();
		pull.unmouseover(object._mouseOver);
		pull.unmouseout(object._mouseOut);
	},

	_handleStop: function( e ){
		if ( e.pageX < Math.round(winWidth * .66) ) {
			isMenu = true;
			pull.undrag();
		} else {
			pull
				.mouseover(object._mouseOver)
				.mouseout(object._mouseOut);
		}
		if (object) object._move(true, 0, 0);
	},

	_move : function(animate, dx, dy){

		var coords = object._getLatestCoords(dx, dy);

		if ( animate ) {

			var
				duration = 300,
				easing = "easeOut";

			pull.animate({
				"x": coords.pullX,
				"y": coords.pullY - 40
			}, duration, easing);

			pullLabel.animate({
				"x": coords.pullX + 50,
				"y": coords.pullY
			}, duration, easing);

			pullCircle.animate({
				"cx": coords.pullX + 102,
				"cy": coords.pullY
			}, duration, easing);

			square.animate({
				"path": coords.path
			}, duration, easing);

			blob.animate({
				"path": coords.blobPath
			}, duration, easing, function(){
				if (isMenu) {
					object._initMenu(coords.left, coords.top, coords.right, coords.bottom, coords.center);
				}
			});

		} else {

			pull.attr({
				"x": coords.pullX,
				"y": coords.pullY - 40
			});

			pullLabel.attr({
				"x": coords.pullX + 50,
				"y": coords.pullY
			});

			pullCircle.attr({
				"cx": coords.pullX + 102,
				"cy": coords.pullY
			});

			square.attr( "path", coords.path );
			blob.attr("path", coords.blobPath);
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

		if ( pull ) {
			pull.remove();
			pull = null;
		}
		if ( pullCircle ) {
			pullCircle.remove();
			pullCircle = null;
		}

		if (pullLabel) {
			pullLabel.animate({
				"opacity" : 0
			}, 300, function(){
				pullLabel.remove();
				pullLabel = null;
			});
		}


		if ( blob && blob.type != "circle" ) {
			blob.remove();
			blob = R.circle(center.x, center.y, 79).attr({
				"scale" :[0.1,0.1],
				"fill" : "#161616",
				"stroke-width" : "0",
				"stroke-opacity" : "0"
			});
		} else {
			blob.attr({
				"cx" : center.x,
				"cy" : center.y
			});
		}


		var 
			circleAttr = {
				"fill" : "#ddd",
				"stroke-width" : 0,
				"stroke-opacity" : 0,
				"opacity" : 0.5
			},
			rectAttr = {
				"fill" : "#333",
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
			aboutArea = R.rect(left.x - 100, left.y - 50, 120, 100).attr(rectAttr).toFront(),
			workArea = R.rect(bottom.x - 50, bottom.y - 20, 100, 120).attr(rectAttr).toFront(),
			stuffsArea = R.rect(right.x - 20, right.y - 50, 120, 100).attr(rectAttr).toFront(),
			linksArea = R.rect(top.x - 50, top.y - 100, 100, 120).attr(rectAttr).toFront();

		circles = [aboutCircle, workCircle, stuffsCircle, linksCircle];
		labels = [aboutLabel, workLabel, stuffsLabel, linksLabel];
		areas = [aboutArea, workArea, stuffsArea, linksArea];

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
			PF.AppRouter.navigate( href[i], true);
		});

	},

	_moveMenu : function(){

		var coords = this._getLatestCoords();

		square.attr({
			"path" : coords.path
		});

		$.each(circles, function(i, circle){
			if (circle) circle.remove();
		});
		$.each(areas, function(i, area){
			if (area) area.remove();
		});
		$.each(labels, function(i, label){
			if (label) label.remove();
		});

		this._initMenu(coords.left, coords.top, coords.right, coords.bottom, coords.center);
	},

	_getLatestCoords : function(dx, dy){

		var 
			coords = {},
			deltaX = dx || 0,
			deltaY = dy || 0;

		coords.pullX = isMenu ? Math.round(winWidth * .33) : nameX + deltaX + offsetX;
		coords.pullY = nameY + deltaY + offsetY;
		coords.halfY = nameY + offsetY;
		coords.middleX = nameX + Math.round(deltaX / 3) + offsetX;

		coords.left = {
			x : (coords.pullX + initialOffset),
			y : coords.pullY
		};
		coords.top = {
			x : isMenu ? coords.left.x + 70 : (coords.middleX + offsetLeftX),
			y : isMenu ? coords.pullY - 140 : -100
		};
		coords.right = {
			x : isMenu ? coords.left.x + 216 : (winWidth + 200),
			y : isMenu ? coords.left.y - 57 : coords.halfY
		};
		coords.bottom = {
			x : isMenu ? coords.left.x + 135 : (coords.middleX + offsetLeftX),
			y : isMenu ? coords.left.y + 85 : (winHeight + 100)
		};
		coords.center = {
			x : Math.round((coords.left.x + coords.right.x) / 2) - 1,
			y : Math.round((coords.top.y + coords.bottom.y) / 2)
		};

		coords.path = "M" + coords.left.x + "," + coords.left.y;
		coords.path += "L" + coords.top.x + "," + coords.top.y;
		coords.path += "L" + coords.right.x + "," + coords.right.y;
		coords.path += "L" + coords.bottom.x + "," + coords.bottom.y + "Z";

		coords.blobPath = object._getBlobPath(coords.right, coords.bottom, coords.left, coords.top, deltaX);

		return coords;
	}
	
});