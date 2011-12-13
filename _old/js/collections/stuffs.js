// Filename: collections/works
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'models/stuffs'
], function($, _, Backbone, StuffsModel){
	
	var StuffsCollection = Backbone.Collection.extend({
		model: StuffsModel,
		initialize: function(){

		}
	});

	return new StuffsCollection;
});
