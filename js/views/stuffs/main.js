// Filename: views/stuffs/main
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'collections/stuffs',
	'text!templates/stuffs/main.html'
], function($, _, Backbone, stuffsCollection, stuffsTemplate){

	var stuffsView = Backbone.View.extend({
		el: $("#page .content"),
		initialize: function(){
			this.collection = stuffsCollection;

			this.collection = stuffsCollection.add({
				date: "2011-10",
				name: "Projet 1",
				text: "Texte du projet 1",
				img: "/img/src.jpg",
				video: "http://youtube.com/ID"
			});

			this.collection = stuffsCollection.add({
				date: "2011-11",
				name: "Projet 2",
				text: "Texte du projet 2",
				img: "/img/src.jpg",
				video: "http://youtube.com/ID"
			});
		},
		hide: function(app_router){
			this.el.fadeOut(300, function(){
				app_router.trigger("hide");
			});
		},
		render: function(app_router){
			app_router.trigger("showNav");
			
			var data = {
				stuffs: this.collection.models,
				_: _
			};
			var compiledTemplate = _.template( stuffsTemplate, data );
			this.el.html( compiledTemplate ).fadeIn();
		}
	});
	return new stuffsView;

});
