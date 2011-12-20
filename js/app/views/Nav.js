
PF.View.Nav = Backbone.View.extend({
	
	nav: null,
	footer: null,
	breadcrumb: null,
	currentViewID : null,
	
	initialize : function(){

		var self = this;
		
		self.nav = $("nav");
		self.footer = $("footer");
		self.breadcrumb = $(".breadcrumb");
		
		$("nav a:not(.selected)").live({
			"mouseenter" : function(){
				if ( self.breadcrumb.find(".link").length > 1 )
					self.breadcrumb.find(".link:last").hide(200);

				var text = $("span", this).text();
				text.shuffle( self.breadcrumb.find(".current") );
			},
			"mouseleave" : function(){
				if ( self.breadcrumb.find(".link").length > 1 )
					self.breadcrumb.find(".link:last").show(200);

				self.breadcrumbText = self.currentViewID.capitalize();
				self.breadcrumbText.shuffle( self.breadcrumb.find(".current") );
			}
		});
		
		$("nav a").click( function(e) {
			e.preventDefault();
			if ( $(this).hasClass("selected") ) return;
			PF.AppRouter.navigate( $(this).attr("href"), true );
		});
		
		$(".link-first").live("click", function(e){
			e.preventDefault();
			PF.AppRouter.navigate( "/", true );
		});
	},
	
	order : function(idView){
		
		$("body")
			.attr("class", "")
			.addClass("page-" + idView);

		this.nav.find(".selected").removeClass("selected");
		$("#" + idView)
			.removeClass("first")
			.removeClass("second")
			.removeClass("third")
			.addClass("selected");

		this.nav.find("a:not(.selected)").each(function(i, a){
			$(a)
				.removeClass("first")
				.removeClass("second")
				.removeClass("third")
				.addClass(i == 0 ? "first" : (i == 1 ? "second" : "third"))
			$("span", a).css("background-image", "");
		});

		return this;
	},
	
	updateBreadcrumb: function(idView){
		this.breadcrumbText = idView.capitalize();
		$(".current", this.breadcrumb).text( this.breadcrumbText );
	},

	hide: function(){
		this.nav.fadeOut(200);
		this.footer.fadeOut(200);
		this.breadcrumb.fadeOut(200);
	},
	
	render: function( idView ){
		
		var self = this;
		if ( this.nav.hasClass("hidden") ) {
			this.nav
				.css("visibility", "visible")
				.fadeIn(200, function(){
					self.nav.removeClass("hidden");
				});
		}
		
		if ( this.footer.hasClass("hidden") ) {
			this.footer
				.css("visibility", "visible")
				.fadeIn(200, function(){
					self.footer.removeClass("hidden");
				});
		}
		
		if ( this.breadcrumb.hasClass("hidden") ) {
			this.breadcrumb
				.css("visibility", "visible")
				.fadeIn(200, function(){
					self.breadcrumb.removeClass("hidden");
				});
		}
		
		if ( idView ) {
			this.order(idView);
			this.updateBreadcrumb(idView);
			this.currentViewID = idView;
		}
	}
	
});