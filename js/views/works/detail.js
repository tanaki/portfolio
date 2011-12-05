// Filename: views/works/detail
define([
	'jQuery',
	'Underscore',
	'Backbone',
	'Raphael',
	'collections/works',
	'text!templates/works/detail.html'
], function($, _, Backbone, Raphael, projectsCollection, projectDetailTemplate){
	
	var
		whiteBG = null;
	
	var detailView = Backbone.View.extend({
		
		el: $("#page .content"),
		
		elDetailContainer : $("#page #detail-container"),
		elDetail : $("#page #detail"),
		elDetailBackground : $("#page #detail-background"),
		
		initialize : function(){
			var self = this;
			$(window).resize(function(){
				self._updateNavPos(true);
				if ( whiteBG ) {
					var 
						fWidth = $(window).width(),
						fHeight = $(window).height(),
						a = "M20,20",
						b = "L" + (fWidth - 20) + ",20",
						c = " " + (fWidth - 20) + "," + (fHeight - 40),
						d = " " + (fWidth - 350) + "," + (fHeight - 20),
						e = " 20," + (fHeight - 20),
						f = " 20,20";
					whiteBG.attr("path", a + b + c + d + e + f);
				}
			});
		},
		
		hide: function(target, slug){
			
			var self = this;
			this.el.fadeOut(300, function(){
				self.elDetail.empty();
				self.elDetailBackground.empty();
				EH.trigger("hidden", target);
			});
		},
		
		render: function(slug){
			if ( $(".page-work").hasClass("page-work-detail") ) {
				this._nextItem(slug);
			} else {
				$(".page-work").addClass("page-work-detail");
				this._animDisplay(slug);
			}
		},
		
		_updateNavPos : function(resize) {
			var 
				middle = Math.floor($(".nav-work-details li").length / 2),
				index = $(".nav-work-details li.current").data("index"),
				top = Math.round(($(window).height() - $(".nav-work-details").height()) / 2),
				offset = 24 * (middle - index);
			
			if ( resize ) $(".nav-work-details").css("top", Math.round(top + offset));
			else $(".nav-work-details").animate({"top" : Math.round(top + offset)}, 200);
		},
		
		_updateBreadcrumb : function(i) {
			var 
				index = $(".nav-work-details li.current").data("index"),
				title = projectsCollection.models[(i >= 0 ? i : index)].attributes.title;
				
			$(".breadcrumb-work-details a.slug").html(title);
		},
		
		_nextItem : function (slug) {
			
			var
				currentArticle = $(".project-detail > li:not(.hidden)"),
				targetArticle = $(".project-detail > li[data-slug=" + slug + "]"),
				currentSlug = currentArticle.data("slug"),
				currentLink = $(".nav-work-details .current"),
				targetLink = $(".nav-work-details li[data-slug=" + slug + "]");

			if (slug == currentSlug) return;

			currentLink.removeClass("current");
			targetLink.addClass("current");
			
			currentArticle.addClass("hidden");
			targetArticle.removeClass("hidden");
			
			this._updateCloseBtn();
			this._updateNavPos();
			this._updateBreadcrumb();
		},
		
		_animDisplay : function(slug){
			
			R = Raphael(document.getElementById("detail-background"), "100%", "100%");
			
			var
				target = $(".list-works a[data-slug=" + slug + "]"),
				
				fWidth = $(window).width(),
				fHeight = $(window).height(),
				
				hWidth = Math.round(fWidth / 2),
				hHeight = Math.round(fHeight / 2),
				
				initialX = target.length > 0 ? target.position().left + 25 + 400 : hWidth,
				initialY = target.length > 0 ? target.position().top + 25 + Math.round(fHeight / 4) : hHeight,
				
				WBGAttr = {
					"stroke-opacity" : 0,
					"stroke-width" : 0,
					"stroke" : "#ffffff",
					"fill" : "#ffffff"
				};
				
			var 
				a = "M" + initialX + "," + initialY,
				b = "R" + initialX + "," + initialY,
				c = " " + initialX + "," + initialY,
				d = " " + initialX + "," + initialY,
				e = " " + initialX + "," + initialY,
				f = " " + initialX + "," + initialY,
				initialPath = a + b + c + d + e + f;
			
			var step1Path = this._getCircletoPath(initialX, initialY, 50);
			
			a = "M400,400";
			b = "R" + (fWidth - 400) + ",400";
			c = " " + (fWidth - 400) + "," + (fHeight - 400);
			d = " " + (fWidth - 350) + "," + (fHeight - 200);
			e = " 400," + (fHeight - 400);
			f = " 400,400";
			var step2Path = a + b + c + d + e + f;
			
			a = "M200,200";
			b = "R" + (fWidth - 200) + ",200";
			c = " " + (fWidth - 200) + "," + (fHeight - 400);
			d = " " + (fWidth - 350) + "," + (fHeight - 200);
			e = " 200," + (fHeight - 200);
			f = " 200,200";
			var step3Path = a + b + c + d + e + f;
			
			a = "M20,20";
			b = "L" + (fWidth - 20) + ",20";
			c = " " + (fWidth - 20) + "," + (fHeight - 40);
			d = " " + (fWidth - 350) + "," + (fHeight - 20);
			e = " 20," + (fHeight - 20);
			f = " 20,20";
			var finalPath = a + b + c + d + e + f;
			//var finalPath = step4Path;
			
			whiteBG = R.path(finalPath).attr(WBGAttr);
			
			this._initContent(slug);
			
			/*
			whiteBG = R.path(initialPath).attr(WBGAttr);
			whiteBG.animate({
				"path" : step1Path
			}, 300, function(){
				
				whiteBG.animate({
					"path" : step2Path
				}, 300, function(){
					whiteBG.animate({
						"path" : step3Path
					}, 300, function(){
						
							whiteBG.animate({
								"path" : finalPath
							}, 300);
							
					});
				});
			});
			*/
		},
		
		_getCircletoPath : function(x, y, r) { 
			var s = "M";
			s = s + "" + (x) + "," + (y-r) + "A" + r + "," + r + ",0,1,1," + (x-0.1) + "," + (y-r) + "z";
			return s; 
		},
		
		_initContent : function(slug) {
			
			this.collection = projectsCollection;
			if ( this.collection.length == 0 ) {
				var self = this;
				EH.bind("projects_ready", function(){
					self._display(slug);
				});
			} else {
				this._display(slug);
			}
		},
		
		_display : function(slug){
			var self = this;
			var data = {
				projects: projectsCollection.models,
				selectedSlug : slug,
				_: _
			};
			var compiledTemplate = _.template( projectDetailTemplate, data );
			this.elDetail
				.html( compiledTemplate )
				.fadeIn(300, function(){
					self._initHTML();
				});
		},
		
		_initHTML : function(){
			
			this._updateCloseBtn();
			this._updateNavPos();
			this._updateBreadcrumb();
			
			var self = this;
			$(".nav-work-details li").live({
				"mouseover" : function(){
					if ( $(this).hasClass("current") ) return;
					self._updateBreadcrumb($(this).data("index"));
				},
				"mouseleave" : function(){
					if ( $(this).hasClass("current") ) return;
					self._updateBreadcrumb( $(".nav-work-details li.current").data("index") );
				}
			});
		},
		
		_updateCloseBtn : function() {
			var 
				closeBtn = $(".close-detail"),
				white = $(".nav-work-details .current").data('white');
			if ( white ) closeBtn.addClass("white");
			else closeBtn.removeClass("white");
		}

	});
	return new detailView;
});
