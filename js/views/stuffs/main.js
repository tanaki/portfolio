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
		hide: function(target){
			this.el.fadeOut(300, function(){
				EH.trigger("hidden", target);
			});
		},
		render: function(){
			EH.trigger("showNav");

			this.collection = stuffsCollection;
			if ( this.collection.length == 0 ) {
				var self = this;
				$.ajax({
					url : "/data/stuffs.json",
					success : function(response){
						_.each(response.stuffs, function(el, i){
							this.collection = stuffsCollection.add({
								index: el.index,
								slug: el.slug,
								title: el.title,
								class: el.class,
								data: el.date,
								img: el.img,
								text: el.text,
								tags: el.tags
							});
						});
						self._display();
					}
				});
			} else {
				this._display();
			}
		},

		_display : function(){
			var data = {
				stuffs: this.collection.models,
				_: _
			};
			var compiledTemplate = _.template( stuffsTemplate, data );
			this.el.html( compiledTemplate ).fadeIn();
			this._updateImage();
		},

		_updateImage : function(){
			var img = $(".content ul li:not(.hidden)").data("img");
			if (img) {
				$("nav .selected span")
					.css("background-image", "url(/img/stuffs/"+ img +")");
			}
		}
	});
	return new stuffsView;

});
