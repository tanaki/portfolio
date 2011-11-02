// Filename: router.js
define([
	'jQuery',
	'Underscore',
	'Backbone',

	'views/nav/main',
	'views/home/main',
	'views/works/list',
	'views/about/main',
	'views/stuffs/main',
	'views/links/main',
	'views/credits/main'
], function($, _, Backbone, navView, mainHomeView, worksListView, aboutView, stuffsView, linksView, creditsView ){

	var currentView = mainHomeView;

	worksListView.id = "works";
	aboutView.id = "about";
	stuffsView.id = "stuffs";
	linksView.id = "links";

	var AppRouter = Backbone.Router.extend({
		routes: {
			// Define URL routes
			'/works': 'showWorks',
			'/about': 'showAbout',
			'/stuffs': 'showStuffs',
			'/links': 'showLinks',
			'/credits': 'showCredits',
			// Default
			'*actions': 'defaultAction'
		},

		showWorks: function(){
			currentView = worksListView;
			this.hide();
			this.updateBreadcrumb();
		},
		showAbout: function(){
			currentView = aboutView;
			this.hide();
			this.updateBreadcrumb();
		},
		showStuffs: function(){
			currentView = stuffsView;
			this.hide();
			this.updateBreadcrumb();
		},
		showLinks: function(){
			currentView = linksView;
			this.hide();
			this.updateBreadcrumb();
		},
		showCredits: function(){
			currentView = creditsView;
			this.hide();
		},
		defaultAction: function(actions){
			currentView = mainHomeView;
			this.hide();
		},

		updateBreadcrumb : function(){
			navView.updateBreadcrumb(currentView.id);
		},
		show: function(){
			if(currentView !== null) currentView.render(this);
		},
		hide: function(){
			if(currentView !== null) currentView.hide(this);
		}
	});

	var initialize = function(){
		var app_router = new AppRouter;
		app_router
			.bind("hide", function(){
				this.show();
			})
			.bind("showNav", function(){
				navView
					.order(currentView.id)
					.render();
			})
			.bind("hideNav", function(){
				navView.hide();
			});
		navView.initBreadcrumb();

		Backbone.history.start();
	};
	
	return {
		initialize: initialize
	};
});