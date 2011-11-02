// Filename: views/works/list
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'collections/works',
	'text!templates/works/list.html'
], function($, _, Backbone, projectsCollection, projectListTemplate){
	
	var projectListView = Backbone.View.extend({
		el: $("#page .content"),
		initialize: function(){

			this.collection = projectsCollection;
			this.collection.bind("add", this.exampleBind);
			this.collection = projectsCollection.add({ name: "Twitter"});
			this.collection = projectsCollection.add({ name: "Facebook"});
			this.collection = projectsCollection.add({ name: "Myspace", score: 20});
			
		},
		exampleBind: function( model ){
			//console.log(model);
		},
		hide: function(app_router){
			this.el.fadeOut(300, function(){
				app_router.trigger("hide");
			});
		},
		render: function(app_router){
			app_router.trigger("showNav");
			
			var data = {
				projects: this.collection.models,
				_: _
			};
			var compiledTemplate = _.template( projectListTemplate, data );
			this.el.html( compiledTemplate ).fadeIn();
		}
	});
	return new projectListView;
	
});
