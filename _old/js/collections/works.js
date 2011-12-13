// Filename: collections/works
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'models/works'
], function($, _, Backbone, WorksModel){
	
	var WorksCollection = Backbone.Collection.extend({
		model: WorksModel,
		initialize: function(){

		}
	});

	return new WorksCollection;
});
