window.siteStatus = "intro";

// Shape
var shape = new Path();
shape.fillColor = "#161616";

// Lines
var rectangle = new Path();
rectangle.strokeColor = '#444';

// base circle
var circle = new Path.Circle(new Point(0, 0), 3);
circle.fillColor = '#666';

var offsetWidth = Math.round(view.size.width * .02);
var offsetHeight = Math.round(view.size.height * .2);

// About
var about = new Symbol(circle);
var aboutX = $("#pull").position().left + $("#pull").width() + 30;
var aboutY = $("#pull").position().top + 10;
var aboutPoint = new Point( aboutX, aboutY );

// Lifestream
var lifestream = new Symbol(circle);
var lifestreamPoint = new Point( view.size.width - offsetWidth, - offsetHeight );

// Links
var links = new Symbol(circle);
var linksPoint = new Point( view.size.width + offsetWidth, Math.round(view.size.height / 2) + 5 );

// Work
var work = new Symbol(circle);
var workPoint = new Point( view.size.width - offsetWidth, view.size.height + offsetHeight );

about.place( aboutPoint );
lifestream.place( lifestreamPoint );
links.place( linksPoint );
work.place( workPoint );

function onFrame(event) {
	
	switch( siteStatus ) {
		case "intro" : 
			onFrameIntro();
		break;
		case "menu" : 
		case "menu_ready" :
		case "menu_selected" :
			onFrameMenu();
		break;
		case "page" :

			var aboutCircle = project.activeLayer.children[2];
			var lifestreamCircle = project.activeLayer.children[3];
			var linksCircle = project.activeLayer.children[4];
			var workCircle = project.activeLayer.children[5];
			
			if ( aboutCircle && lifestreamCircle && linksCircle && workCircle ) {
				aboutCircle.remove();
				lifestreamCircle.remove();
				linksCircle.remove();
				workCircle.remove();
			}
			
			rectangle.removeSegments();
			shape.removeSegments();
		break;
	}
}

function onFrameIntro () {
	var aboutCircle = project.activeLayer.children[2];
	var lifestreamCircle = project.activeLayer.children[3];
	var linksCircle = project.activeLayer.children[4];
	var workCircle = project.activeLayer.children[5];
	
	aboutX = $("#pull").position().left + $("#pull").width() + 30;
	aboutY = $("#pull").position().top + 10;
	aboutPoint = new Point( aboutX, aboutY );
	aboutCircle.position = aboutPoint;
	
	var offset = Math.round( (view.size.width - aboutX) / 5 );
	
	var lfX = view.size.width - offsetWidth - offset;
	var lfY = - offsetHeight;
	lifestreamPoint = new Point( lfX, lfY );
	
	var workX = view.size.width - offsetWidth - offset;
	var workY = view.size.height + offsetHeight;
	workPoint = new Point( workX, workY );
	
	var linksX = view.size.width + offsetWidth;
	var linksY = Math.round(view.size.height / 2) + 5;
	linksPoint = new Point( linksX, linksY );
	
	rectangle.removeSegments();
	rectangle.add( aboutPoint, lifestreamPoint, linksPoint, workPoint );
	rectangle.closed = true;
	
	shape.removeSegments();
	shape.add( 
		aboutPoint + new Point(offset, 0), 
		new Point( lifestreamPoint.x - Math.abs((lifestreamPoint.x - aboutPoint.x) / 2), lifestreamPoint.y + Math.abs((lifestreamPoint.y - aboutPoint.y) / 2) ),
		lifestreamPoint + new Point(0, offset), 
		new Point( linksPoint.x - Math.abs((lifestreamPoint.x - linksPoint.x) / 2), linksPoint.y - Math.abs((lifestreamPoint.y - linksPoint.y) / 2) ),
		linksPoint - new Point(offset * .3, 0),
		new Point( workPoint.x + Math.abs((workPoint.x - linksPoint.x) / 2), workPoint.y - Math.abs((workPoint.y - linksPoint.y) / 2) ),
		workPoint - new Point(0, offset),
		new Point( aboutPoint.x + Math.abs((workPoint.x - aboutPoint.x) / 2), aboutPoint.y + Math.abs((workPoint.y - aboutPoint.y) / 2) )
	);
	shape.closed = true;
	shape.smooth();
}

