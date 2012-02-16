<!doctype html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Nicolas Pigelet - Portfolio - Multimedia Developer</title>
		
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
					echo '<span class="color" style="background:#' . $project["color"] . '";></span>';
					echo '<span class="title">' . $project["title"] . '</span>';
					
					$image = ($project["slides"][0]["type"] == "image" ) ? $project["slides"][0]["src"] : $project["slides"][1]["src"] ;
					echo '<span class="detail"><img src="/img/work/projects/' . $project["slug"] . '/' . $image . '" alt="' . $project["title"] . '" /></span>';
					echo '<span class="description">' . $project["text"] . '</span>';
					
					$videoType = ( isset($project["slides"][0]["videoType"]) ) ? $project["slides"][0]["videoType"] : false;
					if ($videoType) {
						if ( $videoType == "vimeo" ) {
							echo '<a class="video" target="_blank" href="http://vimeo.com/' . $project["slides"][0]["src"] . '">Watch video</a>';
						}
						if ( $videoType == "youtube" ) {
							echo '<a class="video" target="_blank" href="http://youtube.com/watch?v=' . $project["slides"][0]["src"] . '">Watch video</a>';
						}
					}
					
					echo "</li>";
				}
			?>
		</ul>
		<div class="footer">
			More information on the desktop version of the website.<br/>
			Credits : <a href="mailto:nico@nicolaspigelet.com">Nicolas Pigelet</a> - Design by : <a href="http://frederikdelmotte.be">Frederik Delmotte</a>
		</div>
		
	</body>
</html>