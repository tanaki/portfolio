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
			<li class="current transition">Work</li>
		</ul>
		<div class="content">
			<ul class="list-works">
				<li><a href="#">Marie Laurent</a></li>
				<li><a href="#">INQ Mobile</a></li>
				<li><a href="#">My Toblerone</a></li>
				<li><a href="#">Nokia Push</a></li>
				<li><a href="#">Renault</a></li>
				<li><a href="#">Yummy</a></li>
				<li><a href="#">Arduin'Hockey</a></li>
				<li><a href="#">Howbama</a></li>
			</ul>
		</div>
	</div>
<?php include("../_includes/footer.php"); ?>