// Filename: views/works/list
define([
	'jQuery',
	'jQueryShuffle',
	'Underscore',
	'Backbone',
	'Raphael',
	'collections/works',
	'text!templates/works/list.html',
	'text!templates/works/detail.html'
], function($, shuffle, _, Backbone, Raphael, projectsCollection, projectListTemplate, projectDetailTemplate){
	
	var 
		R = null,
		whiteBG = null,
		colorSquare = null;
	
	var projectListView = Backbone.View.extend({
		el: $("#page .content"),
		
		elDetailContainer : $("#page #detail-container"),
		elDetail : $("#page #detail"),
		elDetailBackground : $("#page #detail-background"),
		
		initialize : function(){
			$(window).resize(function(){
				if ( whiteBG ) {
					var
						fWidth = $(window).width(),
						fHeight = $(window).height(),
						a = "M" + (fWidth - 40) + ",40",
						b = "L" + (fWidth - 20) + ",100",
						c = " " + (fWidth - 20) + "," + (fHeight - 40),
						d = " " + (fWidth - 350) + "," + (fHeight - 20),
						e = " 20," + (fHeight - 20),
						f = " 20," + (fHeight - 20),
						g = " 20,20",
						h = " 20,20",
						i = " " + (fWidth - 100) + ",20",
						finalPath = a + b + c + d + e + f + g + h + i + "Z";
					whiteBG.attr("path", finalPath);
					
					var 
						j = " " + (fWidth - 20) + ",200",
						k = " " + (fWidth - 300) + ",200",
						l = " " + (fWidth - 300) + ",20";
					colorSquare.attr("path", a + b + j + k + l + i + "Z");
				}
				
			});
		},
		
		hide: function(target){
			this.el.fadeOut(300, function(){
				EH.trigger("hidden", target);
			});
		},
		
		changePartial : function(slug) {

			$(".page-work").addClass("page-work-detail");
			R = Raphael(document.getElementById("detail-background"), "100%", "100%");
			
			var 
				ul = $(".list-works"),
				target = $("ul li a[data-slug=" + slug + "]"),
				color = target.data("color");
				
			var
				fWidth = $(window).width(),
				fHeight = $(window).height(),
				initialX = target.position().left + ul.position().left + 25,
				initialY = target.position().top + ul.position().top,
				WBGAttr = {
					"stroke-opacity" : 0,
					"stroke-width" : 0,
					"stroke" : "#ffffff",
					"fill" : "#ffffff"
				};

			// INITIAL PATH
			var 
				a = "M" + initialX + "," + initialY,
				b = "L" + initialX + "," + initialY,
				//b = "R" + (initialX - 3) + "," + (initialY + 5),
				c = " " + (initialX - 2) + "," + (initialY + 1),
				d = " " + (initialX - 5) + "," + (initialY + 1),
				e = " " + (initialX - 3) + "," + (initialY + 1),
				f = " " + (initialX - 5) + "," + (initialY + 1),
				g = " " + (initialX - 4) + "," + (initialY - 5),
				h = " " + (initialX - 1) + "," + (initialY - 1),
				i = " " + initialX + "," + initialY,
				initialPath = a + b + c + d + e + f + g + h + i + "Z";


			// STEP PATH
			a = "M" + initialX + "," + initialY;
			b = "L" + initialX + "," + initialY;;
			//b = "R" + (initialX - 10) + "," + (initialY + 10);
			c = " " + (initialX - 10) + "," + (initialY + 20);
			d = " " + (initialX - 30) + "," + (initialY + 50);
			e = " " + (initialX - 50) + "," + (initialY + 60);
			f = " " + (initialX - 80) + "," + (initialY + 50);
			g = " " + (initialX - 100) + "," + (initialY - 50);
			h = " " + (initialX - 50) + "," + (initialY - 50);
			i = " " + initialX + "," + initialY;
			var step1Path = a + b + c + d + e + f + g + h + i + "Z";
			
			// STEP 2 PATH
			a = "M" + initialX + "," + initialY;
			b = "L" + initialX + "," + initialY;
			//b = "L" + (initialX - 30) + "," + (initialY + 50);
			c = " " + (initialX - 20) + "," + (initialY + 100);
			d = " " + (initialX - 50) + "," + (initialY + 150);
			e = " " + (initialX - 350) + "," + (initialY + 100);
			f = " " + (initialX - 500) + "," + (initialY + 100);
			g = " " + (initialX - 450) + "," + (initialY - 50);
			h = " " + (initialX - 150) + "," + (initialY - 150);
			i = " " + initialX + "," + initialY;
			var step2Path = a + b + c + d + e + f + g + h + i + "Z";

			// STEP 3 PATH
			a = "M" + (initialX + 40) + "," + (initialY - 40);
			b = "L" + (initialX + 40) + "," + (initialY - 40);
			//b = "L" + (initialX + 80) + "," + (initialY - 20);
			c = " " + (initialX + 50) + "," + (initialY + 140);
			d = " " + (initialX - 50) + "," + (initialY + 180);
			e = " " + (initialX - 350) + "," + (initialY + 200);
			f = " " + (initialX - 600) + "," + (initialY + 100);
			g = " " + (initialX - 550) + "," + (initialY - 150);
			h = " " + (initialX - 350) + "," + (initialY - 200);
			//i = " " + (initialX + 20) + "," + (initialY - 80);
			i = " " + (initialX + 40) + "," + (initialY - 40);
			var step3Path = a + b + c + d + e + f + g + h + i + "Z";

			// FINAL PATH
			a = "M" + (fWidth - 40) + ",40";
			b = "L" + (fWidth - 20) + ",100";
			c = " " + (fWidth - 20) + "," + (fHeight - 40);
			d = " " + (fWidth - 350) + "," + (fHeight - 20);
			e = " 20," + (fHeight - 20);
			f = " 20," + (fHeight - 20);
			g = " 20,20";
			h = " 20,20";
			i = " " + (fWidth - 100) + ",20";
			var finalPath = a + b + c + d + e + f + g + h + i + "Z";

			var self = this;
			whiteBG = R.path(initialPath).attr(WBGAttr);
			whiteBG.animate({
				"path" : step1Path
			}, 150, function(){

				whiteBG.animate({
					"path" : step2Path
				}, 200, function(){

					whiteBG.animate({
						"path" : step3Path
					}, 200, function(){

						whiteBG.animate({
							"path" : finalPath
						}, 400, function(){
							self._displayPartial(slug);
							
							var 
								j = " " + (fWidth - 20) + ",200",
								k = " " + (fWidth - 300) + ",200",
								l = " " + (fWidth - 300) + ",20";
							colorSquare = R.path(a + b + j + k + l + i + "Z").attr({
								"stroke-opacity" : 0,
								"stroke-width" : 0,
								"stroke" : "#" + color,
								"fill" : "#" + color
							});
						});

					});

				});

			});
		},

		_displayPartial : function(slug){

			var data = {
				projects: this.collection.models,
				selectedSlug : slug,
				_: _
			};
			var compiledTemplate = _.template( projectDetailTemplate, data );
			this.elDetail
				.html( compiledTemplate )
				.fadeIn(300);
				
		},

		render: function(slug){
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
								videoType: el.videoType,
								videoId: el.videoId,
								text: el.text,
								tags: el.tags
							});
						});
						self._display(slug);
					}
				});
			} else {
				this._display(slug);
			}
			
		},

		_display : function(slug){
			var data = {
				projects: this.collection.models,
				_: _
			};
			var compiledTemplate = _.template( projectListTemplate, data );
			var self = this;
			this.el.html( compiledTemplate ).fadeIn(300, function(){
				self._initLinks();
				if (slug) self.changePartial(slug);
			});
		},
		
		_initLinks : function () {

			var 
				// aLeft = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
				// aTop = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
				aLeft = [30, 40, 50, 60, 70, 80, 90],
				aTop = [10, 20, 30, 40, 50, 60, 70, 80, 90];

			aLeft = $.shuffle(aLeft);
			aTop = $.shuffle(aTop);

			$(".list-works a").each(function(i, a){
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
					}, 600)
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

							$("nav .selected span")
								.css("background-image", "url(/img/work/projects/"+ $(this).data('slug') +".jpg)");

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
						}
					);

			});

		}

	});
	return new projectListView;
	
});
