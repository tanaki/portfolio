<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Nicolas Pigelet - Portfolio - Multimedia Developer</title>
		
		<link rel="icon" type="image/png" href="favicon.png" />
		<link rel="stylesheet" href="/css/screen.css" />
		<link rel="stylesheet" href="/css/transitions.css" />
		
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js"></script>
		
		<!--?php if ( preg_match( "/localhost/", $_SERVER["SERVER_NAME"] ) ) { ?-->
			<script type="text/javascript" src="/js/lib/underscore-1.2.2.js"></script>
			<script type="text/javascript" src="/js/lib/backbone.js"></script>
			<script type="text/javascript" src="/js/lib/raphael-full.js"></script>

			<script type="text/javascript" src="/js/lib/jquery.loadTemplate.js"></script>
			<script type="text/javascript" src="/js/lib/jquery.shuffle.js"></script>
			<script type="text/javascript" src="/js/lib/utils/Strings.js"></script>

			<script type="text/javascript" src="/js/Portfolio.js"></script>
			<script type="text/javascript" src="/js/app/Router.js"></script>
			<script type="text/javascript" src="/js/app/Background.js"></script>

			<script type="text/javascript" src="/js/app/models/Link.js"></script>
			<script type="text/javascript" src="/js/app/models/Stuff.js"></script>
			<script type="text/javascript" src="/js/app/models/Work.js"></script>

			<script type="text/javascript" src="/js/app/collections/LinksCollection.js"></script>
			<script type="text/javascript" src="/js/app/collections/StuffsCollection.js"></script>
			<script type="text/javascript" src="/js/app/collections/WorksCollection.js"></script>

			<script type="text/javascript" src="/js/app/views/About.js"></script>
			<script type="text/javascript" src="/js/app/views/Credits.js"></script>
			<script type="text/javascript" src="/js/app/views/Home.js"></script>
			<script type="text/javascript" src="/js/app/views/Links.js"></script>
			<script type="text/javascript" src="/js/app/views/Nav.js"></script>
			<script type="text/javascript" src="/js/app/views/Stuffs.js"></script>
			<script type="text/javascript" src="/js/app/views/Work.js"></script>
			<script type="text/javascript" src="/js/app/views/WorkDetail.js"></script>
		<!-- ?php } else { ?>
			<script type="text/javascript" src="/js/lib/libs.min.js"></script>
			<script type="text/javascript" src="/js/portfolio.min.js"></script-->
		<!-- ?php } ? -->

	</head>
	<body>
		
		<div id="background"></div>
		<div id="main-canvas"></div>
		
		<div id="wrapper">
			<nav class="hidden">
				<a href="/work" id="work" class="first">
					<span>Work</span>
				</a>
				<a href="/about" id="about" class="selected">
					<span>About</span>
				</a>
				<a href="/stuffs" id="stuffs" class="second">
					<span>Stuffs</span>
				</a>
				<a href="/links" id="links" class="third">
					<span>Links</span>
				</a>
			</nav>
			<div id="page">
				<ul class="breadcrumb hidden">
					<li class="link link-first"><a href="/">Nicolas Pigelet</a> / </li>
					<li class="current transition"></li>
				</ul>
				<div class="content">
					<span class="content-loading">Loading...</span>
				</div>
				<div id="detail-container">
					<div id="detail-background"></div>
					<div id="detail">Loading Details...</div>
				</div>
			</div>
			<footer class="hidden">
				<ul>
					<li><a href="mailto:nico@nicolaspigelet.com" rel="external">Contact</a>&nbsp;|&nbsp;</li>
					<li><a href="http://www.linkedin.com/in/nicolaspigelet/en" rel="external">LinkedIn</a>&nbsp;|&nbsp;</li>
					<li><a href="http://github.com/tanaki" rel="external">Github</a>&nbsp;|&nbsp;</li>
					<li><a href="/credits">Credits</a></li>
				</ul>
			</footer>
		</div>
		
	</body>
</html>