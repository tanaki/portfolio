$(document).ready(function(){
	
	Controller.init();
	Intro.init();
	Stuffs.init();
	
});

$(window).bind({
	"MENU_READY" : function(){
		
		$("#menu a:first").addClass();
		toggleMenu( $("#menu a:first") );
		
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
		.stop(true, true)
		.fadeIn(200)
		.css("display", "block");
		
	$(".menu-current span")
		.stop(true, true)
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
