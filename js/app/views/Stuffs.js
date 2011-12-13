
PF.View.Stuffs = Backbone.View.extend({
	
	el : ".main-content",
	tpl_stuffs : null,
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
			"template" : "template_stuffs",
			"file" : "templates/stuffs.html",
			"callback" : function(data){
				self.tpl_stuffs = data;
				self._loadData();
			},
			"noStorage" : true // util for debug
		});
		
	},
	
	_loadData : function() {
		
		var self = this;
		this.collection = new PF.Collection.StuffsCollection();
		
		$.ajax({
			
			dataType : 'json',
			url: "/data/stuffs.json",
			
			success : function(response){
				
				$.each(response.items, function(i, el){
					self.collection.add(new PF.Model.Stuff({
						
					}));
				});
				
				self._display();
			}
		});

		
	},
	
	_display : function() {
		var 
			params = {
				stuffs : this.collection.models
			},
			tpl = _.template(this.tpl_stuffs);
		
		$(this.el).html( tpl(params) );
	}
});