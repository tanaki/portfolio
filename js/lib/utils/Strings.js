
// String Helpers
String.prototype.capitalize = function(){
	return this.charAt(0).toUpperCase() + this.slice(1);
}

String.prototype.shuffle = function(container){
	var str = this,
		progress = str.length - 2,
		timer = setInterval(function() {
			container.text(str.substring(0, progress++));
			if (progress > str.length) clearInterval(timer);
		}, 80);
}