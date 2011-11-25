// Filename: views/stuffs/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'collections/stuffs',
	'text!templates/stuffs/main.html'
], function($, _, Backbone, stuffsCollection, stuffsTemplate){

	var stuffsView = Backbone.View.extend({
		el: $("#page .content"),
		initialize : function(){
			$(window).resize(function(){
				$(".page-stuffs .content").css("width", $(window).width() - 565 );

				var 
					navStuffs = $(".page-stuffs .content .nav-stuffs"),
					hNavStuffs = $(".page-stuffs .content .nav-stuffs li").length * 30 + 60;
				navStuffs.css("top", (($(window).height() - hNavStuffs) / 2) );
			});
		},
		hide: function(target, slug){
			this.el.fadeOut(300, function(){
				EH.trigger("hidden", [target, slug]);
			});
		},

		changePartial: function(selectedSlug){

			var
				currentArticle = $("ul.articles li:not(.hidden)"),
				targetArticle = $("ul.articles li[data-slug="+ selectedSlug +"]"),
				currentSlug = currentArticle.data("slug"),
				currentIndex = currentArticle.data("index"),
				targetIndex = targetArticle.data("index"),
				currentLink = $("ul.nav-stuffs li.current"),
				targetLink = $("ul.nav-stuffs li[data-index=" + targetIndex + "]"),
				currentToAnimate = $("span.stuff-content", currentArticle),
				targetToAnimate = $("span.stuff-content", targetArticle);

			if (selectedSlug == currentSlug) return;

			currentLink.removeClass("current");
			targetLink.addClass("current");

			currentToAnimate.animate({
				"opacity" : 0,
				"top" : currentIndex > targetIndex ? "95%" : "5%"
			}, 400, function(){
				currentArticle.addClass("hidden");
				currentToAnimate.css({
					"top": currentToAnimate.data("top"),
					"opacity": 1
				});
			});

			targetArticle.removeClass("hidden");
			targetToAnimate
				.css({
					"top": currentIndex > targetIndex ? "5%" : "95%",
					"opacity" : 0
				})
				.animate({
					"opacity" : 1,
					"top": targetToAnimate.data("top")
				}, 400);
		},

		render: function(selectedSlug){
			EH.trigger("showNav");
			
			this.collection = stuffsCollection;
			if ( this.collection.length == 0 ) {
				var self = this;
				$.ajax({
					dataType : 'json',					
					url : "/data/stuffs.json",
					success : function(response){
						_.each(response.stuffs, function(el, i){
							this.collection = stuffsCollection.add({
								index: el.index,
								slug: el.slug,
								title: el.title,
								top: el.top,
								date: el.date,
								img: el.img,
								text: el.text,
								tags: el.tags
							});
						});
						self._display(selectedSlug);
					}
				});
			} else {
				this._display(selectedSlug);
			}
		},

		_display : function(selectedSlug){
			
			var data = {
				stuffs: this.collection.models,
				selectedSlug: selectedSlug,
				_: _
			};
			var compiledTemplate = _.template( stuffsTemplate, data );
			this.el.html( compiledTemplate ).fadeIn();
			this._updateImage();
			$(window).resize();
		},

		_updateImage : function(){
			var img = $(".content ul li:not(.hidden)").data("img");
			if (img) {
				$("nav .selected span")
					.css("background-image", "url(/img/stuffs/"+ img +")");
			}
		}
	});
	return new stuffsView;

});
