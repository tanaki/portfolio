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

			var self = this;
			$(".link-az").live("click", function(e){
				e.preventDefault();
				self.toggleLists(this, true);
			});
			$(".link-gobelins").live("click", function(e){
				e.preventDefault();
				self.toggleLists(this, false);
			});
			$(".container ul li a").live("mouseover", function(){
				$("nav .selected span").css("background-image", "url(/img/links/external/"+ $(this).data('slug') +".jpg)");
			});

			this.collection = linksCollection;
			$.ajax({
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
				}
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

		hide: function(app_router){
			this.el.fadeOut(300, function(){
				app_router.trigger("hide");
			});
		},
		render: function(app_router){
			app_router.trigger("showNav");
			
			if ($(".line").length == 0) this.page.append('<div class="line"></div>');
			else $(".line").removeClass("line-toggled");
			
			var data = {
				links: this.collection.models,
				_: _
			};
			var compiledTemplate = _.template( linksTemplate, data );
			this.el.html( compiledTemplate ).fadeIn();
		}
	});
	return new linksView;
	
});
