
PF.View.Nav = Backbone.View.extend({
	
	nav: "nav",
	footer: "footer",
	breadcrumb: ".breadcrumb",
	currentViewID : null,
	
	initialize : function(){

		var self = this;
		$("nav a:not(.selected)").live({
			"mouseenter" : function(){
				if ( $(".breadcrumb .link").length > 1 )
					$(".breadcrumb .link:last").hide(200);

				var text = $("span", this).text();
				text.shuffle( $(".breadcrumb .current") );
			},
			"mouseleave" : function(){
				if ( $(".breadcrumb .link").length > 1 )
					$(".breadcrumb .link:last").show(200);

				self.breadcrumbText = self.currentViewID.capitalize();
				self.breadcrumbText.shuffle( $(".breadcrumb .current") );
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

		$(".selected", this.nav).removeClass("selected");
		$("#" + idView)
			.removeClass("first")
			.removeClass("second")
			.removeClass("third")
			.addClass("selected");

		$("a:not(.selected)", this.nav).each(function(i, a){
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
		$(this.nav).fadeOut(200);
		$(this.footer).fadeOut(200);
		$(this.breadcrumb).fadeOut(200);
	},
	
	render: function( idView ){
		
		if ( $(this.nav).hasClass("hidden") ) {
			$(this.nav)
				.css("visibility", "visible")
				.fadeIn(200, function(){
					$(this).removeClass("hidden");
				});
		}
		
		if ( $(this.footer).hasClass("hidden") ) {
			$(this.footer)
				.css("visibility", "visible")
				.fadeIn(200, function(){
					$(this).removeClass("hidden");
				});
		}
		
		if ( $(this.breadcrumb).hasClass("hidden") ) {
			$(this.breadcrumb)
				.css("visibility", "visible")
				.fadeIn(200, function(){
					$(this).removeClass("hidden");
				});
		}
		
		if ( idView ) {
			this.order(idView);
			this.updateBreadcrumb(idView);
			this.currentViewID = idView;
		}
	}
	
});