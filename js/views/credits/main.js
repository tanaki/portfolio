// Filename: views/credits/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'text!templates/credits/main.html'
], function($, _, Backbone, creditsTemplate){

	var creditsView = Backbone.View.extend({
		el: $("#page .content"),
		hide: function(app_router){
			this.el.fadeOut(300, function(){
				app_router.trigger("hide");
			});
		},
		render: function(app_router){
			app_router.trigger("showNav");
			this.el.html( creditsTemplate ).fadeIn();
		}
	});
	return new creditsView;

});
