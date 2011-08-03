var Stuffs = {
	init : function(){
		this.initExternalLinks();
	},
	
	initExternalLinks : function () {
		console.log($("a[rel=external]"));
		$("a[rel=external]").click( function(e) {
			e.preventDefault();
			window.open( $(element).attr('href') , "_blank" );
		});
	}
}