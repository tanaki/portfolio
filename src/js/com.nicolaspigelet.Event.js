
/**
 * Event class for implementing observer pattern
 * @param {Object} sender Target dispatcher for this event
 * @constructor
 */
com.nicolaspigelet.Event = function( sender ) {
	/**
	 * Target dispatcher for this event
	 * @private
	 * @type {Object}
	 */
	this._sender = sender;
	/**
	 * List of callbacks subscribed to this event
	 * @private
	 * @type Array.<Function>
	 */
	this._observers = [];
}

/**
 * Attaches an observer to this event
 * @param {Function} observer An observer to attach to this event
 */
com.nicolaspigelet.Event.prototype.attach = function( observer ) {
	this._observers.push( observer );
}

/**
 * Dispatches this event with given parameters to all observers
 * @param args zero or more arguments which will be passed to observers
 */
com.nicolaspigelet.Event.prototype.notify = function( args ) {
	for( var i = 0; i < this._observers.length; ++i ) {
		this._observers[i]( this._sender, args );
	}
}