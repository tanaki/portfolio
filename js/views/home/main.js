// Filename: views/home/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'text!templates/home/main.html'
], function($, _, Backbone, mainHomeTemplate){

	var mainHomeView = Backbone.View.extend({
		el: $("#page .content"),
		hide: function(app_router){
			this.el.fadeOut(300, function(){
				app_router.trigger("hide");
			});
		},
		render: function(app_router){
			app_router.trigger("hideNav");
			this.el.html(mainHomeTemplate).fadeIn();
		}
	});
	
	return new mainHomeView;
});
