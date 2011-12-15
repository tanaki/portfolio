/**
 * 
 * Portfolio Nicolas Pigelet -> Router
 * @author nico@nicolaspigelet.com
 */

// Create Namespace
var PF = window.PF || {};

/* EVENT MANAGER */
PF.EventManager = PF.EventManager || $({});

/* COLLECTIONS */
PF.Collection = PF.Collection || {};

/* MODELS */
PF.Model = PF.Model || {};

/* VIEWS */
PF.View = PF.View || {};

/*
 * EVENTS
 */

PF.Events = {
    APP_READY : "APP_READY",
	
	SHOW_NAV : "SHOW_NAV",
	HIDE_NAV : "HIDE_NAV",
	
	INIT_ABOUT : "INIT_ABOUT",
	INIT_WORK : "INIT_WORK",
	INIT_WORK_DETAIL : "INIT_WORK_DETAIL",
	INIT_STUFFS : "INIT_STUFFS",
	INIT_LINKS : "INIT_LINKS",
	INIT_CREDITS : "INIT_CREDITS"
	
};

$(window).ready(function(){
	
	// start background graphic
	PF.AppBackground = new PF.Background();
	
	// start app
	PF.AppRouter = new PF.Router();
	Backbone.history.start({ pushState : true });
	
});
