// Filename: views/nav/main
define([
	'jQuery',
	'Underscore',
	'Backbone'
], function($, _, Backbone){

	var navView = Backbone.View.extend({
		el: $("nav, footer"),
		nav: $("nav"),
		breadcrumb: $(".breadcrumb"),
		
		order : function(idView){

			$("body")
				.attr("class", "")
				.addClass("page-" + idView);

			$(".selected", this.nav).removeClass("selected");
			$("#" + idView)
				.removeClass("first")
				.removeClass("second")
				.removeClass("third")
				.addClass("selected");
			
			$("a:not(.selected)", this.nav).each(function(i, a){
				$(a)
					.removeClass("first")
					.removeClass("second")
					.removeClass("third")
					.addClass(i == 0 ? "first" : (i == 1 ? "second" : "third"))
			});

			return this;
		},

		initBreadcrumb : function(){

			var self = this;
			$("nav a:not(.selected)").live({
				"mouseenter" : function(){
					if ( $(".breadcrumb .link").length > 1 )
						$(".breadcrumb .link:last").hide(200);

					var text = $("span", this).text();
					self._shuffleLetters(".breadcrumb .current", text);
				},
				"mouseleave" : function(){
					if ( $(".breadcrumb .link").length > 1 )
						$(".breadcrumb .link:last").show(200);

					self._shuffleLetters(".breadcrumb .current", this.breadcrumbText);
				}
			});
		},

		_shuffleLetters: function(target, str){
			if (str === undefined) str = window.location.hash.slice(2).split("/")[0].capitalize();
			var progress = str.length - 2;
			var timer = setInterval(function() {
				$(target).text(str.substring(0, progress++));
				if (progress > str.length) clearInterval(timer);
			}, 80);
		},

		updateBreadcrumb: function(idView){
			this.breadcrumbText = idView.capitalize();
			$(".current", this.breadcrumb).text( this.breadcrumbText );
		},

		hide: function(){
			this.el.fadeOut(200);
			this.breadcrumb.fadeOut(200);
		},
		render: function(){
			this.el.css("visibility", "visible").fadeIn(200);
			this.breadcrumb.css("visibility", "visible").fadeIn(200);
		}
	});
	return new navView;
	
});
