
PF.View.About = Backbone.View.extend({
	
	el : "#page .content",
	tpl_about : null,
	
	hide : function (callbackEvent) {
		$(this.el).hide();
		if (callbackEvent) PF.EventManager.trigger(callbackEvent);
	},
	
	render : function() {
		this._loadTemplate();
	},
	
	_loadTemplate : function() {
		
		var self = this;
		$.loadTemplate({
			"template" : "template_about",
			"file" : "templates/about.html",
			"callback" : function(data){
				self.tpl_about = data;
				self._display();
			},
			"noStorage" : true // util for debug
		});
		
	},
	
	_display : function() {
		var tpl = _.template( this.tpl_about );
		$(this.el).html( tpl() ).fadeIn(300);
	}
});