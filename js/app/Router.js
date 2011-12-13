
PF.Router = Backbone.Router.extend({
	
	currentView : null,
	isInit : false,
	eventHandlers : {},
	
	routes : {
		"about" : "_aboutAction",
		"work" : "_workAction",
		"work/:slug" : "_workDetailAction",
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
	_workDetailAction : function() {
		this._displayPage( PF.Events.INIT_WORK_DETAIL );
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
		this._displayPage( PF.Events.APP_READY );
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
		this._initNav();
		this._initExternals();
	},
	
	/*
	 * init event handler
	 * @private
	 */
	_initEventHandlers : function() {
		
		this.eventHandlers[PF.Events.APP_READY] = this._appReady;
		
		this.eventHandlers[PF.Events.INIT_ABOUT] = this._initAbout;
		this.eventHandlers[PF.Events.INIT_WORK] = this._initWork;
		this.eventHandlers[PF.Events.INIT_WORK_DETAIL] = this._initWorkDetail;
		this.eventHandlers[PF.Events.INIT_STUFFS] = this._initStuffs;
		this.eventHandlers[PF.Events.INIT_LINKS] = this._initLinks;
		this.eventHandlers[PF.Events.INIT_CREDITS] = this._initCredits;
		
		this.eventHandlers[PF.Events.SHOW_NAV] = this._showNav;
		this.eventHandlers[PF.Events.HIDE_NAV] = this._hideNav;
		
		PF.EventManager.bind(this.eventHandlers);
	},
	
	/*
	 * init navigation links
	 * @private
	 */
	_initNav : function() {
		$(".nav a").click(function(e){
			e.preventDefault();
			PF.AppRouter.navigate($(this).attr("href"), true);
		});	
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
		
	_appReady : function() {
		
		var homeView = new PF.View.Home();
		homeView.render();
		this.currentView = homeView;
		
	},
	
	_initAbout : function() {
		
		console.log("about");
		var aboutView = new PF.View.About();
		aboutView.render();
		this.currentView = aboutView;
		
	}
	
});