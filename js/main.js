$(document).ready(function(){
	
	$("#pull")
		.hover(
			displayPull, 
			function(){
				if ( !$("#pull").hasClass("ui-draggable-dragging") ) 
					displayName();
			}
		)
		.click(function(e){
			e.preventDefault();
		})
		.draggable({
			revert: "invalid",
			scroll: false,
			stop : displayName
		});
		
	$("#drop-area").droppable({
		drop : function(){
			
			siteStatus = "menu";
			
			$("#pull")
				//.draggable("disable")
				.animate({
					"left" : Math.round($(window).width() / 3),
					"top" : Math.round($(window).height() / 2)
				}, function(){
					
					$(this)
						.draggable("destroy")
						.html("<span>Nicolas Pigelet</span>")
						.css({
							"left" : "33.3%",
							"top" : "50%"
						})
						.unbind()
						.mouseenter(function(){
							siteStatus = "menu";
							toggleMenu(this);
						});
				})
			
		}
	});
});

$(window).bind({
	"MENU_READY" : function(){
		
		$("#menu a:not(#pull)")
			.show()
			.mouseenter( 
				function(){
					window.siteStatus = "menu_selected";
					toggleMenu(this);
				}
			);
		
		// scale all icon to .25
		$(".icon").scale(0.25);
		
		// Apparition footer
		$("#footer li").each(function(i, el){
			$(el).fadeIn(i * 300);
		});
	}
});

function toggleMenu (target){
	
	var $this = $(target);
	if ( $this.hasClass("menu-current") ) return;
	
	$("span", target)
		.stop()
		.fadeIn(200);
		
	$(".menu-current span")
		.stop()
		.fadeOut(200);
	
	$( "#" + $(".menu-current").attr("id") + "-icon" )
		.animate({
			"scale" : "0.25"
		}, 200, function(){ $(this).hide() });
	
	$( "#" + $(target).attr("id") + "-icon" )
		.show()
		.animate({
			"scale" : "1"
		}, 300);
		
	$(".menu-current").removeClass("menu-current");
	$this.addClass("menu-current");
}

function displayPull() {
	$(this).text("Pull");
}

function displayName() {
	$("#pull")
		.text("Nicolas Pigelet")
		.css({
			"top" : "",
			"left" : ""
		});
}