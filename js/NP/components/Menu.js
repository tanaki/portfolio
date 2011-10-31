/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" :
 * <nipigelet@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Nico P.
 * ----------------------------------------------------------------------------
 */
var Menu = function(initOptions){

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
	 * Private function
	 * @return void
	 * @private
	 */
	_privateFunction = function(){

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

		// TODO
		// Code here
		console.log("create Menu");

	};
	
	_init(initOptions);


	/**
	 * Return value, expose certain methods above
	 */
	return {
		
	};


};