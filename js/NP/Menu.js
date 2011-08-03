var Menu = {
	
	init : function(page){
		$.address.value(page);
		
		$("#menu").addClass("page-" + page.split("/")[1]);
		$("#menu a").unbind("mouseenter");
	}
	
}