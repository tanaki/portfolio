<?php 
	$page = "about"; 
	include("../_includes/header.php"); 
?>
	<nav>
		<a class="selected" href="/about" id="about"><span>About</span></a>
		<a class="first" href="/work" id="work"><span>Work</span></a>
		<a class="second" href="/lifestream" id="lifestream"><span>Lifestream</span></a>
		<a class="third" href="/links" id="links"><span>Links</span></a>
	</nav>
	
	<div id="page">
		<ul class="breadcrumb">
			<li class="link"><a href="/">Nicolas Pigelet</a> / </li>
			<li class="current">About</li>
		</ul>
		<div class="content">
			<p>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore 
				et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
				aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum 
				dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
				deserunt mollit anim id est laborum.<br/><br/>
				Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
				Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
				Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</p>
			<a class="cv" href="/data/CV_EN_NicolasPigelet.pdf">
				<span>CV</span>
			</a>
		</div>
	</div>	
<?php include("../_includes/footer.php"); ?>