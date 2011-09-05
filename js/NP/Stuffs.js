var Stuffs = {

	init : function(){
	
		this.initExternalLinks();
		if ( $(".page-links").length > 0 ) this.initPageLinks();
		
	},
	
	initExternalLinks : function () {
		$("a[rel=external]").click( function(e) {
			e.preventDefault();
			window.open( $(this).attr('href') , "_blank" );
		});
	},
	
	initPageLinks : function(){
		
		var self = this;
		
		$(".link-az").click(function(e){
			e.preventDefault();
			self._toggleLists(this, true);
		});
		
		$(".link-gobelins").click(function(e){
			e.preventDefault();
			self._toggleLists(this, false);
		});
		
	},
	
	_toggleLists : function (target, isAZ) {
	
		if ( $(target).hasClass("selected") ) return;
			
		$(".content .selected").removeClass("selected");
		$(target).addClass("selected");
		
		var marginLeft = isAZ ? "0px" : "-127px";
		$(".container").animate({
			"margin-left" : marginLeft
		});
		
		$(".a-z ul").animate({
			"opacity" : (isAZ ? 1 : 0)
		});
		$(".gobelins ul").animate({
			"opacity" : (isAZ ? 0 : 1)
		});
		
		$(".line").toggleClass("line-toggled");
	}
	
}