
PF.Router = Backbone.Router.extend({
	
	currentView : null,
	isInit : false,
	nav : null,
	eventHandlers : {},
	
	homeView : null,
	aboutView : null,
	workView : null,
	stuffsView : null,
	
	routes : {
		"about" : "_aboutAction",
		"work" : "_workAction",
		"work/:slug" : "_workDetailAction",
		"stuffs" : "_stuffsAction",
		"stuffs/:slug" : "_stuffsAction",
		"links" : "_linksAction",
		"credits" : "_creditsAction",
		"*actions" : "_defaultAction"
	},
	
	/*
	 * about Action
	 * @private
	 */
	_aboutAction : function() {
		this._displayPage( PF.Events.INIT_ABOUT );
	},
	
	/*
	 * work Action
	 * @private
	 */
	_workAction : function() {
		this._displayPage( PF.Events.INIT_WORK );
	},
	
	/*
	 * work Action
	 * @private
	 */
	_workDetailAction : function( slug ) {
		console.log("work detail action", slug);
		//this._displayPage( PF.Events.INIT_WORK_DETAIL );
	},
	
	/*
	 * stuffs Action
	 * @private
	 */
	_stuffsAction : function(slug) {
		this._displayPage( PF.Events.INIT_STUFFS, slug );
	},
	
	/*
	 * work Action
	 * @private
	 */
	_linksAction : function() {
		this._displayPage( PF.Events.INIT_LINKS );
	},
	
	/*
	 * work Action
	 * @private
	 */
	_creditsAction : function() {
		this._displayPage( PF.Events.INIT_CREDITS );
	},
	
	/*
	 * defaultAction
	 * @private
	 */
	_defaultAction : function() {
		this._displayPage( PF.Events.INIT_HOME );
	},
	
	/*
	 * display Page
	 * @private
	 */
	_displayPage : function ( callbackEvent, slug ) {
		
		if ( !this.isInit ) this._init();
		
		if ( this.currentView ) {
			this.currentView.hide( callbackEvent );
		} else {
			PF.EventManager.trigger( callbackEvent, [ slug ] );
		}
	},
	
	/*
	 * init app
	 * @private
	 */
	_init : function() {
		this.isInit = true;
		
		$("html").removeClass("no-js");
		this._initEventHandlers();
		this._initExternals();
		
		this.nav = new PF.View.Nav();
	},
	
	/*
	 * init event handler
	 * @private
	 */
	_initEventHandlers : function() {
		
		this.eventHandlers[PF.Events.INIT_HOME] = this._initHome;
		this.eventHandlers[PF.Events.INIT_ABOUT] = this._initAbout;
		this.eventHandlers[PF.Events.INIT_WORK] = this._initWork;
		this.eventHandlers[PF.Events.INIT_WORK_DETAIL] = this._initWorkDetail;
		this.eventHandlers[PF.Events.INIT_STUFFS] = this._initStuffs;
		this.eventHandlers[PF.Events.INIT_LINKS] = this._initLinks;
		this.eventHandlers[PF.Events.INIT_CREDITS] = this._initCredits;
		
		PF.EventManager.bind(this.eventHandlers);
	},
	
	/*
	 * init external links
	 * @private
	 */
	_initExternals : function(){
		$('a[rel="external"]').live("click", function(e){
			e.preventDefault();
			window.open( $(this).attr('href') , "_blank" );
		});
	},
	
	/********
	 * EVENT HANDLERS
	 */
		
	_initHome : function() {
		
		var self = PF.AppRouter;
		
		if ( self.homeView == null ) self.homeView = new PF.View.Home();
		self.homeView.render();
		self.currentView = self.homeView;
		self.nav.hide();
		
	},
	
	_initAbout : function() {
		
		var self = PF.AppRouter;
		
		if ( self.aboutView == null ) self.aboutView = new PF.View.About();
		self.aboutView.render();
		self.currentView = self.aboutView;
		self.nav.render("about");
		
	},
	
	_initWork : function() {
		
		var self = PF.AppRouter;
		
		if ( self.workView == null ) self.workView = new PF.View.Work();
		self.workView.render();
		self.currentView = self.workView;
		self.nav.render("work");
		
	},
	
	_initStuffs : function( e, slug ) {
		
		var self = PF.AppRouter;
		
		if ( self.stuffsView == null ) self.stuffsView = new PF.View.Stuffs();
		self.stuffsView.render(slug);
		self.currentView = self.stuffsView;
		self.nav.render("stuffs");
		
	},

	_initLinks : function() {

		var self = PF.AppRouter;

		if ( self.linksView == null ) self.linksView = new PF.View.Links();
		self.linksView.render();
		self.currentView = self.linksView;
		self.nav.render("links");

	}
	
});