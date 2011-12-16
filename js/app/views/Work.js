
PF.View.Work = Backbone.View.extend({
	
	el : "#page .content",
	tpl_work : null,
	collection : null,
	
	lines : null,
	ordered : null,
	connection : null,
	
	offsetX : 0,
	offsetY : 0,
	
	initialize : function(){
		var self = this;
		$(window).resize(function(){
			// if ( self.lines ) self._drawLines(true);
			
			var target = $("#works-lines").position();
			self.offsetX = target.left;
			self.offsetY = target.top;
		});
	},
		
	hide : function (callbackEvent) {
		$(this.el).hide();
		if (callbackEvent) PF.EventManager.trigger( callbackEvent );
	},
	
	render : function() {
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
							tags: el.tags
						}));
					});

					self._display();
				}
			});
		}

		
	},
	
	_initLinks : function () {
		
		this.ordered = [];
		var 
			self = this,
			aLeft = [20, 30, 40, 50, 60, 70, 80, 90, 95],
			aTop = [10, 20, 30, 40, 50, 60, 70, 80, 90],
			els = $(".list-works a");

		aLeft = $.shuffle(aLeft);
		aTop = $.shuffle(aTop);

		els.each(function(i, a){
			$(a)
				.css({
					"position" : "absolute",
					"left" : ((i+1) * 10) + "%",
					"top" : "45%"
				})
				.animate({
					"left" : aLeft[i] + "%",
					"top" : aTop[i] + "%",
					"opacity" : 1
				}, 600, function(){
					self.ordered.push([aLeft[i], aTop[i]]);
					if (i == els.length - 1) self._drawLines();
				})
				.hover(
					function(){
						
						$(".breadcrumb .current:first")
							.removeClass("current")
							.addClass("link")
						
						setTimeout(function(){
							$(".breadcrumb .link:last").css("font-family", "Copy0855");
						}, 180);
						
						$("<span> / </span>")
							.appendTo($(".breadcrumb .link:last"));
							
						$('<li class="current">' + ($(this).text()).substring(0, 2) + '</li>')
							.appendTo( $(".breadcrumb") )
							.show();
							
						// $(this).text().shuffle( $(".breadcrumb .current:last") );
						$(".breadcrumb .current:last").text( $(this).text() );
						
						var url = "/img/work/projects/"+ $(this).data('slug') +".jpg";
						$("nav .selected span").css({
							"background-image" : "url(" + url + ")",
							"background-position" : "50% -5px"
						});
						
					},
					function(){

						$(".breadcrumb .link:last")
							.removeClass("link")
							.addClass("current")
							.css("font-family", "");

						$(".breadcrumb .current:first span").remove();
						$(".breadcrumb .current:last").remove();

						$("nav .selected span").css({
							"background-position" : "50% 100px"
						});
					}
				);
		});

	},
	
	_drawLines : function(redraw){
		
		if ( !redraw ) this.lines = Raphael(document.getElementById("works-lines"), "100%", "100%");
		if ( redraw ) this.lines.clear();

		var 
			self = this,
			width = Math.round($(window).width() / 2),
			height = Math.round($(window).height() / 2),
			path = "",
			line = this.lines.path(path).attr({
				"stroke" : "#333"
			}),
			i = 0;

		var animTimer = setInterval(function(){
			
			if ( !self.ordered[i][0] ) return;
			var 
				x = Math.round(self.ordered[i][0] * width / 100) + 25,
				y = Math.round(self.ordered[i][1] * height / 100) + 25;

			if ( i == 0) path = "M" + x + "," + y;
			else if ( i == 1 ) path += "L" + x + "," + y;
			else path += " " + x + "," + y;

			line.animate({
				"path" : path
			}, ( redraw ? 0 : 150));

			i++;
			if ( i > self.ordered.length - 1 ) clearInterval(animTimer);
		}, ( redraw ? 0 : 200) );
	},
	
	_display : function() {
		var 
			self = this,
			params = {
				projects : this.collection.models
			},
			tpl = _.template(this.tpl_work);
		
		$(this.el).html( tpl(params) ).fadeIn(300, function(){
			var target = $("#works-lines").position();
			self.offsetX = target.left;
			self.offsetY = target.top;
			self._drawLinks();
		});
	},
	
	_drawLinks : function(){
		
		this.lines = Raphael( document.getElementById("works-lines"), "100%", "100%" );
		
		this.ordered = [];
		var 
			self = this,
			
			aLeft = [20, 30, 40, 50, 60, 70, 80, 90, 95],
			aTop = [10, 20, 30, 40, 50, 60, 70, 80, 85],
			
			width = Math.round($(window).width() / 2),
			height = Math.round($(window).height() / 2),
			
			path = "";
			
		this.connection = this.lines.path(path).attr({
			"stroke" : "#333"
		});

		aLeft = $.shuffle(aLeft);
		aTop = $.shuffle(aTop);

		$.each(this.collection.models, function(i, link){
			
			var 
				x = Math.round(aLeft[i] * width / 100) + 25,
				y = Math.round(aTop[i] * height / 100) + 25;

			self.ordered.push([x, y]);
			
			setTimeout(function(){
				
				if ( i == 0) path = "M" + x + "," + y;
				else if ( i == 1 ) path += "L" + x + "," + y;
				else path += " " + x + "," + y;

				self.connection.animate({
					"path" : path
				}, 150);
				
				setTimeout(function(){
					self._drawLink(link, i);
				}, 200);

			}, i * 200 );
			
		});
		
	},
	
	_drawLink : function(link, index){
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
			x = self.ordered[index][0],
			y = self.ordered[index][1],
			circle = this.lines.circle(x, y, radius).scale(0,0).attr(attrCircle),
			lineCircle = this.lines.circle(x, y, radius + radiusPlus).scale(0,0).attr(attrLineCircle),
			areaCircle = this.lines.circle(x, y, radius + radiusPlus * 4).attr(attrAreaCircle);
			
		circle.animate({
			"transform" : "s1,1"
		}, 200);
		
		lineCircle.animate({
			"transform" : "s1,1"
		}, 200);
		
		areaCircle
			.mouseover(function(){
				circle.attr("opacity", 1);
				lineCircle.attr("opacity", 1);
				
				// TODO add updateBreadcrumb + image
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
				
				var path = "";
				$.each(self.ordered, function(i, coords){
					path += (( i == 0 ) ? "M" : "L") + coords[0] + "," + coords[1];
				});
				self.connection.animate({
					"path" : path
				}, 200);
			})
			.mousemove(function(e, mouseX, mouseY){
				var 
					newX = mouseX - self.offsetX,
					newY = mouseY - self.offsetY + 20;
				
				circle.attr({
					"cx" : newX,
					"cy" : newY
				});
				
				lineCircle.attr({
					"cx" : newX,
					"cy" : newY
				});
				
				var path = "";
				$.each(self.ordered, function(i, coords){
					path += (( i == 0 ) ? "M" : "L") + (( i == index ) ? (newX + "," + newY) : (coords[0] + "," + coords[1]));
				});
				self.connection.attr("path", path);
			})
			.click(function(){
				// TODO open the work detail
				console.log( link.attributes.slug );
			});
	}
	
});