<?php 
	$page = "links"; 
	include("../_includes/header.php"); 
?>
	<nav>
		<a class="first" href="/about" id="about"><span>About</span></a>
		<a class="second" href="/work" id="work"><span>Work</span></a>
		<a class="third" href="/lifestream" id="lifestream"><span>Lifestream</span></a>
		<a class="selected" href="/links" id="links"><span>Links</span></a>
	</nav>
	
	<div id="page">
		<ul class="breadcrumb">
			<li class="link"><a href="/">Nicolas Pigelet</a> / </li>
			<li class="current">Links</li>
		</ul>
		<div class="content">
			
			<div class="a-z">
				<a class="link-gobelins selected" href="#">Gobelins</a>
				<ul>
					<li><a href="#">Frederik Delmotte</a></li>
					<li><a href="#">Grgrdvrt</a></li>
					<li><a href="#">James Booth</a></li>
					<li><a href="#">Kenzo Mayama</a></li>
					<li><a href="#">Pete Goodman</a></li>
					<li><a href="#">Philippe Valette</a></li>
					<li><a href="#">Mr Gnou</a></li>
					<li><a href="#">PR4SS</a></li>
					<li><a href="#">S&eacute;rgio Garcez</a></li>
				</ul>
			</div>
			<div class="line"></div>
			<div class="gobelins">
				<a class="link-az" href="#">A-Z</a>
				<ul>
					<li>Yummy Team</li>
					<li><a href="#">Marie Laurent</a></li>
					<li><a href="#">Sylvain Bernardi</a></li>
					<li><a href="#">Muriel Bougherdani</a></li>
					<li class="subtitle">CRMA 2010</li>
					<li><a href="#">Arnaud Tanielian</a></li>
					<li><a href="#">Bertrand Rich&eacute;</a></li>
					<li><a href="#">Faustine Clavert</a></li>
					<li><a href="#">Jocelyn Lecamus</a></li>
					<li><a href="#">S&eacute;bastien Bourdu</a></li>
				</ul>
			</div>
			
		</div>
	</div>
<?php include("../_includes/footer.php"); ?>