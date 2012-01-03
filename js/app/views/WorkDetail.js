
PF.View.WorkDetail = Backbone.View.extend({
	
	el : "#detail-container",
	$el : null,
	tpl_work_detail : null,
	collection : null,
	
	currentSlug : null,
	currentWork : null,
	
	winWidth : null,
	winHeight : null,
	
	block : null,
	
	initialize : function(){
		var self = this;
		self.$el = $(self.el);
		self.winWidth = $(window).width();
		self.winHeight = $(window).height();
		
		// TODO Mettre dans init nav links
		$(window).keydown(function(e){
			
			if ( !$("body").hasClass("page-work-detail") ) return;
			
			if ( e.keyCode == 38 ) {
				console.log("prev");
			} else if ( e.keyCode == 40 ) {
				console.log("next");
			}
		});
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
		this.$el.show()
		this._drawBlock();
	},
	
	_drawBlock : function() {
		
		var
			fWidth = this.winWidth,
			fHeight = this.winHeight,
			a = "M20,20",
			b = "L" + (fWidth - 20) + ",20",
			c = " " + (fWidth - 20) + "," + (fHeight - 40),
			d = " " + (fWidth - 350) + "," + (fHeight - 20),
			e = " 20," + (fHeight - 20),
			f = " 20,20",
			finalPath = a + b + c + d + e + f,
			WBGAttr = {
				"stroke-opacity" : 0,
				"stroke-width" : 0,
				"stroke" : "#ffffff",
				"fill" : "#ffffff"
			};
			
		if ( !this.block ) {
			this.block = Raphael(document.getElementById("detail-background"), "100%", "100%");
		}
		// TODO Animate
		var whiteBG = this.block.path(finalPath).attr(WBGAttr);

		this._initContent();
	},
	
	_initContent : function(){
		
		console.log("_initContent", this.currentWork.attributes.index, this.collection.length);
		
	}
});