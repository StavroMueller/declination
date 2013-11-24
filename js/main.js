var Declination = {
	config: {
        mapId = "#map",
        roomId = "#room",
    }
};

// This will handle strictly game mechanic stuff - 
// Randomness, chances, that sort of thing
Declination.game = {

	init: function() {
		console.log("game init");

	}

}

// This will do anything that manipulates the DOM for ui stuff.
Declination.ui = {
    
    //activeMode: "map",
    
    init: function() {
    	console.log("initted");    
    },
    
    setMode: function(mode) {
        //The modes will only ever be ON TOP of the map; we don't have to worry about setting the map, because it is always "underneath"
        if (this.activeMode == mode) {
            console.log("already in the mode of", mode);
        }
        else {
            switch(mode) {
                case "map":
                    
                    
        }
	},
    
    clearCurrentDisplay: function() {
        //This will remove the current mode overlay, making just the map visible.
        
    }
}

$(document).ready(function() {
    console.log("doc ready");
}