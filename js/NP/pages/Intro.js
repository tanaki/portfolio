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
	var R = null,

	/**
	 * The options passed through to this function
	 *
	 * @var Object
	 * @private
	 */
	options = {
		canvas : "main-canvas",
		defaultWidth : 1024,
		defaultHeight : 768
	},


	/**
	 * init raphael JS
	 * @return void
	 * @private
	 */
	_initRaphael = function(){
		R = new ScaleRaphael(options.canvas, options.defaultWidth, options.defaultHeight);
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
		R.changeSize( $(window).width(), $(window).height(), true, false);
	},
	
	/**
	 * init intro graphics
	 * @return void
	 * @private
	 */
	_initGraphics = function(){
		
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
		
		_initRaphael();

	};
	
	_init(initOptions);


	/**
	 * Return value, expose certain methods above
	 */
	return {
		
	};


};