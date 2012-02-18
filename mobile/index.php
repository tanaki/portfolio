<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Nicolas Pigelet - Portfolio - Multimedia Developer</title>
		
		<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
		<link rel="icon" type="image/png" href="favicon.png" />
		<link rel="stylesheet" href="/css/mobile/base.css" />
		<link rel="stylesheet" href="/css/mobile/layout.css" />
		
		<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.js"></script>
		<script type="text/javascript" src="/js/app/mobile/Mobile.js"></script>
		
	</head>
	<body>
		
		<h1>
			<span class="main">Portfolio</span>
			<span class="name">Nicolas&nbsp;Pigelet - Multimedia&nbsp;Developer</span>
		</h1>
		<p class="about">
		<?php
			$string_about = file_get_contents("../data/about.json");
			$json_about = json_decode($string_about,true);
			
			foreach ($json_about as $key => $about ) {
				if ( $key == "about-mobile" ) echo $about;
			}
		?>
		</p>
		<h2>
			Contact
		</h2>
		<ul class="contact">
			<li>Mail : <a href="mailto:nico@nicolaspigelet.com">nico@nicolaspigelet.com</a></li>
			<li>Phone : <a href="tel:07856266731">+44 785 62 66 731</a></li>
			<li><a href="http://www.linkedin.com/in/nicolaspigelet/en" target="_blank">LinkedIn</a></li>
		</ul>
		<h2>
			Works
		</h2>
		<ul class="works">
			<?php
				$string_works = file_get_contents("../data/works.json");
				$json_works = json_decode($string_works,true);

				for ( $i = count($json_works["projects"]) - 1; $i >= 0; $i--  ) {
					$project = $json_works["projects"][$i];
					echo "<li>";
					echo '<span class="title">' . $project["title"] . '</span>';
					
					
					$videoType = ( isset($project["slides"][0]["videoType"]) ) ? $project["slides"][0]["videoType"] : false;
					if ($videoType) {
						if ( $videoType == "vimeo" ) {
							echo '<a class="video" target="_blank" href="http://vimeo.com/' . $project["slides"][0]["src"] . '">';
						}
						if ( $videoType == "youtube" ) {
							echo '<a class="video" target="_blank" href="http://youtube.com/watch?v=' . $project["slides"][0]["src"] . '">';
						}
						echo '<span class="play_btn"></span>';
					}
					$image = ($project["slides"][0]["type"] == "image" ) ? $project["slides"][0]["src"] : $project["slides"][1]["src"] ;
					echo '<span class="detail" style="background-color:#'. $project["color"] .';">';
					echo '<img src="/img/work/projects/' . $project["slug"] . '/' . $image . '" alt="' . $project["title"] . '" />';
					echo '</span>';
					if ($videoType) {
						echo '</a>';
					}
					echo '<span class="description">' . $project["text"] . '</span>';
					
						
					
					echo "</li>";
				}
			?>
		</ul>
		<div class="footer">
			More information on the desktop version of the website.<br/>
			Credits : <a href="mailto:nico@nicolaspigelet.com">Nicolas Pigelet</a> - Design by : <a href="http://frederikdelmotte.be">Frederik Delmotte</a>
		</div>
		
		<script type="text/javascript">

		  var _gaq = _gaq || [];
		  _gaq.push(['_setAccount', 'UA-3568983-3']);
		  _gaq.push(['_setDomainName', 'nicolaspigelet.com']);
		  _gaq.push(['_trackPageview']);

		  (function() {
			var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
			ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
			var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
		  })();

		</script>
	</body>
</html>