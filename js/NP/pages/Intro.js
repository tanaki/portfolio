/*
* ----------------------------------------------------------------------------
* "THE BEER-WARE LICENSE" :
* <nipigelet@gmail.com> wrote this file. As long as you retain this notice you
* can do whatever you want with this stuff. If we meet some day, and you think
* this stuff is worth it, you can buy me a beer in return Nico P.
* ----------------------------------------------------------------------------
*/
var Intro = function(initOptions){

	/**
	* private var for the Class
	*
	*/
	var
		isMenu = false,
		R = null,

		name = null,
		blob = null,

		bgName = null,
		labelName = null,
		circleName = null,
		offsetCircleX = 80,
		offsetCircleY = 0,
		offsetBgX = -20,
		offsetBgY = -20,

		lineTop = null,
		lineBottom = null,
		circleBlob = null,
		
		ox = 0,
		oy = 0,

	/**
	* The options passed through to this function
	* @var Object
	* @private
	*/
	options = {
		menu : false,
		container : "intro",
		defaultWidth : 1024,
		defaultHeight : 768
	},

	/**
	* init raphael JS
	* @return void
	* @private
	*/
	_initRaphael = function(){
		R = new Raphael(options.container, options.defaultWidth, options.defaultHeight);
		$(window).resize( _resizeRaphael );
		_resizeRaphael();

		_initGraphics();
	},

	/**
	* resize raphael instance
	* @return void
	* @private
	*/
	_resizeRaphael = function() {
		var
			winWidth = $(window).width(),
			winHeight = $(window).height();

		R.setSize( winWidth, winHeight );
		if (name) _resizeName(winWidth, winHeight);
	},

	_resizeName = function(winWidth, winHeight){
		
		var
			labelNameX = Math.round(winWidth * .89),
			labelNameY = Math.round(winHeight * .49),
			path = $.address.pathNames();

		if ( isMenu ) {
			labelNameX = Math.round(winWidth * .33);
		}
		labelName.attr({
			"x" : labelNameX,
			"y" : labelNameY
		});
		circleName.attr({
			"cx" : labelNameX + offsetCircleX,
			"cy" : labelNameY + offsetCircleY
		});
		bgName.attr({
			"x" : labelNameX + offsetBgX,
			"y" : labelNameY + offsetBgY
		});

	},

	/**
	* init intro graphics
	* @return void
	* @private
	*/
	_initGraphics = function(){
		blob = R.set();
		name = R.set();

		bgName = R.rect(960, 280, 100, 40);
		bgName.attr({
			"stroke-width" : 0,
			"stroke-opacity" : 0,
			"cursor": "pointer"
		});
		bgName
			.mouseover(_displayPull)
			.mouseout(_displayName);
		name.push(bgName);

		// create label name
		labelName = R.text(980, 300, "Nicolas Pigelet");
		labelName.attr({
			"fill": "#fff",
			"font-family": "Copy0855",
			"font-size": 8,
			"cursor": "pointer",
			"text-anchor": "start"
		});
		name.push(labelName);

		// create circle name/about
		circleName = R.circle(1000, 300, 5);
		circleName.attr({
			"stroke-width" : "0",
			"stroke-opacity" : "0",
			"fill" : "#ddd"
		});
		name.push(circleName);
			
		name.drag(_handleMove, _handleStart, _handleStop);
		_resizeRaphael();

		_drawLines();
		_drawBlob();
	},

	_displayPull = function(){
		labelName.attr("text", "Pull");
	},

	_displayName = function(){
		labelName.attr("text", "Nicolas Pigelet");
	},

	/**
	* handle drag move
	* @return void
	* @private
	*/
	_handleMove = function(dx, dy){
		labelName.attr({
			"x": ox + dx,
			"y": oy + dy
		});
		circleName.attr({
			"cx": ox + dx + offsetCircleX,
			"cy": oy + dy + offsetCircleY
		});
		bgName.attr({
			"x": ox + dx + offsetBgX,
			"y": oy + dy + offsetBgY
		});

		_drawLines();
		_drawBlob();
	},

	/**
	* handle drag start
	* @return void
	* @private
	*/
	_handleStart = function(dx, dy){
		ox = labelName.attr("x");
		oy = labelName.attr("y");
		
		bgName
			.unmouseover(_displayPull)
			.unmouseout(_displayName);
		_displayName();
	},

	/**
	* handle drag stop
	* @return void
	* @private
	*/
	_handleStop = function(e){
		
		var 
			winWidth = $(window).width(),
			winHeight = $(window).height(),
			labelNameX = ox,
			labelNameY = oy;

		if( e.pageX < Math.round(winWidth * .75) ) {
			// $.address.value("menu");
			isMenu = true;
			name.undrag();
			bgName
				.unmouseover(_displayPull)
				.unmouseout(_displayName);

			labelName.attr("text", "About");
			offsetCircleX = 40;
			offsetCircleY = 1;
			
			labelNameX = Math.round(winWidth * .33),
			labelNameY = Math.round(winHeight * .49);
		} else {
			bgName
				.mouseover(_displayPull)
				.mouseout(_displayName);
		}

		labelName.animate({
			"x" : labelNameX,
			"y" : labelNameY
		}, 300, ">");
		circleName.animate({
			"cx" : labelNameX + offsetCircleX,
			"cy" : labelNameY + offsetCircleY
		}, 300, ">");
		bgName.animate({
			"x" : labelNameX + offsetBgX,
			"y" : labelNameY + offsetBgY
		}, 300, ">");

		_drawLines( true );
		_drawBlob( true );
		
	},

	/**
	* draw the lines that are draggable
	* @return void
	* @private
	*/
	_drawLines = function( animate ){

		var
			winWidth = $(window).width(),
			winHeight = $(window).height(),
			lineOriginX = animate ? (isMenu ? Math.round(winWidth * .33) : ox) + offsetCircleX : circleName.attr("cx"),
			lineOriginY = animate ? (isMenu ? Math.round(winHeight * .49) : oy) + offsetCircleY : circleName.attr("cy"),
			topPath = "M" + lineOriginX + "," + lineOriginY + "L" + ($(window).width() - 10) + ",-20",
			bottomPath = "M" + lineOriginX + "," + lineOriginY + "L" + ($(window).width() - 10) + "," + ($(window).height() + 20);

		if ( !lineTop ) {
			lineTop = R.path(topPath);
			lineTop.attr({
				"stroke" : "#666",
				"stroke-width" : "1"
			});
			blob.push(lineTop);
		} else if ( animate == true ) {
			lineTop.animate({
				"path": topPath
			}, 300, ">");
		} else {
			lineTop.attr("path", topPath);
		}

		if ( !lineBottom ) {
			lineBottom = R.path(bottomPath);
			lineBottom.attr({
				"stroke" : "#666",
				"stroke-width" : "1"
			});
			blob.push(lineBottom);
		} else if ( animate == true ) {
			lineBottom.animate({
				"path" : bottomPath
			}, 300, ">");
		} else {
			lineBottom.attr("path", bottomPath);
		}
		
		circleName.toFront();
	},

	/**
	* draw the blob circle
	* @return void
	* @private
	*/
	_drawBlob = function( animate ) {

		var
			winWidth = $(window).width(),
			winHeight = $(window).height(),
			circleNameX = animate ? (isMenu ? Math.round(winWidth * .33) : ox) + offsetCircleX : circleName.attr("cx"),
			circleNameY = animate ? (isMenu ? Math.round(winHeight * .49) : oy) + offsetCircleY : circleName.attr("cy"),
			
			blobOriginX = circleNameX + 20,
			blobOriginY = circleNameY,
			bottomX = $(window).width() - 5,
			bottomY = $(window).height(),
			leftBottomMiddleX = ($(window).width() - 10 + circleNameX) / 2,
			leftBottomMiddleY = ($(window).height() + 20 + circleNameY) / 2,
			rightBottomMiddleX = $(window).width() + 20,
			rightBottomMiddleY = ($(window).height() + circleNameY) / 2,
			rightX = $(window).width() + 10,
			rightY = blobOriginY,
			rightTopMiddleX = $(window).width() + 20,
			rightTopMiddleY = circleNameY / 2,
			leftTopMiddleX = ($(window).width() - 10 + circleNameX) / 2,
			leftTopMiddleY = rightTopMiddleY,
			topX = bottomX,
			topY = 0;

		var blobPath = "M" + rightX + "," + rightY;
		blobPath += "R" + rightTopMiddleX + "," + rightTopMiddleY;
		blobPath += "," + topX + "," + topY;
		blobPath += "," + leftTopMiddleX + "," + leftTopMiddleY;
		blobPath += "," + blobOriginX + "," + blobOriginY;
		blobPath += "," + leftBottomMiddleX + "," + leftBottomMiddleY;
		blobPath += "," + bottomX + "," + bottomY;
		blobPath += "," + rightBottomMiddleX + "," + rightBottomMiddleY;
		blobPath += "," + rightX + "," + rightY;
		

		if ( !circleBlob ) {
			circleBlob = R.path( blobPath );
			circleBlob.attr({
				"fill" : "#161616",
				"stroke-width" : "0",
				"stroke-opacity" : "0"
			});
		} else if ( animate == true ) {
			circleBlob.animate({
				"path" : blobPath
			}, 300, ">");
		} else {
			circleBlob.attr("path", blobPath);
		}

		blob.push( circleBlob );
		blob.toBack();
		
	},

	/**
	* Constructor
	* @return void
	* @private
	*/
	_init = function(initOptions) {

		if (!initOptions) initOptions = {};
		// save any options sent through to the intialisation script, if set
		for (var option in options) {
			if (options.hasOwnProperty(option)) { // pass JSLint
				if (!!initOptions[option] || initOptions[option] === false) {
					options[option] = initOptions[option];
				}
				// error check, if no element is specified then stop
				if (!options[option] && options[option] !== false) {
					return false;
				}
			}
		}

		isMenu = options.menu;
		_initRaphael();

	};

	_init(initOptions);


	/**
	* Return value, expose certain methods above
	*/
	return {

	};

};