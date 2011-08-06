var Menu = {
	
	init : function(){
		
		var self = this,
			defaultText = $(".breadcrumb .current").text();
		$("nav a:not(.selected)").hover(
			function(){
				var text = $("span", this).text();
				self._shuffle(".breadcrumb .current", text);
			},
			function(){
				self._shuffle(".breadcrumb .current", defaultText);
			}
		);
		
	},
	
	_shuffle : function(target, str){
		
		var progress = str.length - 2;
		var timer = setInterval(function() {
			$(target).text(str.substring(0, progress++));
			if (progress > str.length) clearInterval(timer);
		}, 80);
		
	},
	
	otherFunction : function( page ) {
		
		$.address.value(page);
		
		$("#menu").addClass("page-" + page.split("/")[1]);
		$("#menu a").unbind("mouseenter");
		
	}
	
}