
PF.View.Links = Backbone.View.extend({
	
	el : "#page .content",
	page: "#page",
	tpl_links : null,
	collection : null,
	totalImages : 0,
	indexLoaded : 0,
	
	toggleLists : function (target, isAZ) {

		if ( $(target).hasClass("selected") ) return;

		$(".content .selected").removeClass("selected");
		$(target).addClass("selected");

		var marginLeft = isAZ ? "0px" : "-127px";
		$(".container").animate({
			"margin-left" : marginLeft
		}, 500, "linear");

		$(".a-z ul").animate({
			"opacity" : (isAZ ? 1 : 0)
		}, 400, "linear");
		$(".gobelins ul").animate({
			"opacity" : (isAZ ? 0 : 1)
		}, 400, "linear");

		$(".line").toggleClass("line-toggled");
	},
	
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
		
		if ( self.collection ) {
			self._display();
		} else {
			
			self.collection = new PF.Collection.LinksCollection();
			$.ajax({
			
				dataType : 'json',
				url: "/data/links.json",
			
				success : function(response){
					
					self.totalImages = response.az.length + response.gobelins.length - 1;
					
					_.each(response.az, function(el, i){
						self.collection.add(new PF.Model.Link({
							name: el.name,
							url: el.url,
							slug: el.slug,
							type: "az"
						}));
						self._loadImage(el.slug);
					});

					_.each(response.gobelins, function(el, i){

						self.collection.add(new PF.Model.Link({
							name: el.name,
							type: "gobelins",
							isSubtitle: true,
							"class": i != 0
						}));
						self.indexLoaded++;
						
						_.each( el.people, function(link){
							self.collection.add(new PF.Model.Link({
								name: link.name,
								url: link.url,
								slug: link.slug,
								type: "gobelins"
							}));
							self._loadImage(el.slug);
						});
					});
				}
			});
		}
		
	},
	
	_loadImage : function( slug ){
		var 
			self = this,
			thumb = new Image();
			
		thumb.onload = function(){
			$(".content-loading").show().text("Loading... " + Math.round(self.indexLoaded * 100 / self.totalImages) + "%" ) ;
			if ( self.indexLoaded == self.totalImages ) self._display();
			self.indexLoaded++;
		}
		thumb.src = "/img/links/external/" + slug + ".png";
	},
	
	_display : function() {
		var 
			self = this,
			params = {
				links : this.collection.models
			},
			tpl = _.template(this.tpl_links),
			line = $(".line");
			
		$(".content-loading").hide();
		if (line.length == 0) $(self.page).append('<div class="line"></div>');
		else line.removeClass("line-toggled");
		
		$(this.el).html( tpl(params) ).fadeIn(300, function(){
			self._initLinks();
			$(".a-z ul").css("opacity", 0);
		});
	},
	
	_initLinks : function(){
		
		var self = this;
		
		$(".link-az").click(function(e){
			e.preventDefault();
			self.toggleLists(this, true);
		});
		
		$(".link-gobelins").click(function(e){
			e.preventDefault();
			self.toggleLists(this, false);
		});
		$(".container ul li a").hover(
			function(){
				
				var url = "/img/links/external/"+ $(this).data('slug') +".png";
				
				$("nav .selected span").css({
					"background-image" : "url(" + url + ")",
					"background-position" : "50% -5px"
				});
				
			},
			function(){
				
				$("nav .selected span").css({
					"background-position" : "50% 100px"
				});
			}
		);
		
	}
});