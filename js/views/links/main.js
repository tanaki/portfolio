// Filename: views/links/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'text!templates/links/main.html'
], function($, _, Backbone, linksTemplate){

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
			
		},

		toggleLists : function (target, isAZ) {

			if ( $(target).hasClass("selected") ) return;

			$(".content .selected").removeClass("selected");
			$(target).addClass("selected");

			var marginLeft = isAZ ? "0px" : "-127px";
			$(".container").animate({
				"margin-left" : marginLeft
			});

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
			this.el.html( linksTemplate ).fadeIn();
		}
	});
	return new linksView;
	
});
