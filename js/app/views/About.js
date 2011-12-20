
PF.View.About = Backbone.View.extend({
	
	el : "#page .content",
	tpl_about : null,
	imgPath : "/img/about/portrait.png",
	aboutText : null,
	
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
			self._loadData();
		} else {
			$.loadTemplate({
				"template" : "template_about",
				"file" : "/templates/about.html",
				"callback" : function(data){
					self.tpl_about = data;
					self._loadData();
				},
				"noStorage" : true // util for debug
			});
		}
	},
	
	_loadData : function(){
		
		var self = this;
		if ( self.aboutText ) {
			self._display();
		} else {
			
			$.ajax({
			
				dataType : 'json',
				url: "/data/about.json",
			
				success : function(response){
		
					self.aboutText = response.about;
					
					var img = new Image();
					img.onload = self._display();
					img.src = self.imgPath;
				}
			});
		}
		
	},
	
	_display : function() {
		
		var 
			params = {
				about : this.aboutText
			},
			tpl = _.template(this.tpl_about);
			
		$(this.el).html( tpl(params) ).fadeIn(300);
	}
});