
/**
 * Generic onReady function called from all pages.
 * Set up your page initialisation code by adding it's ID to the switch statement
 */
$(document).ready(function(){
	
	/*
		Determine which page we are on...
	*/
	
	var html = document.getElementsByTagName( "html" )[0];
	var page = html.getAttribute( "id" );
	
	Logger.debug( "document.ready :: " + page );
	
	var	controller,
		model,
		view,
		dom = {};
	
	switch( page ) {
		
		case "index" : default :
		
			dom.output = $("#output");
			
			model		= new com.nicolaspigelet.portfolio.Model();
			controller	= new com.nicolaspigelet.portfolio.Controller( model );
			view		= new com.nicolaspigelet.portfolio.View( model, controller, dom );
			
			controller.startTimer();
			
		break;
	}
});