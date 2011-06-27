$(document).ready(function(){
	$("#pull")
		.click(function(e){
			e.preventDefault();
		})
		.draggable({
			revert: "invalid",
			scroll: false
		});
	$("#drop-area").droppable({
		drop : function(){
			$("#pull").draggable("disable");
		}
	});
});

$(window).bind({
	
});

