// Filename: portfolio.js
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'router'
], function($, _, Backbone, Router){

	var initialize = function(){
		$("html").removeClass("no-js")
		Router.initialize();
	}

	return {
		initialize: initialize
	};
});
