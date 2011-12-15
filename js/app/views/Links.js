
PF.View.Links = Backbone.View.extend({
	
	el : "#page .content",
	page: "#page",
	tpl_links : null,
	collection : null,
	
	initialize : function(){
		
		var self = this;
			
		$(".link-az").live("click", function(e){
			e.preventDefault();
			self.toggleLists(this, true);
		});
		$(".link-gobelins").live("click", function(e){
			e.preventDefault();
			self.toggleLists(this, false);
		});
		$(".container ul li a")
			.live("mouseover", function(){

				var url = "/img/links/external/"+ $(this).data('slug') +".jpg";
				
				$("nav .selected span").css({
					"background-image" : "url(" + url + ")",
					"background-position" : "50% -5px"
				});
				
			})
			.live("mouseout", function(){
				
				$("nav .selected span").css({
					"background-position" : "50% 100px"
				});
			});
	},

	toggleLists : function (target, isAZ) {

		if ( $(target).hasClass("selected") ) return;

		$(".content .selected").removeClass("selected");
		$(target).addClass("selected");

		var marginLeft = isAZ ? "0px" : "-127px";
		$(".container").animate({
			"margin-left" : marginLeft
		}, 270);

		$(".a-z ul").animate({
			"opacity" : (isAZ ? 1 : 0)
		});
		$(".gobelins ul").animate({
			"opacity" : (isAZ ? 0 : 1)
		});

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
				
					_.each(response.az, function(el, i){
						self.collection.add(new PF.Model.Link({
							name: el.name,
							url: el.url,
							slug: el.slug,
							type: "az"
						}));
					});

					_.each(response.gobelins, function(el, i){

						self.collection.add(new PF.Model.Link({
							name: el.name,
							type: "gobelins",
							isSubtitle: true,
							"class": i != 0
						}));

						_.each( el.people, function(link){
							self.collection.add(new PF.Model.Link({
								name: link.name,
								url: link.url,
								slug: link.slug,
								type: "gobelins"
							}));
						});
					});
				
					self._display();
				}
			});
		}
		
	},
	
	_display : function() {
		var 
			self = this,
			params = {
				links : this.collection.models
			},
			tpl = _.template(this.tpl_links);
			
		if ($(".line").length == 0) $(self.page).append('<div class="line"></div>');
		else $(".line").removeClass("line-toggled");
		
		$(this.el).html( tpl(params) ).fadeIn(300);
	}
});