var Menu = {
	
	init : function(){
		
		var self = this,
			defaultText = $(".breadcrumb .current").text();
		$("nav a:not(.selected)").hover(
			function(){
				
				if ( $(".breadcrumb .link").length > 1 )
					$(".breadcrumb .link:last").hide(200);
				
				var text = $("span", this).text();
				self._shuffleLetters(".breadcrumb .current", text);
			},
			function(){
			
				if ( $(".breadcrumb .link").length > 1 )
					$(".breadcrumb .link:last").show(200);
				
				self._shuffleLetters(".breadcrumb .current", defaultText);
			}
		);
		
	},
	
	_shuffleLetters : function(target, str){
		
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