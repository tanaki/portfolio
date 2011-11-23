// Author: Nicolas Pigelet <nipigelet@gmail.com>
// Filename: main.js

require.config({
	paths: {
		jQuery: 'libs/jquery/jquery',
		jQueryShuffle: 'libs/jquery/jquery.shuffle',
		Underscore: 'libs/underscore/underscore',
		Backbone: 'libs/backbone/backbone',
		Raphael: 'libs/raphael/raphael',
		templates: '../templates'
	}
});

require([
	'order!libs/jquery/jquery-min',
	'order!libs/underscore/underscore-min',
	'order!libs/backbone/backbone-min',
	'portfolio',
	'background'
], function($, _, b, Portfolio, Background){
	Portfolio.initialize();
	Background.initialize();
});

// String Helpers
String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.shuffle = function(container){
	var str = this,
		progress = str.length - 2,
		timer = setInterval(function() {
			container.text(str.substring(0, progress++));
			if (progress > str.length) clearInterval(timer);
		}, 80);
}