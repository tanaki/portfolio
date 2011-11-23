// Filename: portfolio.js
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'router'
], function($, _, Backbone, Router){

	var initialize = function(){
		$("html").removeClass("no-js");
		$('a[rel="external"]').live("click", function(e){
			e.preventDefault();
			window.open( $(this).attr('href') , "_blank" );
		});

		// Event Helpers
		window.EH = $({});

		Router.initialize();
	}

	return {
		initialize: initialize
	};
});
