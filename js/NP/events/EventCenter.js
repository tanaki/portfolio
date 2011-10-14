/*
 * ----------------------------------------------------------------------------
 * "THE BEER-WARE LICENSE" :
 * <nipigelet@gmail.com> wrote this file. As long as you retain this notice you
 * can do whatever you want with this stuff. If we meet some day, and you think
 * this stuff is worth it, you can buy me a beer in return Nico P.
 * ----------------------------------------------------------------------------
 */
var EventCenter = (function(){

	function EventCenter() {
		var
			registerEvent = function(eventType, callback){
				$(this).bind(eventType, callback);
			},

			dispatchEvent = function(eventType, params) {
				$(this).trigger(eventType, params);
			};
		return {
			registerEvent : registerEvent,
			dispatchEvent : dispatchEvent
		}
    }

    var 
		instance = null,

		getInstance = function(){
			if (instance == null) {
				instance = new EventCenter();
				instance.constructor = null;
			}
			return instance;
		};
	
    return {
        getInstance: getInstance
   };
})();