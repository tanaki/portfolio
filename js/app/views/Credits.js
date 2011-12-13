
PF.View.Credits = Backbone.View.extend({
	
	el : ".main-content",
	tpl_credits : null,
	
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
			"template" : "template_credits",
			"file" : "templates/credits.html",
			"callback" : function(data){
				self.tpl_credits = data;
				self._display();
			},
			"noStorage" : true // util for debug
		});
		
	},
	
	_display : function() {
		var tpl = _.template( this.tpl_credits );
		$(this.el).html( tpl() );
	}
});