// Filename: portfolio.js
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'router'
], function($, _, Backbone, Router){

	var initialize = function(){
		$("html").removeClass("no-js")

		// Event Helpers
		window.EH = $({});

		Router.initialize();
	}

	return {
		initialize: initialize
	};
});
