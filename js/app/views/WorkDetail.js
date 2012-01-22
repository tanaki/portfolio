
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
		self.$block = self.$el.find("#detail");
		
		$(window).resize(function(){
			self.winWidth = $(window).width();
			self.winHeight = $(window).height();
		});
		
		$(window).keydown(function(e){
			if ( !$("body").hasClass("page-work-detail") ) return;
			var currentIndex = self.currentWork.attributes.index;
			if ( e.keyCode == 38 && currentIndex > 0 ) {
				self._nextItem( self.collection.at(currentIndex - 1).attributes.slug );
			} else if ( e.keyCode == 40 && currentIndex < self.collection.length - 1 ) {
				self._nextItem( self.collection.at(currentIndex + 1).attributes.slug );
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
		
		if ( $(".page-work").hasClass("page-work-detail") ) {
			this._nextItem(slug);
		} else {
			this._loadTemplate();
		}
	},
	
	_loadTemplate : function(){
		
		var self = this;
		
		if ( self.tpl_work ) {
			self._loadData();
		} else {
			$.loadTemplate({
				"template" : "template_work_detail",
				"file" : "/templates/work_detail.html",
				"callback" : function(data){
					self.tpl_work_detail = data;
					self._loadData();
				},
				"noStorage" : true // util for debug
			});
		}
		
	},
	
	_loadData : function(){
		
		var self = this;
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
			self = this,
			fWidth = this.winWidth,
			fHeight = this.winHeight,
			WBGAttr = {
				"stroke-opacity" : 0,
				"stroke-width" : 0,
				"stroke" : "#ffffff",
				"fill" : "#ffffff"
			},
			
			hWidth = Math.round(fWidth / 2),
			hHeight = Math.round(fHeight / 2),
			
			m = "M" + hWidth + "," + (hHeight - 20),
			n = "L" + (hWidth + 20) + "," + hHeight,
			o = " " + hWidth + "," + (hHeight + 20),
			p = " " + hWidth + "," + (hHeight + 20),
			q = " " + (hWidth - 20) + "," + hHeight,
			r = " " + hWidth + "," + (hHeight - 20),
			smallCircle = m+n+o+p+q+r,
			
			i = "M" + (hWidth - 200) + "," + (hHeight + 200),
			j = "L" + (hWidth - 200) + "," + (hHeight - 200),
			k = " " + (hWidth + 200) + "," + (hHeight - 200),
			l = " " + (hWidth + 200) + "," + (hHeight + 200),
			g = " " + (hWidth + 200) + "," + (hHeight + 200),
			h = " " + (hWidth - 200) + "," + (hHeight + 200),
			bigCircle = i + j + k + l + g + h,
			
			a = "M20,20",
			b = "L" + (fWidth - 20) + ",20",
			c = " " + (fWidth - 20) + "," + (fHeight - 40),
			d = " " + (fWidth - 350) + "," + (fHeight - 20),
			e = " 20," + (fHeight - 20),
			f = " 20,20",
			finalPath = a + b + c + d + e + f;
			
		if ( !this.block ) {
			this.block = Raphael(document.getElementById("detail-background"), "100%", "100%");
		}
		
		// TODO Animate
		var whiteBG = this.block.path(smallCircle).attr(WBGAttr).animate({
			"path" : bigCircle
		}, 400, "<", function(){
			$("#detail").css({
				"left" : hWidth - 40,
				"top" : hHeight - 5
			}).fadeIn(100);
			
			setTimeout(function(){
				
				$("#detail").css({
					"left" : 0,
					"top" : 0
				}).fadeOut(50);
				
				whiteBG.animate({
					"path" : finalPath
				}, 400, "<", function(){
					self._initContent();
				});
			}, 500);
			
		});

	},
	
	_initContent : function(){
		
		var 
			self = this,
			params = {
				projects: this.collection.models,
				selectedSlug : this.currentWork.attributes.slug,
				_: _
			},
			tpl = _.template( this.tpl_work_detail );
		
		this.$block.html( tpl(params) )
			.fadeIn(300, function(){
				self._initHTML();
			});
	},
	
	_initHTML : function(){

		this._initVideo( $(".project-detail > li:not(.hidden)") );
		this._updateCloseBtn();
		this._updateNavPos();
		this._updateBreadcrumb();

		var self = this;
		self.$el.find(".nav-work-details li").live({
			"click" : function(e){
				e.preventDefault();
				self._nextItem( $(this).data("slug") );
			},
			"mouseover" : function(){
				if ( $(this).hasClass("current") ) return;
				self._updateBreadcrumb($(this).data("index"));
			},
			"mouseleave" : function(){
				if ( $(this).hasClass("current") ) return;
				self._updateBreadcrumb( $(".nav-work-details li.current").data("index") );
			}
		});
		
		this.$el.delegate(".close-detail", "click", function(e){
			e.preventDefault();
			self.block = null;
			$(".page-work").removeClass("page-work-detail");
			PF.AppRouter.navigate("work", true);
		});
	},

	_updateCloseBtn : function() {
		var 
			closeBtn = this.$el.find(".close-detail"),
			white = this.$el.find(".nav-work-details .current").data('white');
			
		if ( white ) closeBtn.addClass("white");
		else closeBtn.removeClass("white");
	},
	
	_updateNavPos : function(resize) {
		var 
			navDetails = this.$el.find(".nav-work-details"),
			middle = Math.floor( navDetails.find("li").length / 2),
			index = navDetails.find("li.current").data("index"),
			top = Math.round((this.winHeight - navDetails.height()) / 2),
			offset = 24 * (middle - index);

		if ( resize ) navDetails.css("top", Math.round(top + offset));
		else navDetails.animate({"top" : Math.round(top + offset)}, 200);
	},

	_updateBreadcrumb : function(i) {
		var 
			index = this.$el.find(".nav-work-details li.current").data("index"),
			title = this.collection.models[(i >= 0 ? i : index)].attributes.title;

		this.$el.find(".breadcrumb-work-details a.slug").html(title);
	},
	
	_nextItem : function(slug){
		
		var
			navDetails = this.$el.find(".nav-work-details"),
			currentArticle = $(".project-detail > li:not(.hidden)"),
			targetArticle = $(".project-detail > li[data-slug=" + slug + "]"),
			currentSlug = currentArticle.data("slug"),
			currentLink = navDetails.find(".current"),
			targetLink = navDetails.find("li[data-slug=" + slug + "]");

		if (slug == currentSlug) return;

		currentLink.removeClass("current");
		targetLink.addClass("current");

		currentArticle.addClass("hidden");
		targetArticle.removeClass("hidden");

		this._initVideo(targetArticle, currentArticle);
		
		this._updateCloseBtn();
		this._updateNavPos();
		this._updateBreadcrumb();
		
		var self = this;
		$.each( this.collection.models, function(i, model){
			if ( model.attributes.slug == slug ) self.currentWork = model;
		});
	},
	
	_getCircletoPath : function(x , y, r) { 
        var s = "M"; 
        s = s + "" + (x) + "," + (y - r) + "A" + r + "," + r + ",0,1,1," + (x - 0.1) + "," + (y - r) + "z"; 
        return s; 
    },
	
	_initVideo : function( newContainer, oldContainer ) {
		
		if ( oldContainer ) oldContainer.find("iframe").remove();
		
		var 
			videoType = newContainer.data("video-type"),
			videoId = newContainer.data("video-id"),
			color = newContainer.data("color"),
			iframe = "";
			
		switch(videoType) {
			
			case "youtube" : 
				iframe = '<iframe width="435" height="251" src="http://www.youtube.com/embed/' + videoId + '?rel=0" frameborder="0" allowfullscreen></iframe>';
				break;
			case "vimeo" : 
				iframe = '<iframe src="http://player.vimeo.com/video/' + videoId + '?title=0&amp;byline=0&amp;portrait=0&amp;color=' + color + '" width="435" height="261" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>';
				break;
			
		}
		if ( videoType ) {
			newContainer.find(".left-column").prepend($(iframe));
		}
		
	}

	
	
});
