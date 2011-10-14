var Work = {
	
	init : function(){
	
		this._initLinks();
		
	},
	
	_initLinks : function () {
		
		var 
			self = this,
			aLeft = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95],
			aTop = [10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95];
		
		aLeft = $.shuffle(aLeft);
		aTop = $.shuffle(aTop);
		
		$(".list-works a").each(function(i, a){
			$(a)
				.css({
					"position" : "absolute",
					"left" : (i * 10) + "%",
					"top" : "40%"
				})
				.animate({
					"left" : aLeft[i] + "%",
					"top" : aTop[i] + "%"
				}, 600)
				.hover(
					function(){
						
						$(".breadcrumb .current:first")
							.removeClass("current")
							.addClass("link")
							
						setTimeout(function(){
							$(".breadcrumb .link:last").css("font-family", "Copy0855");
						}, 190);
						
						$("<span> / </span>")
							.appendTo($(".breadcrumb .link:last"));
							
						$('<li class="current">' + ($(this).text()).substring(0, 2) + '</li>')
							.appendTo( $(".breadcrumb") )
							.fadeIn(400);
							
						self._shuffleLetters( $(".breadcrumb .current:last"), $(this).text() );
					},
					function(){
						
						$(".breadcrumb .current:last")
							.fadeOut(200);
						
						$(".breadcrumb .link:last")
							.removeClass("link")
							.addClass("current")
							.css("font-family", "");
						
						$(".breadcrumb .current:first span")
							.remove();
							
					}
				);
				
		});
		
	},
	
	_shuffleLetters : function(target, str){
		
		var progress = str.length - 2;
		var timer = setInterval(function() {
			$(target).text(str.substring(0, progress++));
			if (progress > str.length) clearInterval(timer);
		}, 80);
		
	}
	
}