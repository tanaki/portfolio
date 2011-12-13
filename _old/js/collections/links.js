// Filename: collections/works
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'models/links'
], function($, _, Backbone, LinksModel){
	
	var LinksCollection = Backbone.Collection.extend({
		model: LinksModel,
		initialize: function(){

		}
	});

	return new LinksCollection;
});
