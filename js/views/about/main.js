// Filename: views/about/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'text!templates/about/main.html'
], function($, _, Backbone, aboutTemplate){
	
	var userListView = Backbone.View.extend({
		el: $("#page .content"),
		hide: function(app_router){
			this.el.fadeOut(300, function(){
				app_router.trigger("hide");
			});
		},
		render: function(app_router){
			app_router.trigger("showNav");
			this.el.html( aboutTemplate ).fadeIn();
		}
	});
	return new userListView;
});
