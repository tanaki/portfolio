// Filename: views/credits/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'text!templates/credits/main.html'
], function($, _, Backbone, creditsTemplate){

	var creditsView = Backbone.View.extend({
		el: $("#page .content"),
		hide: function(target){
			this.el.fadeOut(300, function(){
				EH.trigger("hidden", target);
			});
		},
		render: function(){
			console.log("credits render");
			EH.trigger("showNav");
			this.el.html( creditsTemplate ).fadeIn();
		}
	});
	return new creditsView;

});
