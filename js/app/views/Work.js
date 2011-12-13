
PF.View.Work = Backbone.View.extend({
	
	el : ".main-content",
	tpl_work : null,
	collection : null,
	
	hide : function (callbackEvent) {
		$(this.el).hide();
		if (callbackEvent) PF.EventManager.trigger( callbackEvent );
	},
	
	render : function() {
		this._loadTemplate();
	},
	
	_loadTemplate : function() {
		
		var self = this;
		$.loadTemplate({
			"template" : "template_work",
			"file" : "templates/work.html",
			"callback" : function(data){
				self.tpl_work = data;
				self._loadData();
			},
			"noStorage" : true // util for debug
		});
		
	},
	
	_loadData : function() {
		
		var self = this;
		this.collection = new PF.Collection.WorksCollection();
		
		$.ajax({
			
			dataType : 'json',
			url: "/data/works.json",
			
			success : function(response){
				
				$.each(response.items, function(i, el){
					self.collection.add(new PF.Model.Work({
						
					}));
				});
				
				self._display();
			}
		});

		
	},
	
	_display : function() {
		var 
			params = {
				works : this.collection.models
			},
			tpl = _.template(this.tpl_work);
		
		$(this.el).html( tpl(params) );
	}
});