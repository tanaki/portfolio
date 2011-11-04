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
				$("span", a).css("background-image", "");
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
					text.shuffle( $(".breadcrumb .current") );
				},
				"mouseleave" : function(){
					if ( $(".breadcrumb .link").length > 1 )
						$(".breadcrumb .link:last").show(200);

					this.breadcrumbText = window.location.hash.slice(2).split("/")[0].capitalize();
					this.breadcrumbText.shuffle( $(".breadcrumb .current") );
				}
			});
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
