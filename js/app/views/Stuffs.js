
PF.View.Stuffs = Backbone.View.extend({
	
	el : "#page .content",
	$el : null,
	tpl_stuffs : null,
	collection : null,
	currentSlug : null,
	
	$window : $(window),
	$body : $("body"),
	
	initialize : function(){
		var self = this;
		self.$el = $(self.el);
		self.$window.resize(function(){
			if ( !self.$body.hasClass("page-stuffs") ) {
				self.$el.css("width", self.$window.width() - 545 );
				self._updateNavPos(true);
			}
		});
	},
	
	hide : function (callbackEvent) {
		this.$el.hide().css("width", "");
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

					var 
						total = response.stuffs.length - 1,
						indexLoaded = 0,
						contentLoading = $(".content-loading");
						
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

						if ( el.img ) {
							var thumb = new Image();
							thumb.onload = function(){
								contentLoading.text("Loading... " + (indexLoaded * 100 / total) + "%" ) ;
								if ( indexLoaded == total ) self._display();
								indexLoaded++;
							}
							thumb.src = "/img/stuffs/" + el.img;
						} else {
							if ( indexLoaded == total ) self._display();
							indexLoaded++;
						}
						
					
					});
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
			length = this.collection.length,
			navHeight = length * 35 + 85,
			middle = Math.floor(length / 2),
			index = (length - 1) - $(".nav-stuffs li.current").data("index"),
			top = Math.round(($(window).height() - navHeight) / 2),
			offset = 35 * (middle - index),
			navStuffs = $(".nav-stuffs");
			
		if ( resize ) navStuffs.css("top", Math.round(top + offset));
		else 
			navStuffs.animate({ 
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
		
		$(window).keydown(function(e){
			
			if ( !$("body").hasClass("page-stuffs") ) return;
			var 
				nav = self.$el.find(".nav-stuffs"),
				current = nav.find(".current"),
				currentIndex = current.data("index");
				
			if ( e.keyCode == 38 && currentIndex < (self.collection.length - 1) ) {				
				var prev = nav.find("li[data-index=" + (currentIndex + 1) + "] a").data("slug");
				self._changePartial( prev );
				PF.AppRouter.navigate("/stuffs/" + prev);
			} else if ( e.keyCode == 40 && currentIndex > 0 ) {
				var next = nav.find("li[data-index=" + (currentIndex - 1) + "] a").data("slug");
				self._changePartial( next );
				PF.AppRouter.navigate("/stuffs/" + next);
			}
		});
	},
	
	_display : function( ) {
		
		var 
			self = this,
			params = {
				stuffs : this.collection.models,
				selectedSlug : this.currentSlug,
				baseTop : Math.round(this.$window.height() / 2)
			},
			tpl = _.template(this.tpl_stuffs);
		
		this.$el
			.html( tpl(params) )
			.fadeIn(300, function(){
				self._initNavLinks();
				self._updateImage();
				self.$el.css("width", self.$window.width() - 545 );
				self._updateNavPos(true);
			});
	},
	
	_changePartial: function(selectedSlug){

		var
			ulArticles = $("ul.articles"),
			currentArticle = ulArticles.find("li:not(.hidden)"),
			targetArticle = ulArticles.find("li[data-slug="+ selectedSlug +"]"),
			currentSlug = currentArticle.data("slug"),
			currentIndex = currentArticle.data("index"),
			targetIndex = targetArticle.data("index"),
			
			navStuffs = $("ul.nav-stuffs"),
			currentLink = navStuffs.find("li.current"),
			targetLink = navStuffs.find("li[data-index=" + targetIndex + "]"),
			currentToAnimate = currentArticle.find("span.stuff-content"),
			targetToAnimate = targetArticle.find("span.stuff-content");

		if (selectedSlug == currentSlug) return;

		currentLink.removeClass("current");
		targetLink.addClass("current");
		this._updateNavPos();

		var self = this;
		currentToAnimate
			.stop(true,true)
			.animate({
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
			.stop(true,true)
			.animate({
				"opacity" : 1,
				"top": targetToAnimate.data("top")
			}, 400);
			
	}
});

