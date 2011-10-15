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
		bgName = null,
		labelName = null,
		circleName = null,
		offsetCircleX = 80,
		offsetCircleY = 0,
		offsetBgX = -20,
		offsetBgY = -20,

		lineTop = null,
		lineBottom = null,
		
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
		name = R.set();

		bgName = R.rect(960, 280, 100, 40);
		bgName.attr({
			"stroke-width" : 0,
			"stroke-opacity" : 0,
			"fill": "#222",
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
		circleName = R.circle(1000, 300, 3);
		circleName.attr({
			"stroke-width" : "0",
			"stroke-opacity" : "0",
			"fill" : "#fff"
		});
		name.push(circleName);


			
		name.drag(_handleMove, _handleStart, _handleStop);
		_resizeRaphael();
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
			offsetCircleY = 2;
			
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