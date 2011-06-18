
/**
 * Model component of the Model View Controller implementation
 * @param {Object=} data Initial data for the model
 * @constructor
 */
com.nicolaspigelet.portfolio.Model = function( data ) {
	
	/**
	 * Dispatched when the time is updated
	 * @type {com.nicolaspigelet.Event}
	 */
	this.onTimeChanged = new com.nicolaspigelet.Event( this );
	
	/**
	 * @private
	 * The data stored in this Model
	 * @type {Object}
	 */
	this._data = data || {};
}

/**
 * @return {Date} The current time.
 */
com.nicolaspigelet.portfolio.Model.prototype.getTime = function() {
	return this._data.time;
}

/**
 * @param {Date} time The current time
 */
com.nicolaspigelet.portfolio.Model.prototype.setTime = function( time ) {
	this._data.time = time;
	this.onTimeChanged.notify( time );
}