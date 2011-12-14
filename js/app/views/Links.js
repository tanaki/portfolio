
PF.View.Links = Backbone.View.extend({
	
	el : ".main-content",
	tpl_links : null,
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
		
		if ( self.tpl_links ) {
			self._loadData();
		} else {
			$.loadTemplate({
				"template" : "template_links",
				"file" : "/templates/links.html",
				"callback" : function(data){
					self.tpl_links = data;
					self._loadData();
				},
				"noStorage" : true // util for debug
			});
		}
	},
	
	_loadData : function() {
		
		var self = this;
		this.collection = new PF.Collection.LinksCollection();
		
		$.ajax({
			
			dataType : 'json',
			url: "/data/links.json",
			
			success : function(response){
				
				$.each(response.items, function(i, el){
					self.collection.add(new PF.Model.Link({
						
					}));
				});
				
				self._display();
			}
		});

		
	},
	
	_display : function() {
		var 
			params = {
				links : this.collection.models
			},
			tpl = _.template(this.tpl_links);
		
		$(this.el).html( tpl(params) );
	}
});