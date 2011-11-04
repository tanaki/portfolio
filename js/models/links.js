// Filename: models/works
define([
	'Underscore',
	'Backbone'
], function(_, Backbone) {
	
	var linksModel = Backbone.Model.extend({
		defaults: {
			url : "name.com",
			type : "az",
			slug : "az",
			isSubtitle : false,
			"class" : false
		},
		initialize: function(){

		}
	});
	
	return linksModel;

});
