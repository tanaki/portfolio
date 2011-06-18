
/**
 * Controller component of the Model View Controller implementation
 * @param {*} model The data Model for this Controller
 * @constructor
 */
com.nicolaspigelet.Controller = function( model ) {
	
	this._model = model;
	
	/**
	 * @private
	 * @type {number}
	 */
	this._timer;
}

/**
 * Starts the timer running
 */
com.nicolaspigelet.Controller.prototype.startTimer = function() {
	
	var self = this;
	
	var tick = function() {
		self._model.setTime( new Date() );
	}
	
	this._timer = setInterval( tick, 1000 );
	tick();
}

/**
 * Stops the current time from running
 */
com.nicolaspigelet.Controller.prototype.stopTimer = function() {
	clearInterval( this._timer );
}