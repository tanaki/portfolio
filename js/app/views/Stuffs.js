
PF.View.Stuffs = Backbone.View.extend({
	
	el : "#page .content",
	tpl_stuffs : null,
	collection : null,
	currentSlug : null,
	
	initialize : function(){
		var self = this;
		$(window).resize(function(){
			$(self.el).css("width", $(window).width() - 545 );
			self._updateNavPos(true);
		});
	},
	
	hide : function (callbackEvent) {
		$(this.el).hide().css("width", "");
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
				"file" : "/templates/stuffs.html",
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
	
	_updateImage : function(){
		var img = $(".content ul li:not(.hidden)").data("img");
		$("nav .selected span").css("background-image", "url(/img/stuffs/"+ img +")");
	},
	
	_updateNavPos : function(resize){
			
		var 
			navHeight = this.collection.length * 35 + 85,
			middle = Math.floor(this.collection.length / 2),
			index = $(".nav-stuffs li.current").data("index"),
			top = Math.round(($(window).height() - navHeight) / 2),
			offset = 35 * (middle - index);

		if ( resize ) $(".nav-stuffs").css("top", Math.round(top + offset));
		else 
			$(".nav-stuffs").animate({ 
				"top" : Math.round(top + offset)
			}, 200 );
	},
	
	_initNavLinks : function(){
		var self = this;
		$(".nav-stuffs a").click(function(e){
			e.preventDefault();
			PF.AppRouter.navigate( $(this).attr("href") );
			self._changePartial( $(this).data("slug") );
		});
	},
	
	_display : function( ) {
		
		var 
			self = this,
			params = {
				stuffs : this.collection.models,
				selectedSlug : this.currentSlug,
				baseTop : Math.round($(window).height() / 2)
			},
			tpl = _.template(this.tpl_stuffs);
		
		$(this.el)
			.html( tpl(params) )
			.fadeIn(300, function(){
				self._initNavLinks();
				self._updateImage();
				self._updateNavPos(true);
				$(window).resize();
			});
	},
	
	_changePartial: function(selectedSlug){

		var
			currentArticle = $("ul.articles li:not(.hidden)"),
			targetArticle = $("ul.articles li[data-slug="+ selectedSlug +"]"),
			currentSlug = currentArticle.data("slug"),
			currentIndex = currentArticle.data("index"),
			targetIndex = targetArticle.data("index"),
			currentLink = $("ul.nav-stuffs li.current"),
			targetLink = $("ul.nav-stuffs li[data-index=" + targetIndex + "]"),
			currentToAnimate = $("span.stuff-content", currentArticle),
			targetToAnimate = $("span.stuff-content", targetArticle);

		if (selectedSlug == currentSlug) return;

		currentLink.removeClass("current");
		targetLink.addClass("current");
		this._updateNavPos();

		var self = this;
		currentToAnimate.animate({
			"opacity" : 0,
			"top" : currentIndex > targetIndex ? "70%" : "30%"
		}, 400, function(){
			currentArticle.addClass("hidden");
			self._updateImage();
			currentToAnimate.css({
				"top": currentToAnimate.data("top"),
				"opacity": 1
			});
		});

		targetArticle.removeClass("hidden");
		targetToAnimate
			.css({
				"top": currentIndex > targetIndex ? "30%" : "70%",
				"opacity" : 0
			})
			.animate({
				"opacity" : 1,
				"top": targetToAnimate.data("top")
			}, 400);
			
	}
});

