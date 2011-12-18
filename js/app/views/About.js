
PF.View.About = Backbone.View.extend({
	
	el : "#page .content",
	tpl_about : null,
	imgPath : "/img/about/portrait.png",
	
	hide : function (callbackEvent) {
		$(this.el).hide();
		if (callbackEvent) PF.EventManager.trigger(callbackEvent);
	},
	
	render : function() {
		this._loadTemplate();
	},
	
	_loadTemplate : function() {
		
		var self = this;
		
		if ( self.tpl_about ) {
			self._display();
		} else {
			$.loadTemplate({
				"template" : "template_about",
				"file" : "/templates/about.html",
				"callback" : function(data){
					self.tpl_about = data;
					var img = new Image();
					img.onload = self._display();
					img.src = self.imgPath;
				},
				"noStorage" : true // util for debug
			});
		}
	},
	
	_display : function() {
		var tpl = _.template( this.tpl_about );
		$(this.el).html( tpl() ).fadeIn(300);
	}
});