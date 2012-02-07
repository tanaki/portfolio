
PF.View.Work = Backbone.View.extend({
	
	el : "#page .content",
	$el : null,
	tpl_work : null,
	collection : null,
	currentSlug : null,
	
	lines : null,
	ordered : null,
	percent : null,
	connection : null,
	
	offsetX : 0,
	offsetY : 0,
	
	$window : null,
	$body : null,
	
	width : 0,
	height : 0,
	
	initialize : function(){
		
		var self = this;
		
		self.$window = $(window);
		self.$body = $("body");
		
		self.$el = $(self.el);
		
		self.$window.resize(function(){
			if ( self.$body.hasClass("page-work") ) {
				var target = $("#works-lines").position();
				if ( target ) {
					self.offsetX = target.left;
					self.offsetY = target.top;
				}

				self._drawLinks(true);
			}
		});
	},
		
	hide : function (callbackEvent) {
		this.$el.hide();
		if (callbackEvent) PF.EventManager.trigger( callbackEvent );
	},
	
	render : function ( slug ) {
		this.currentSlug = slug;
		this._loadTemplate();
	},
	
	_loadTemplate : function() {
		
		var self = this;
		
		if ( self.tpl_work ) {
			self._loadData();
		} else {
			$.loadTemplate({
				"template" : "template_work",
				"file" : "/templates/work.html",
				"callback" : function(data){
					self.tpl_work = data;
					self._loadData();
				},
				"noStorage" : true // util for debug
			});
		}
	},
	
	_loadData : function() {
		
		var self = this;
		
		if ( this.collection ) {
			self._display();
		} else {
			
			self.collection = new PF.Collection.WorksCollection();
			$.ajax({

				dataType : 'json',
				url: "/data/works.json",

				success : function(response){
					
					var 
						total = response.projects.length - 1,
						indexLoaded = 0,
						contentLoading = $(".content-loading");
						
					contentLoading.show();
					$.each(response.projects, function(i, el){
						
						self.collection.add(new PF.Model.Work({
							index: el.index,
							color: el.color,
							name: el.slug,
							slug: el.slug,
							title: el.title,
							featured: el.featured,
							context: el.context,
							link: el.link,
							linkText: el.linkText,
							white: el.white,
							videoType: el.videoType,
							videoId: el.videoId,
							text: el.text,
							tags: el.tags,
							slides: el.slides
						}));
						
						var thumb = new Image();
							
						thumb.onload = function(){
							contentLoading.text("Loading... " + Math.round(indexLoaded * 100 / total) + "%" ) ;
							if ( indexLoaded == total ) self._display();
							indexLoaded++;
						}
						thumb.src = "/img/work/projects/" + el.slug + ".jpg";
					});
				}
			});
		}
	},
	
	_display : function() {
		
		var 
			self = this,
			params = {
				projects : this.collection.models
			},
			tpl = _.template(this.tpl_work);
		
		$(".content-loading").hide();
		this.$el.html( tpl(params) ).fadeIn(300, function(){
			
			var target = $("#works-lines").position();
			self.offsetX = target.left;
			self.offsetY = target.top;
			
			self._drawLinks();
			self._cleanup();
			if (self.currentSlug) {
				PF.AppRouter.navigate( "/work/" + self.currentSlug, true );
				self.currentSlug = null;
			}
		});
	},
	
	_drawLinks : function( redraw ){
		
		if ( this.lines ) this.lines.clear();
		this.lines = Raphael( document.getElementById("works-lines"), "100%", "100%" );
		
		var 
			self = this,
			path = "";
		
		this.width = Math.round(this.$window.width() / 2),
		this.height = Math.round(this.$window.height() / 2);
		
		this.connection = this.lines.path(path).attr({
			"stroke" : "#333"
		});
		
		if ( redraw ) {
			
			$.each(this.percent, function(i, coord){
				
				var 
					x = Math.round(coord[0] * self.width / 100) + 25,
					y = Math.round(coord[1] * self.height / 100) + 25;
					
				if ( i == 0) path = "M" + x + "," + y;
				else if ( i == 1 ) path += "L" + x + "," + y;
				else path += " " + x + "," + y;

				self.connection.attr("path", path);
				self._drawLink(self.collection.models[i], i, false);
			});
			
		} else {
		
			this.ordered = [],
			this.percent = [];
			var 
				aLeft = [20, 30, 40, 50, 60, 70, 80, 85, 90],
				aTop = [10, 20, 30, 40, 50, 60, 70, 80, 85];

			aLeft = $.shuffle(aLeft);
			aTop = $.shuffle(aTop);

			$.each(this.collection.models, function(i, link){

				var 
					x = Math.round(aLeft[i] * self.width / 100) + 25,
					y = Math.round(aTop[i] * self.height / 100) + 25;

				self.ordered.push([x, y]);
				self.percent.push([aLeft[i], aTop[i]]);
				link.set("position", [aLeft[i], aTop[i]]);

				setTimeout(function(){

					if ( i == 0) path = "M" + x + "," + y;
					else if ( i == 1 ) path += "L" + x + "," + y;
					else path += " " + x + "," + y;

					self.connection.animate({
						"path" : path
					}, 150);

					setTimeout(function(){
						self._drawLink(link, i, true);
					}, 200);

				}, i * 200);

			});
		}
	},
	
	_drawLink : function(link, index, animate){
		
		var 
			self = this,
			attrCircle = {
				"stroke" : "#666",
				"stroke-opacity" : 0,
				"stroke-width" : 0,
				"opacity" : 0.3,
				"fill" : "#666"
			},
			attrLineCircle = {
				"opacity" : 0.3,
				"stroke" : "#444",
				"stroke-width" : 1
			},
			attrAreaCircle = {
				"stroke" : "#666",
				"stroke-opacity" : 0,
				"stroke-width" : 0,
				"fill" : "#666",
				"opacity" : 0,
				"cursor" : "pointer"
			},
			radius = link.attributes.featured ? 5 : 3,
			radiusPlus = link.attributes.featured ? 8 : 5,
			
			x = Math.round(self.percent[index][0] * self.width / 100) + 25,
			y = Math.round(self.percent[index][1] * self.height / 100) + 25,
			
			circle = this.lines.circle(x, y, radius).attr(attrCircle),
			lineCircle = this.lines.circle(x, y, radius + radiusPlus).attr(attrLineCircle),
			areaCircle = this.lines.circle(x, y, radius + radiusPlus * 4).attr(attrAreaCircle),
			defaultPath = "",
			
			breadcrumb = $(".breadcrumb");
			
		$.each(self.percent, function(i, coords){
			defaultPath += (( i == 0 ) ? "M" : "L") + (Math.round(coords[0] * self.width / 100) + 25) + "," + (Math.round(coords[1] * self.height / 100) + 25);
		});
		
		if ( animate ) {
			circle.scale(0,0).animate({
				"transform" : "s1,1"
			}, 500, "easeout");

			lineCircle.scale(0,0).animate({
				"transform" : "s1,1"
			}, 500);
		}
		
		$(areaCircle).data("link", link.attributes);
		
		areaCircle
			.mouseover(function(){
				circle.attr("opacity", 1);
				lineCircle.attr("opacity", 1);
				
				// TODO add updateBreadcrumb + image
				breadcrumb.find(".current:first")
					.removeClass("current")
					.addClass("link")

				setTimeout(function(){
					breadcrumb.find(".link:last").css("font-family", "Copy0855");
				}, 180);

				$("<span> / </span>")
					.appendTo( breadcrumb.find(".link:last") );
				
				var data = $(this).data("link");
				$('<li class="current">' + (data.title).substring(0, 2) + '</li>')
					.appendTo( breadcrumb )
					.show();

				data.title.shuffle( breadcrumb.find(".current:last") );
				
				var url = "/img/work/projects/"+ data.slug +".jpg";
				$("nav .selected span").css({
					"background-image" : "url(" + url + ")",
					"background-position" : "50% -5px"
				});
			})
			.mouseout(function(){
				
				circle.animate({
					"cx" : x,
					"cy" : y,
					"opacity": .3
				}, 200);
				
				lineCircle.animate({
					"cx" : x,
					"cy" : y,
					"opacity": .3
				}, 200);
				
				self.connection.animate({
					"path" : defaultPath
				}, 200);
				
				breadcrumb.find(".link:last")
					.removeClass("link")
					.addClass("current")
					.css("font-family", "");

				breadcrumb.find(".current:first span").remove();
				breadcrumb.find(".current:last").remove();

				$("nav .selected span").css({
					"background-position" : "50% 100px"
				});
			})
			.mousemove(function(e, mouseX, mouseY){
				var 
					newX = mouseX - self.offsetX,
					newY = mouseY - self.offsetY + ($.browser.webkit ? 20 : 200);
				
				circle.attr({
					"cx" : newX,
					"cy" : newY
				});
				
				lineCircle.attr({
					"cx" : newX,
					"cy" : newY
				});
				
				var path = "";
				
				$.each(self.percent, function(i, coords){
					var
						currentX = Math.round(coords[0] * self.width / 100) + 25,
						currentY = Math.round(coords[1] * self.height / 100) + 25;
						
					path += (( i == 0 ) ? "M" : "L") + (( i == index ) ? (newX + "," + newY) : (currentX + "," + currentY));
				});
				
				self.connection.attr("path", path);
			})
			.click(function(){
				PF.AppRouter.navigate( "/work/" + link.attributes.slug, true );
			});
	},
	
	_cleanup : function(){
		$("#detail-background").empty();
		$("#detail").html("Loading Details...");
	}
	
});