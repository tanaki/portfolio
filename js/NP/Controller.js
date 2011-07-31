console.log("change 3");

	
$.address
	.init(function(event) {
		console.log("init");
	})
	.change(function(event) {
		console.log("tatata");
		
		switch ( $.address.value() ) {
			case "/menu" : 
				
			break;
			default:
				
			break;
		}
	});
