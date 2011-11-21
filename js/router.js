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

	var
		currentView = mainHomeView,
		isInit = true;

	worksListView.id = "work";
	aboutView.id = "about";
	stuffsView.id = "stuffs";
	linksView.id = "links";

	var AppRouter = Backbone.Router.extend({
		routes: {
			// Define URL routes
			'/work': 'showWorks',
			'/work/:slug': 'showWorkDetail',
			'/about': 'showAbout',
			'/stuffs': 'showStuffs',
			'/links': 'showLinks',
			'/credits': 'showCredits',
			// Default
			'*actions': 'defaultAction'
		},

		showWorks: function(){
			this._displayPage(worksListView);
		},
		showWorkDetail : function(slug){
			console.log(slug);
		},
		showAbout: function(){
			this._displayPage(aboutView);
		},
		showStuffs: function(){
			this._displayPage(stuffsView);
		},
		showLinks: function(){
			this._displayPage(linksView);
		},
		showCredits: function(){
			// currentView = creditsView;
			// this.hide();
		},
		defaultAction: function(actions){
			// currentView = mainHomeView;
			// this.hide();
		},

		_displayPage : function(view) {
			if ( !isInit ) {
				currentView.hide(view);
			}
			else {
				isInit = false;
				currentView = view;
				view.render();
				this.updateBreadcrumb();
			}
		},

		updateBreadcrumb : function(){
			navView.updateBreadcrumb(currentView.id);
		}
	});

	var initialize = function(){
		
		var app_router = new AppRouter;
		EH.bind({
			"hidden" : function(e, view){
				currentView = view;
				view.render();
				app_router.updateBreadcrumb();
			},
			"showNav" : function(){
				navView
					.order(currentView.id)
					.render();
			},
			"hideNav" : function(){
				navView.hide();
			}
		});
		navView.initBreadcrumb();

		Backbone.history.start();
	};
	
	return {
		initialize: initialize
	};
});