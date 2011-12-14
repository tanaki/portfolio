
PF.View.Stuffs = Backbone.View.extend({
	
	el : "#page .content",
	tpl_stuffs : null,
	collection : null,
	currentSlug : null,
	
	initialize : function(){
		var self = this;
		$(window).resize(function(){
			$(".page-stuffs .content").css("width", $(window).width() - 565 );
			// self._updateNavPos(true);
		});
	},
	
	hide : function (callbackEvent) {
		$(this.el).hide();
		if (callbackEvent) PF.EventManager.trigger( callbackEvent );
	},
	
	render : function(slug) {
		this.currentSlug = slug || null;
		this._loadTemplate();
	},
	
	_loadTemplate : function() {
		
		var self = this;
		
		if ( self.tpl_stuffs ) {
			self._loadData();
		} else {
			$.loadTemplate({
				"template" : "template_stuffs",
				"file" : "templates/stuffs.html",
				"callback" : function(data){
					self.tpl_stuffs = data;
					self._loadData();
				},
				"noStorage" : true // util for debug
			});
		}
	},
	
	_loadData : function() {
		
		var self = this;
		
		if ( self.collection ) {
			self._display();
		} else {
			self.collection = new PF.Collection.StuffsCollection();
			$.ajax({

				dataType : 'json',
				url: "/data/stuffs.json",

				success : function(response){

					$.each(response.stuffs, function(i, el){
						self.collection.add(new PF.Model.Stuff({
							index: el.index,
							slug: el.slug,
							title: el.title,
							top: el.top,
							date: el.date,
							img: el.img,
							text: el.text,
							tags: el.tags
						}));
					});

					self._display();
				}
			});
		}
		
	},
	
	_display : function( ) {
		var 
			self = this,
			params = {
				stuffs : this.collection.models,
				selectedSlug : this.currentSlug,
				baseTop : Math.round($(window).height() / 2),
			},
			tpl = _.template(this.tpl_stuffs);
		
		$(this.el)
			.html( tpl(params) )
			.fadeIn(300, function(){
				//self._updateImage();
				//self._updateNavPos();
				$(window).resize();
			});
	}
});

