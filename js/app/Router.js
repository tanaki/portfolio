
PF.Router = Backbone.Router.extend({
	
	currentView : null,
	isInit : false,
	nav : null,
	eventHandlers : {},
	
	homeView : null,
	aboutView : null,
	workView : null,
	workDetailView : null,
	stuffsView : null,
	linksView : null,
	creditsView : null,
	
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
		
		if ( this.currentView !== null && this.currentView === this.workView ) this._displayPage( PF.Events.INIT_WORK_DETAIL, slug );
		else this._displayPage( PF.Events.INIT_WORK, slug );
		
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
	 * credits Action
	 * @private
	 */
	_creditsAction : function() {
		this._initCredits();
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
		if ( this.currentView == this.creditsView ) console.log("hide credits");
		
		if ( this.currentView && callbackEvent !== PF.Events.INIT_WORK_DETAIL ) {
			this.currentView.hide( callbackEvent );
		} else {
			var data = callbackEvent == PF.Events.INIT_WORK_DETAIL ? this.workView.collection : null;
			PF.EventManager.trigger( callbackEvent, [ slug, data ] );
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
		this._initAnchorTags();
		
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
		
		PF.EventManager.bind(this.eventHandlers);
	},
	
	/*
	 * init external/internal links
	 * @private
	 */
	_initAnchorTags : function(){
		
		$('a[rel="external"]').live("click", function(e){
			e.preventDefault();
			window.open( $(this).attr('href') , "_blank" );
		});
		
		$('a[rel="internal"]').live("click", function(e){
			e.preventDefault();
			PF.AppRouter.navigate($(this).attr('href'), true);
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
	
	_initWork : function( e, slug ) {
		
		var self = PF.AppRouter;
		
		if ( self.workView == null ) self.workView = new PF.View.Work();
		self.workView.render( slug );
		self.currentView = self.workView;
		self.nav.render("work");
		
	},
	
	_initWorkDetail : function( e, slug, collection ){
		
		var self = PF.AppRouter;
		
		if ( self.workDetailView == null ) self.workDetailView = new PF.View.WorkDetail();
		self.workDetailView.render(slug, collection);
		self.currentView = self.workDetailView;
		
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

	},
	
	_initCredits : function(){
		
		console.log("show credits");
		
	}
	
});