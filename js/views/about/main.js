// Filename: views/about/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'text!templates/about/main.html'
], function($, _, Backbone, aboutTemplate){
	
	var userListView = Backbone.View.extend({
		el: $("#page .content"),
		hide: function(target){
			this.el.fadeOut(300, function(){
				EH.trigger("hidden", target);
			});
		},
		render: function(){
			EH.trigger("showNav");
			this.el.html( aboutTemplate ).fadeIn();
		}
	});
	return new userListView;
});