var i = 0;
function onFrameMenu() {
	
	i += 2;
	
	var aboutCircle = project.activeLayer.children[2];
	var lifestreamCircle = project.activeLayer.children[3];
	var linksCircle = project.activeLayer.children[4];
	var workCircle = project.activeLayer.children[5];
	
	aboutX = $("#pull").position().left + $("#pull").width() + 30;
	aboutY = $("#pull").position().top + 10;
	aboutPoint = new Point( aboutX, aboutY );
	aboutCircle.position = aboutPoint;
	
	var prevLfX = lifestreamCircle.position.x - i;
	var prevLfY = lifestreamCircle.position.y + i;
	var lfX = aboutX + 70;
	var lfY = aboutY - 140;
	lifestreamPoint = new Point( (prevLfX > lfX ? prevLfX : lfX), (prevLfY < lfY ? prevLfY : lfY) );
	lifestreamCircle.position = lifestreamPoint;
	
	var prevWX = workCircle.position.x - i;
	var prevWY = workCircle.position.y - i;
	var workX = aboutX + 140;
	var workY = aboutY + 70;
	workPoint = new Point( (prevWX > workX ? prevWX : workX), (prevWY > workY ? prevWY : workY) );
	workCircle.position = workPoint;
	
	var prevLiX = linksCircle.position.x - i;
	var prevLiY = linksCircle.position.y - i;
	var linksX = aboutX + 210;
	var linksY = aboutY - 65;
	linksPoint = new Point( (prevLiX > linksX ? prevLiX : linksX), (prevLiY > linksY ? prevLiY : linksY) );
	linksCircle.position = linksPoint;
	
	rectangle.removeSegments();
	if ( window.siteStatus != "menu_selected" ) {
		rectangle.add( aboutPoint, lifestreamPoint, linksPoint, workPoint );
		rectangle.closed = true;
	}
	
	shape.removeSegments();
	var offset = 35;
	var offsetMidPoint = 5;
	shape.add( 
		aboutPoint + new Point(offset, 0), 
		// new Point( lifestreamPoint.x - Math.abs((lifestreamPoint.x - aboutPoint.x) / 2) + offsetMidPoint, lifestreamPoint.y + Math.abs((lifestreamPoint.y - aboutPoint.y) / 2) + offsetMidPoint ),
		lifestreamPoint + new Point(0, offset), 
		// new Point( linksPoint.x - Math.abs((lifestreamPoint.x - linksPoint.x) / 2) + offsetMidPoint, linksPoint.y - Math.abs((lifestreamPoint.y - linksPoint.y) / 2) + offsetMidPoint ),
		linksPoint - new Point(offset, 0),
		// new Point( workPoint.x + Math.abs((workPoint.x - linksPoint.x) / 2) - offsetMidPoint, workPoint.y - Math.abs((workPoint.y - linksPoint.y) / 2) - offsetMidPoint ),
		workPoint - new Point(0, offset)
		// new Point( aboutPoint.x + Math.abs((workPoint.x - aboutPoint.x) / 2) - offsetMidPoint, aboutPoint.y + Math.abs((workPoint.y - aboutPoint.y) / 2) - offsetMidPoint )
	);
	shape.closed = true;
	shape.smooth();
	
	if (
		prevLfX < lfX 
		&& prevLfY > lfY
		&& prevWX < workX
		&& prevWY < workY
		&& prevLiX < linksX
		&& prevLiY < linksY
		&& (window.siteStatus != "menu_ready" && window.siteStatus != "menu_selected" )
	) {
		$(window).trigger("MENU_READY");
		window.siteStatus = "menu_ready";
	}
}
