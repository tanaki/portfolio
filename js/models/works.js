// Filename: models/works
define([
	'Underscore',
	'Backbone'
], function(_, Backbone) {
	
	var worksModel = Backbone.Model.extend({
		defaults: {
			slug: "project",
			title: "Project"
		},
		initialize: function(){

		}
	});
	
	return worksModel;

});
