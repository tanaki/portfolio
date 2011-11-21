// Filename: models/works
define([
	'Underscore',
	'Backbone'
], function(_, Backbone) {
	
	var worksModel = Backbone.Model.extend({
		defaults: {
			slug: "project",
			title: "Project",
			featured : false,
			context: "Project",
			link: "http://nicolaspigelet.com",
			text: "description of the project",
			tags: []
		},
		initialize: function(){

		}
	});
	
	return worksModel;

});
