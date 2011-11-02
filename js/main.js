// Author: Nicolas Pigelet <nipigelet@gmail.com>
// Filename: main.js

require.config({
	paths: {
		jQuery: 'libs/jquery/jquery',
		Underscore: 'libs/underscore/underscore',
		Backbone: 'libs/backbone/backbone',
		templates: '../templates'
	}
});

require([

	'portfolio',
	'order!libs/jquery/jquery-min',
	'order!libs/underscore/underscore-min',
	'order!libs/backbone/backbone-min'

], function(Portfolio){

	Portfolio.initialize();
	
});


// Helpers
String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
}