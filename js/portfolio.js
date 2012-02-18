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

/* HELPERS */
PF.isiPad = navigator.userAgent.match(/iPad/i) != null;

/*
 * EVENTS
 */

PF.Events = {
	
    INIT_HOME : "INIT_HOME",
	INIT_ABOUT : "INIT_ABOUT",
	INIT_WORK : "INIT_WORK",
	INIT_WORK_DETAIL : "INIT_WORK_DETAIL",
	INIT_STUFFS : "INIT_STUFFS",
	INIT_LINKS : "INIT_LINKS"
	
};

$(window).ready(function(){
	
	if ( $(window).width() < 960 || PF.isiPad ) window.location.href = "/mobile";
	
	// start background graphic
	PF.AppBackground = new PF.Background();
	
	// start app
	PF.AppRouter = new PF.Router();
	Backbone.history.start({ pushState : true });
	
});

$(window).resize(function(){
	if ( $(window).width() < 960 || PF.isiPad ) window.location.href = "/mobile";
});