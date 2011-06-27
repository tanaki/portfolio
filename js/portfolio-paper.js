
var circle = new Path.Circle(new Point(0, 0), 3);
circle.fillColor = '#333';

// About
var about = new Symbol(circle);
//about.place( new Point( view.size.width - Math.round(view.size.width / 10), Math.round(view.size.height / 2) + 5 ) );
about.place(new Point( $("#pull").position().left + $("#pull").width() + 10, $("#pull").position().top + 10 ));


// Lifestream
var lifestream = new Symbol(circle);
lifestream.place( new Point( view.size.width - Math.round(view.size.width / 20), 0 ) );

// Links
var links = new Symbol(circle);
links.place( new Point( view.size.width, Math.round(view.size.height / 2) + 5 ) );

// Work
var work = new Symbol(circle);
work.place( new Point( view.size.width - Math.round(view.size.width / 20), view.size.height ) );

function onFrame(event) {
	var aboutCircle = project.activeLayer.children[0];
	var lifestreamCircle = project.activeLayer.children[1];
	var linksCircle = project.activeLayer.children[2];
	var workCircle = project.activeLayer.children[3];
	
	aboutCircle.position.x = $("#pull").position().left + $("#pull").width() + 10;
	aboutCircle.position.y = $("#pull").position().top + 10;
	
	// TODO Continue
}