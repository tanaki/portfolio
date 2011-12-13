
PF.Model.Stuff = Backbone.Model.extend({
	
	defaults: {
		index : 0,
		slug: "stuff",
		title: "Stuff",
		top: "40%",
		date: "11.2011",
		img: "",
		text: "description of the stuff",
		tags: []
	},
	
	initialize: function(){
		
	}
	
});
