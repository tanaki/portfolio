// Filename: router.js
define([
	'jQuery',
	'Underscore',
	'Backbone',

	'views/nav/main',
	'views/home/main',
	'views/works/list',
	'views/works/detail',
	'views/about/main',
	'views/stuffs/main',
	'views/links/main',
	'views/credits/main'
], function($, _, Backbone, navView, mainHomeView, worksListView, worksDetailView, aboutView, stuffsView, linksView, creditsView ){

	var
		currentView = mainHomeView,
		isInit = true;

	worksListView.id = "work";
	worksDetailView.id = "workDetail";
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
			'/stuffs/:slug': 'showStuffsData',
			'/links': 'showLinks',
			'/credits': 'showCredits',
			// Default
			'*actions': 'defaultAction'
		},

		showWorks: function(){
			this._displayPage(worksListView);
		},
		showWorkDetail : function(slug){
			
			if ( isInit || (currentView != worksListView && currentView != worksDetailView) ) {
				currentView = worksListView;
				worksListView.render(slug);
				this.updateBreadcrumb();
				isInit = false;
			}
			currentView = worksDetailView;
			currentView.render(slug);
		},
		showAbout: function(){
			this._displayPage(aboutView);
		},
		showStuffs: function(){
			this._displayPage(stuffsView);
		},
		showStuffsData : function(slug){
			this._displayPartial(stuffsView, slug);
		},
		showLinks: function(){
			this._displayPage(linksView);
		},
		showCredits: function(){
			alert("© 2011-2012 Nicolas Pigelet - Thanks at Frederik Delmotte <frederikdelmotte.be>");
			// currentView = creditsView;
			// this.hide();
		},
		defaultAction: function(actions){
			this._displayPage(mainHomeView);
		},

		_displayPartial : function(view, slug) {
			if ( !isInit ) {
				view.changePartial(slug);
			}
			else {
				this._displayPage(view, slug);
			}
		},

		_displayPage : function(view, slug) {
			if ( !isInit ) {
				currentView.hide(view, slug);
			}
			else {
				isInit = false;
				currentView = view;
				view.render(slug);
				if ( currentView !== mainHomeView ) this.updateBreadcrumb();
			}
		},

		updateBreadcrumb : function(){
			navView.updateBreadcrumb(currentView.id);
		}
	});

	var initialize = function(){
		
		var app_router = new AppRouter;
		EH.bind({
			"hidden" : function(e, view, slug){
				currentView = view;
				view.render(slug);
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