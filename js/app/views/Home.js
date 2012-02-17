	
PF.View.Home = Backbone.View.extend({
	
	container: "home",
	el: "#page .content",
	
	$container : null,
	$el : null,
	
	R : null,
	isMenu : false,
	isDragging : false,
	
	line : null,
	square : null,
	blob : null,
	pull : null,
	pullLabel : null,
	pullCircle : null,
	
	pullHelp : null,
	squareHelp : null,
	circleHelp : null,
	
	circles : null,
	labels : null,
	areas : null,
	images : null,
	
	winWidth : 0,
	winHeight : 0,
	
	offsetX : -90,
	offsetY : -20,
	
	nameX : 0,
	nameY : 0,
	
	halfWidth : 0,

	initialOffset : 102,
	offsetLeftX : 0,
	
	$window : null,
	$body : null,

	initialize: function(){
		
		var self = this;
		
		self.$window = $(window);
		self.$body = $("body");
		
		self.winWidth = self.$window.width();
		self.winHeight = self.$window.height();
		
		self.nameX = Math.round(self.winWidth * .89);
		self.nameY = Math.round(self.winHeight * .49);
		
		self.halfWidth = Math.round(self.winHeight / 2);
		self.offsetLeftX = Math.round(self.winWidth * .15);
			
		self.$window.resize(function(){
			
			if ( 
				!self.$body.hasClass("page-about") 
				&& !self.$body.hasClass("page-links")
				&& !self.$body.hasClass("page-stuffs")
				&& !self.$body.hasClass("page-work")
			) {
			
				self.winWidth = self.$window.width();
				self.winHeight = self.$window.height();

				self.halfWidth = Math.round(self.winHeight / 2);

				self.nameX = Math.round(self.winWidth * .89);
				self.nameY = Math.round(self.winHeight * .49);

				self.offsetLeftX = Math.round(self.winWidth * .15);

				if (self.isMenu) {
					self._moveMenu();
				} else {
					if (self.R) self.R.clear();
					self.$container.empty();
					self._initRaphael(false);			
				}
			}
		});
	},
	hide: function( callbackEvent ){
		
		var self = this;
		
		if ( self.circles ) {
			$.each(self.circles, function(i, circle){
				circle.animate({
					"cx" : i * 30 + 15,
					"cy" : self.halfWidth
				}, i * 100 + 300, function(){
					if ( i == self.circles.length - 1 ) {
						self.$el.fadeOut(300, function(){
							self.isMenu = false;
							self.R.clear();
							self.$container.empty();
							if (callbackEvent) PF.EventManager.trigger(callbackEvent);
						});
					}
				});

				if ( self.areas[i] ) self.areas[i].remove();
				if ( self.labels[i] ) self.labels[i].remove();
				if (i == 0) {
					self.square.animate({
						"opacity" : 0
					}, 200, function(){
						self.square.remove();
					});
					self.blob.animate({
						"cx" : 180,
						"cy" : self.halfWidth,
						"opacity" : 0,
						"transform" : "s0.2,0.2"
					}, 600, function(){
						self.blob.remove();
					});
				}
			})
		} else {
			self.$el.fadeOut(300, function(){
				self.isMenu = false;
				self.R.clear();
				self.$el.empty();
				if (callbackEvent) PF.EventManager.trigger(callbackEvent);
			});
		}
	},
	render: function(){
		this.$body.attr("class", "");
		
		this.$container = $("#" + this.container);
		this.$el = $(this.el);
		
		this.$el.empty();
		this._initRaphael(true);
	},

	_initRaphael : function( firstInit ){
		this.R = Raphael(document.getElementById(this.container), "100%", "100%");
		this._initGraphics( firstInit );
	},

	_initGraphics: function( firstInit ) {

		var
			self = this,
			
			pullX = self.nameX + self.offsetX,
			pullY = self.nameY + self.offsetY,
			
			left = {
				x : (pullX + self.initialOffset),
				y : pullY
			},
			top = {
				x : (pullX + self.offsetLeftX),
				y : -100
			},
			right = {
				x : (self.winWidth + 200),
				y : pullY
			},
			bottom = {
				x : (pullX + self.offsetLeftX),
				y : (self.winHeight + 100)
			},
			leftInit = {
				x : left.x + 150,
				y : left.y
			},
			topInit = {
				x : top.x + 50,
				y : top.y
			},
			bottomInit = {
				x : bottom.x + 50,
				y : bottom.y
			};
		
		self.line = self.R
			.path("M66," + self.winHeight + "L0,0")
			.attr({
				"stroke" : "#444",
				"stroke-width" : "1"
			});
		
		self.blob = self.R.path( self._getBlobPath(right, (firstInit ? bottomInit : bottom), (firstInit ? leftInit : left), (firstInit ? topInit : top), 0) );
		self.blob.attr({
			"fill" : "#161616",
			"stroke-width" : "0",
			"stroke-opacity" : "0"
		});

		self.square = self.R
			.path("M" + (firstInit ? leftInit.x : left.x) + "," + left.y + "L" + (firstInit ? topInit.x : top.x) + "," + top.y + "L" + right.x + "," + right.y + "L" + (firstInit ? bottomInit.x : bottom.x) + "," + bottom.y + "Z")
			.attr({
				"stroke" : "#666",
				"stroke-width" : "1"
			});

		self.squareHelp = self.R
			.path("M" + top.x + "," + top.y + "L" + left.x + "," + left.y + "L" + bottom.x + "," + bottom.y)
			.attr({
				"stroke" : "#444",
				"stroke-width" : "1",
				"opacity" : 0
			});

		self.pullHelp = self.R.text(pullX + 80, pullY, "Pull").attr({
			"font" : "8px Copy0855",
			"fill" : "#ffffff",
			"cursor" : "pointer",
			"opacity" : 0
		});

		self.pullLabel = self.R.text( firstInit ? (pullX + 100 ) : (pullX + 50), pullY, "Nicolas Pigelet").attr({
			"font" : "8px Copy0855",
			"fill" : "#ffffff",
			"cursor" : "pointer"
		});

		self.pullCircle = self.R.circle( firstInit ? (pullX + 252) : (pullX + 102), pullY, 5).attr({
			"fill" : "#ddd",
			"stroke-width" : 0,
			"stroke-opacity" : 0
		});

		self.circleHelp = self.R.circle(pullX + 102, pullY, 5).attr({
			"fill" : "#777",
			"stroke-width" : 0,
			"stroke-opacity" : 0,
			"opacity" : 0
		});
	
		self.pull = self.R
			.rect( pullX, pullY - 40, 120, 80)
			.attr({
				"fill" : "#222",
				"opacity" : 0,
				"stroke-width" : 0,
				"stroke-opacity" : 0,
				"cursor": "pointer"
			});
		
		self.pull.drag( self._handleMove, self._handleStart, self._handleStop, self);
//		self.pull.touchstart( self._handleStart );
//		self.pull.touchmove( self._handleMove );
//		self.pull.touchend( self._handleStop );

		self.pull
			.mouseover(function(){
				self._mouseOver(self);
			})
			.mouseout(function(){
				self._mouseOut(self);
			});
		
		if ( firstInit ) {
			
			var duration = 300;
			self.line
				.animate({
					"path" : "M66," + self.winHeight + "L200,0"
				}, duration);
			
			self.pullCircle
				.attr("opacity", 0)
				.animate({
					"cx" : pullX + 102,
					"opacity" : 1
				}, duration);
			
			self.pullLabel
				.attr("opacity", 0)
				.animate({
					"x" : pullX + 50,
					"opacity" : 1
				}, duration);
				
			self.square
				.animate({
					"path": "M" + left.x + "," + left.y + "L" + top.x + "," + top.y + "L" + right.x + "," + right.y + "L" + bottom.x + "," + bottom.y + "Z"
				}, duration);
			
			self.blob
				.animate({
					"path" : self._getBlobPath(right, bottom, left, top, 0)
				}, duration);
		}
	},

	_mouseOver : function(self){
		
		if ( self.isDragging ) return;
		
		var pullX = self.nameX + self.offsetX;

		self.pullLabel.animate({
			"x" : pullX + 30,
			"opacity" : 0
		}, 100);

		self.pullHelp.animate({
			"x" : pullX + 50,
			"opacity" : 1
		}, 100);

		self.squareHelp.animate({
			"opacity": 1,
			"transform" : "t-100,0"
		}, 100);
		
		self.circleHelp.animate({
			"opacity": 1,
			"transform" : "t-100,0"
		}, 100);
	},

	_mouseOut : function(self){
		
		if ( self.isDragging ) return;
		
		var pullX = self.nameX + self.offsetX;

		self.pullLabel.animate({
			"x" : pullX + 50,
			"opacity" : 1
		}, 100);

		self.pullHelp.animate({
			"x" : pullX + 80,
			"opacity" : 0
		}, 100);

		self.squareHelp.animate({
			"opacity": 0,
			"transform" : "t0,0"
		}, 100);

		self.circleHelp.animate({
			"opacity": 0,
			"transform" : "t0,0"
		}, 100);
	},

	_handleMove: function ( dx, dy, c, d, a, b ){
		this._move(false, dx, dy);
	},

	_handleStart: function(){
		this._mouseOut(this);
		this.isDragging = true;
	},

	_handleStop: function( e ){
		var self = this;
		
		if ( e.pageX < Math.round(self.winWidth * .66) ) {
			
			self.isMenu = true;
			self.pull.undrag();
			
		} else {
			self.pull
				.mouseover(function(){
					self._mouseOver(self);
				})
				.mouseout(function(){
					self._mouseOut(self);
				});
		}
		this._move(true, 0, 0);
	},

	_move : function(animate, dx, dy){

		var 
			self = this,
			coords = self._getLatestCoords(dx, dy),
			pathLine = "M" + (66 + Math.round(Math.abs(dx) / 3)) + "," + self.winHeight + "L" + (200 + Math.abs(dx)) + ",0";

		if ( animate ) {

			var
				duration = 300,
				easing = "easeOut";

			self.pull.animate({
				"x": coords.pullX,
				"y": coords.pullY - 40
			}, duration, easing);

			self.pullLabel.animate({
				"x": coords.pullX + 50,
				"y": coords.pullY
			}, duration, easing);

			self.pullCircle.animate({
				"cx": coords.pullX + 102,
				"cy": coords.pullY
			}, duration, easing);

			self.square.animate({
				"path": coords.path
			}, duration, easing);

			self.blob.animate({
				"path": coords.blobPath
			}, duration, easing, function(){
				if (self.isMenu) {
					self._initMenu(coords.left, coords.top, coords.right, coords.bottom, coords.center);
				}
				self.isDragging = false;
			});
			
			self.line.animate({
				"path": pathLine
			}, duration);

		} else {

			self.pull.attr({
				"x": coords.pullX,
				"y": coords.pullY - 40
			});

			self.pullLabel.attr({
				"x": coords.pullX + 50,
				"y": coords.pullY
			});

			self.pullCircle.attr({
				"cx": coords.pullX + 102,
				"cy": coords.pullY
			});

			self.square.attr( "path", coords.path );
			self.blob.attr("path", coords.blobPath);
			
			self.line.attr("path", pathLine);
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
		
		var self = this;
		
		if ( self.line ) {
			self.line.remove();
			self.line = null;
		}
		if ( self.pull ) {
			self.pull.remove();
			self.pull = null;
		}
		if ( self.pullCircle ) {
			self.pullCircle.remove();
			self.pullCircle = null;
		}

		if ( self.pullLabel ) {
			self.pullLabel.animate({
				"opacity" : 0
			}, 300, function(){
				self.pullLabel.remove();
				self.pullLabel = null;
			});
		}


		if ( self.blob && self.blob.type != "circle" ) {
			self.blob.remove();
			self.blob = self.R.circle(center.x, center.y, 79).attr({
				"scale" :[0.1,0.1],
				"fill" : "#161616",
				"stroke-width" : "0",
				"stroke-opacity" : "0"
			});
		} else {
			self.blob.attr({
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
			aboutCircle = self.R.circle(left.x, left.y, 3).attr(circleAttr),
			workCircle = self.R.circle(bottom.x, bottom.y, 3).attr(circleAttr),
			stuffsCircle = self.R.circle(right.x, right.y, 3).attr(circleAttr),
			linksCircle = self.R.circle(top.x, top.y, 3).attr(circleAttr);

		var 
			aboutLabel = self.R.text(left.x - 30, left.y, "About").attr(textAttr),
			workLabel = self.R.text(bottom.x, bottom.y + 20, "Work").attr(textAttr),
			stuffsLabel = self.R.text(right.x + 30, right.y, "Stuffs").attr(textAttr),
			linksLabel = self.R.text(top.x, top.y - 20, "Links").attr(textAttr);

		var 
			aboutArea = self.R.rect(left.x - 100, left.y - 50, 120, 100).attr(rectAttr).toFront(),
			workArea = self.R.rect(bottom.x - 50, bottom.y - 20, 100, 120).attr(rectAttr).toFront(),
			stuffsArea = self.R.rect(right.x - 20, right.y - 50, 120, 100).attr(rectAttr).toFront(),
			linksArea = self.R.rect(top.x - 50, top.y - 100, 100, 120).attr(rectAttr).toFront();

		var 
			imgSrc = "/img/site/",
			imgWidth = 182,
			imgHeight = 182,
			imgX = center.x - Math.round(imgWidth / 2),
			imgY = center.y - Math.round(imgHeight / 2),
			
			aboutImage = self._createImage(imgSrc + "menu-about.png", imgX, imgY, imgWidth, imgHeight),
			workImage = self._createImage(imgSrc + "menu-work.png", imgX, imgY, imgWidth, imgHeight),
			stuffsImage = self._createImage(imgSrc + "menu-stuffs.png", imgX, imgY, imgWidth, imgHeight), 
			linksImage = self._createImage(imgSrc + "menu-links.png", imgX, imgY, imgWidth, imgHeight);

		self.circles = [aboutCircle, workCircle, stuffsCircle, linksCircle];
		self.labels = [aboutLabel, workLabel, stuffsLabel, linksLabel];
		self.areas = [aboutArea, workArea, stuffsArea, linksArea];
		self.images = [aboutImage, workImage, stuffsImage, linksImage];

		$.each(self.areas, function(i, area){
			self._addEvents(i, area, self.circles, self.labels, self.images, positions, href, left, top, right, bottom);
		});

	},
	
	_createImage : function( src, x, y, width, height ){
		if (this.R) {
			var image = this.R.image(src, x, y, width, height);
			
			image.animate({
				"opacity" : 0,
				"transform" : "s0.6,0.6"
			}, 5);
				
			return image;
		}
	},

	_addEvents : function(i, target, circles, labels, images, positions, href, left, top, right, bottom ) {
		
		var self = this;
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
			
			images[i].animate({
				"opacity" : 1,
				"transform" : "s1,1"
			}, 100);

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

			self.square.attr({
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
			self.square.animate({
				"path": path
			}, duration);
			
			images[i].animate({
				"opacity" : 0,
				"transform" : "s0.6,0.6"
			}, 100);

		}).click(function(){
			PF.AppRouter.navigate( href[i], true);
		});

	},

	_moveMenu : function(){

		var coords = this._getLatestCoords();

		this.square.attr({
			"path" : coords.path
		});

		$.each(this.circles, function(i, circle){
			if (circle) circle.remove();
		});
		$.each(this.areas, function(i, area){
			if (area) area.remove();
		});
		$.each(this.labels, function(i, label){
			if (label) label.remove();
		});

		this._initMenu(coords.left, coords.top, coords.right, coords.bottom, coords.center);
	},

	_getLatestCoords : function(dx, dy){

		var 
			coords = {},
			deltaX = dx || 0,
			deltaY = dy || 0;

		coords.pullX = this.isMenu ? Math.round(this.winWidth * .33) : this.nameX + deltaX + this.offsetX;
		coords.pullY = this.nameY + deltaY + this.offsetY;
		coords.halfY = this.nameY + this.offsetY;
		coords.middleX = this.nameX + Math.round(deltaX / 3) + this.offsetX;

		coords.left = {
			x : (coords.pullX + this.initialOffset),
			y : coords.pullY
		};
		coords.top = {
			x : this.isMenu ? coords.left.x + 70 : (coords.middleX + this.offsetLeftX),
			y : this.isMenu ? coords.pullY - 140 : -100
		};
		coords.right = {
			x : this.isMenu ? coords.left.x + 216 : (this.winWidth + 200),
			y : this.isMenu ? coords.left.y - 57 : coords.halfY
		};
		coords.bottom = {
			x : this.isMenu ? coords.left.x + 135 : (coords.middleX + this.offsetLeftX),
			y : this.isMenu ? coords.left.y + 85 : (this.winHeight + 100)
		};
		coords.center = {
			x : Math.round((coords.left.x + coords.right.x) / 2) - 1,
			y : Math.round((coords.top.y + coords.bottom.y) / 2)
		};

		coords.path = "M" + coords.left.x + "," + coords.left.y;
		coords.path += "L" + coords.top.x + "," + coords.top.y;
		coords.path += "L" + coords.right.x + "," + coords.right.y;
		coords.path += "L" + coords.bottom.x + "," + coords.bottom.y + "Z";

		coords.blobPath = this._getBlobPath(coords.right, coords.bottom, coords.left, coords.top, deltaX);

		return coords;
	}
	
});