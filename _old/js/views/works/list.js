// Filename: views/works/list
define([
	'jQuery',
	'jQueryShuffle',
	'Underscore',
	'Backbone',
	'Raphael',
	'collections/works',
	'text!templates/works/list.html'
], function($, shuffle, _, Backbone, Raphael, projectsCollection, projectListTemplate){
	
	var 
		R = null,
		lines = null,
		ordered = null;
	
	var projectListView = Backbone.View.extend({
		el: $("#page .content"),
		
		initialize : function(){
			var self = this;
			$(window).resize(function(){
				if ( lines ) self._drawLines(true);
			});
		},
		
		hide: function(target){
			this.el.fadeOut(300, function(){
				EH.trigger("hidden", target);
			});
		},
		
		render: function(){
			EH.trigger("showNav");
			
			this.collection = projectsCollection;
			if ( this.collection.length == 0 ) {
				var self = this;
				$.ajax({
					dataType : 'json',
					url : "/data/works.json",
					success : function(response){
						_.each(response.projects, function(el, i){
							this.collection = projectsCollection.add({
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
							});
						});
						self._display();
						EH.trigger("projects_ready");
					}
				});
			} else {
				this._display();
			}
		},

		_display : function(){
			var data = {
				projects: this.collection.models,
				_: _
			};
			var compiledTemplate = _.template( projectListTemplate, data );
			var self = this;
			this.el.html( compiledTemplate ).fadeIn(300, function(){
				self._initLinks();
			});
		},
		
		_initLinks : function () {
			
			ordered = [];
			var 
				// aLeft = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
				// aTop = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
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
						ordered.push([aLeft[i], aTop[i]]);
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
								.fadeIn(400);

							$(this).text().shuffle( $(".breadcrumb .current:last") );

							var url = "/img/work/projects/"+ $(this).data('slug') +".jpg";
							$("nav .selected span").css({
								"background-image" : "url(" + url + ")",
								"background-position" : "50% -5px"
							});

						},
						function(){

							$(".breadcrumb .current:last")
								.fadeOut(200);

							$(".breadcrumb .link:last")
								.removeClass("link")
								.addClass("current")
								.css("font-family", "");

							$(".breadcrumb .current:first span")
								.remove();
						
							$("nav .selected span").css({
								"background-position" : "50% 100px"
							});
						}
					);
			});

		},
		
		_drawLines : function(redraw){
			
			if ( !redraw ) lines = Raphael(document.getElementById("works-lines"), "100%", "100%");
			if ( redraw ) lines.clear();
			
			var 
				width = Math.round($(window).width() / 2),
				height = Math.round($(window).height() / 2),
				path = "",
				line = lines.path(path).attr({
					"stroke" : "#333"
				}),
				i = 0;
			
			var animTimer = setInterval(function(){
				var 
					x = Math.round(ordered[i][0] * width / 100) + 25,
					y = Math.round(ordered[i][1] * height / 100) + 25;

				if ( i == 0) path = "M" + x + "," + y;
				else if ( i == 1 ) path += "L" + x + "," + y;
				else path += " " + x + "," + y;
				
				line.animate({
					"path" : path
				}, ( redraw ? 0 : 150));
				
				i++;
				if ( i > ordered.length - 1 ) clearInterval(animTimer);
			}, ( redraw ? 0 : 200) );
		}

	});
	return new projectListView;
	
});
