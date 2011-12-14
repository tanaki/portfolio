
PF.View.WorkDetail = Backbone.View.extend({
	
	el : ".main-content",
	tpl_work_detail : null,
	collection : null,
	
	hide : function (callbackEvent) {
		$(this.el).hide();
		if (callbackEvent) PF.EventManager.trigger( callbackEvent );
	},
	
	render : function() {
		this._loadTemplate();
	},
	
	_loadTemplate : function() {
		
		console.log("boum");
		/*
		var self = this;
		$.loadTemplate({
			"template" : "template_work",
			"file" : "/templates/work.html",
			"callback" : function(data){
				self.tpl_work_detail = data;
				self._loadData();
			},
			"noStorage" : true // util for debug
		});
		*/
	},
	
	_display : function() {
		/*
		var 
			params = {
				works : this.collection.models
			},
			tpl = _.template(this.tpl_work_detail);
		
		$(this.el).html( tpl(params) );
		*/
	}
});