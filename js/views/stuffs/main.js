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
			var self = this;
			$(window).resize(function(){
				$(".page-stuffs .content").css("width", $(window).width() - 565 );
				self._updateNavPos(true);
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
			this._updateNavPos();

			var self = this;
			currentToAnimate.animate({
				"opacity" : 0,
				"top" : currentIndex > targetIndex ? "70%" : "30%"
			}, 400, function(){
				currentArticle.addClass("hidden");
				self._updateImage();
				currentToAnimate.css({
					"top": currentToAnimate.data("top"),
					"opacity": 1
				});
			});

			targetArticle.removeClass("hidden");
			targetToAnimate
				.css({
					"top": currentIndex > targetIndex ? "30%" : "70%",
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
				baseTop : Math.round($(window).height() / 2),
				stuffs: this.collection.models,
				selectedSlug: selectedSlug,
				_: _
			};
			var compiledTemplate = _.template( stuffsTemplate, data );
			var self = this;
			this.el.html( compiledTemplate ).fadeIn(300, function(){
				self._updateImage();
				self._updateNavPos();
				$(window).resize();
			});
		},

		_updateImage : function(){
			var img = $(".content ul li:not(.hidden)").data("img");
			$("nav .selected span").css("background-image", "url(/img/stuffs/"+ img +")");
		},
		
		_updateNavPos : function(resize){
			
			var 
				navHeight = stuffsCollection.length * 35 + 45,
				middle = Math.floor(stuffsCollection.length / 2),
				index = $(".nav-stuffs li.current").data("index"),
				top = Math.round(($(window).height() - navHeight) / 2),
				offset = 35 * (middle - index);
			
			if ( resize ) $(".nav-stuffs").css("top", Math.round(top + offset));
			else 
				$(".nav-stuffs").animate({ 
					"top" : Math.round(top + offset)
				}, 200 );
		}
	});
	return new stuffsView;

});
