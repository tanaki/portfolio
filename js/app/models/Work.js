
PF.Model.Work = Backbone.Model.extend({
	
	defaults: {
		index: 0,
		color: "ffffff",
		slug: "project",
		title: "Project",
		featured : false,
		context: null,
		link: null,
		linkText: "",
		white: false,
		videoType: null,
		videoId: null,
		text: "description of the project",
		tags: []
	},
	
	initialize: function(){
		
	}
	
});
