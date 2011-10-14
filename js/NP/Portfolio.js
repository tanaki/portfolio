/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" :
 * <nipigelet@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Nico P.
 * ----------------------------------------------------------------------------
 */
var Portfolio = function(initOptions){

	/**
	 * private var for the Class
	 *
	 */
	var privateParam = null,

	/**
	 * The options passed through to this function
	 *
	 * @var Object
	 * @private
	 */
	options = {
		
	},


	/**
	 * URL Handler
	 * @return void
	 * @private
	 */
	_URLHandler = function(){
		
		var path = $.address.pathNames();
		switch ( path.length ) {
			case 1 :
				console.log( "init page directly" );
			break;
			case 2 :
				console.log( "init sub page directly" );
			break;
			case 0 :
			default :
				var intro = new Intro();
			break;
		}
		
	},


	/**
	 * Initialise the functionality
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

		_URLHandler();
	};
	
	_init(initOptions);

	/**
	 * Return value, expose certain methods above
	 */
	return {
		
	};


};