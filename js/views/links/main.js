// Filename: views/links/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'collections/links',
	'text!templates/links/main.html'
], function($, _, Backbone, linksCollection, linksTemplate){

	var linksView = Backbone.View.extend({
		el: $("#page .content"),
		page: $("#page"),

		initialize : function(){

			var 
				self = this;
				
			$(".link-az").live("click", function(e){
				e.preventDefault();
				self.toggleLists(this, true);
			});
			$(".link-gobelins").live("click", function(e){
				e.preventDefault();
				self.toggleLists(this, false);
			});
			$(".container ul li a")
				.live("mouseover", function(){

					var url = "/img/links/external/"+ $(this).data('slug') +".jpg";
					
					$("nav .selected span").css({
						"background-image" : "url(" + url + ")",
						"background-position" : "50% -5px"
					});
					
				})
				.live("mouseout", function(){
					
					$("nav .selected span").css({
						"background-position" : "50% 100px"
					});
				});
		},

		toggleLists : function (target, isAZ) {

			if ( $(target).hasClass("selected") ) return;

			$(".content .selected").removeClass("selected");
			$(target).addClass("selected");

			var marginLeft = isAZ ? "0px" : "-127px";
			$(".container").animate({
				"margin-left" : marginLeft
			}, 270);

			$(".a-z ul").animate({
				"opacity" : (isAZ ? 1 : 0)
			});
			$(".gobelins ul").animate({
				"opacity" : (isAZ ? 0 : 1)
			});

			$(".line").toggleClass("line-toggled");
		},

		hide: function(target){
			this.el.fadeOut(300, function(){
				EH.trigger("hidden", target);
			});
		},
		render: function(){
			EH.trigger("showNav");
			
			var self = this;
			this.collection = linksCollection;
			if ( this.collection.length == 0 ) {
				$.ajax({
					dataType : 'json',
					url: "/data/links.json",
					success : function(response){

						_.each(response.az, function(el, i){
							this.collection = linksCollection.add({
								name: el.name,
								url: el.url,
								slug: el.slug,
								type: "az"
							});
						});

						_.each(response.gobelins, function(el, i){

							this.collection = linksCollection.add({
								name: el.name,
								type: "gobelins",
								isSubtitle: true,
								"class": i != 0
							});

							_.each( el.people, function(link){
								this.collection = linksCollection.add({
									name: link.name,
									url: link.url,
									slug: link.slug,
									type: "gobelins"
								});
							});
						});
						self._display();
					}
				});
			} else {
				self._display();
			}
		},

		_display: function(){
			var self = this;

			if ($(".line").length == 0) self.page.append('<div class="line"></div>');
			else $(".line").removeClass("line-toggled");

			var data = {
				links: self.collection.models,
				_: _
			};
			var compiledTemplate = _.template( linksTemplate, data );
			self.el.html( compiledTemplate ).fadeIn();
		}
	});
	return new linksView;
	
});
