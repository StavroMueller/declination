$(document).ready(function() {
	console.log("read");
	setTimeout(function() {$("#rightSide").hide().fadeIn(2000, function() {
		console.log("donee");
	});
	},
	1000);
	
});