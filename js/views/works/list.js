// Filename: views/works/list
define([
	'jQuery',
	'jQueryShuffle',
	'Underscore',
	'Backbone',
	'collections/works',
	'text!templates/works/list.html'
], function($, shuffle, _, Backbone, projectsCollection, projectListTemplate){
	
	var projectListView = Backbone.View.extend({
		el: $("#page .content"),
		initialize: function(){

			this.collection = projectsCollection;
			$.ajax({
				url : "/data/works.json",
				success : function(response){
					_.each(response.projects, function(el, i){
						this.collection = projectsCollection.add({
							name: el.slug,
							slug: el.slug,
							title: el.title
						});
					});
				}
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
				projects: this.collection.models,
				_: _
			};
			var compiledTemplate = _.template( projectListTemplate, data );
			this.el.html( compiledTemplate ).fadeIn();
			this._initLinks();
		},
		
		_initLinks : function () {

			var 
				// aLeft = [20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
				// aTop = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
				aLeft = [20, 30, 40, 50, 60, 70, 80, 90],
				aTop = [10, 20, 30, 40, 50, 60, 70, 80, 90];

			aLeft = $.shuffle(aLeft);
			aTop = $.shuffle(aTop);

			$(".list-works a").each(function(i, a){
				$(a)
					.css({
						"position" : "absolute",
						"left" : (i * 10) + "%",
						"top" : "40%"
					})
					.animate({
						"left" : aLeft[i] + "%",
						"top" : aTop[i] + "%"
					}, 600)
					.hover(
						function(){
							$(".breadcrumb .current:first")
								.removeClass("current")
								.addClass("link")

							setTimeout(function(){
								$(".breadcrumb .link:last").css("font-family", "Copy0855");
							}, 180);

							$("<span> / </span>")
								.appendTo($(".breadcrumb .link:last"));

							$('<li class="current">' + ($(this).text()).substring(0, 2) + '</li>')
								.appendTo( $(".breadcrumb") )
								.fadeIn(400);

							$(this).text().shuffle( $(".breadcrumb .current:last") );
							$("nav .selected span").css("background-image", "url(/img/work/projects/"+ $(this).data('slug') +".jpg)");
						},
						function(){

							$(".breadcrumb .current:last")
								.fadeOut(200);

							$(".breadcrumb .link:last")
								.removeClass("link")
								.addClass("current")
								.css("font-family", "");

							$(".breadcrumb .current:first span")
								.remove();
						}
					);

			});

		}

	});
	return new projectListView;
	
});
