
PF.View.WorkDetail = Backbone.View.extend({
	
	el : "#detail-container",
	$el : null,
	tpl_work_detail : null,
	collection : null,
	
	currentSlug : null,
	currentWork : null,
	
	initialize : function(){
		var self = this;
		self.$el = $(self.el);
	},
	
	hide : function (callbackEvent) {
		$(this.el).hide();
		if (callbackEvent) PF.EventManager.trigger( callbackEvent );
	},
	
	render : function ( slug, workCollection ) {
		
		var self = this;
		self.currentSlug = slug;
		self.collection = workCollection;
		
		$.each( this.collection.models, function(i, model){
			if ( model.attributes.slug == self.currentSlug ) self.currentWork = model;
		});
		
		this._display();
	},
	
	_display : function() {
		$("body").addClass("page-work-detail");
		this._init();
	},
	
	_init : function() {
		
		console.log( $("#detail-background"), this.currentWork.attributes );
		
		
	}
});