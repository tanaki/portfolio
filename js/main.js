$(document).ready(function(){
	/*
	switch ( $.address.value() ) {
		case "/menu" : 
			initMenu();
		break;
		default:
			initIntro();
		break;
	}
	*/
	initIntro();
	
});

$(window).bind({
	"MENU_READY" : function(){
		
		$("#menu a")
			.show()
			.mouseenter(function(){
				window.siteStatus = "menu_selected";
				toggleMenu(this);
			})
			.click(function(e){
				e.preventDefault();
				window.siteStatus = "page";
				Menu.init($(this).attr('href'));
			});
		
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

function initIntro () {

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
				}, initMenu)
			
		}
	});
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

function initMenu(){
	
	$(window).trigger("MENU_READY");
	
	window.siteStatus = "menu_ready";
	$.address.value("/menu");
	
	$("#pull")
		.draggable("destroy")
		.html("<span>About</span>")
		.addClass("menu-displayed")
		.css({
			"top" : "",
			"left" : "",
			"-webkit-transition-property" : ""
		})
		.unbind()
		.mouseenter(function(){
			siteStatus = "menu";
			toggleMenu(this);
		});
}
