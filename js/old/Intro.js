var Intro = {
	
	init : function () {
		
		var self = this;
		$("#pull")
			.hover(
				self.displayPull, 
				self.displayName
			)
			.click(function(e){
				e.preventDefault();
			})
			.draggable({
				revert: "invalid",
				scroll: false,
				stop : self.displayName
			});
			
		$("#drop-area").droppable({
			drop : function(){
				
				siteStatus = "menu";
				
				$("#pull")
					.addClass("menu-displayed")
					.fadeOut(400, function(){
						$("#drop-area").remove();
						$(this).remove()
					});
				
				$("#menu").addClass("visible");
				$(window).trigger("MENU_READY");
			}
		});
	},
	
	displayPull : function () {
		$(this).text("Pull");
	},

	displayName : function () {
		$("#pull")
			.text("Nicolas Pigelet")
			.css({
				"top" : "",
				"left" : ""
			});
	}
}
