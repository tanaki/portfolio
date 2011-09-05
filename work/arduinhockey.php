<?php 
	$page = "work"; 
	include("../_includes/header.php"); 
?>
	<nav>
		<a class="first" href="/about" id="about"><span>About</span></a>
		<a class="selected" href="/work" id="work"><span>Work</span></a>
		<a class="second" href="/lifestream" id="lifestream"><span>Lifestream</span></a>
		<a class="third" href="/links" id="links"><span>Links</span></a>
	</nav>
	
	<div id="page">
		<ul class="breadcrumb">
			<li class="link"><a href="/">Nicolas Pigelet</a> / </li>
			<li class="link"><a href="/work">Work</a> / </li>
			<li class="current">Arduin'Hockey</li>
		</ul>
		<div class="content">
		</div>
	</div>
	
	<div id="raphael"></div>
	<script type="text/javascript" src="/js/lib/raphael-min.js"></script>
	<script type="text/javascript">
		
		var paper = Raphael("raphael", "100%", "100%");
		
		$("#raphael").click(function(e){
			
			//$("#main-canvas").addClass("background");
			
			var 
				x = e.offsetX,
				y = e.offsetY,
				width = $("#raphael").width(),
				height = $("#raphael").height(),
				halfW = Math.round(width / 2),
				halfH = Math.round(height / 2),
				quartW = Math.round(halfW / 2),
				quartH = Math.round(halfH / 2),
				easing = ">";
			
			var background = paper.path("M"+ x +","+ y +"L"+ x +","+ y +"L"+ x +","+ y +"L"+ x +","+ y +"L"+ x +","+ y);
			
			background
				.attr({
					"fill" : "#fff",
					"stroke" : "none"
				})
				.animate({
					path : "M0,0L"+ (halfW + quartW) +","+ quartH +"L"+ (halfW + quartW) +","+ (halfH + quartH) +"L"+ quartW +","+ (halfH + quartH) +"L0,0"
				}, 600, easing);
			
			setTimeout(function() {
				background.animate({
					path : "M0,0L"+ (halfW + quartW) +","+ quartH +"L"+ (halfW + quartW) +","+ (halfH + quartH) +"L0,"+ height +"L0,0"
				}, 600, easing);
			}, 200);
			
			setTimeout(function() {
				background.animate({
					path : "M0,0L"+ width +",0L"+ (halfW + quartW) +","+ (halfH + quartH) +"L0,"+ height +"L0,0"
				}, 600, easing);
			}, 450);
			
			setTimeout(function() {
				background.animate({
					path : "M0,0L"+ width +",0L"+ width +","+ height +"L0,"+ height +"L0,0"
				}, 600, easing);
			}, 600);
			
			setTimeout(function() {
				console.log("Hide RAPHAEL / SHOW BLOCK");
			}, 1000);
		});
		
	</script>
	<style type="text/css">
		#raphael {
			position:absolute;
			z-index:10;
			top:2%;
			left:1%;
			
			width:98%;
			height:96%;
		}
	</style>
<?php include("../_includes/footer.php"); ?>