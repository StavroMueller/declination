var Declination = {
	config: {
        mapId: "#map",
        roomId: "#room"
    }
};

// This will handle strictly game mechanic stuff - 
// Randomness, chances, that sort of thing
Declination.game = {

	init: function () {
		console.log("game init");

	}
};

// This will do anything that manipulates the DOM for ui stuff.
Declination.ui = {
    
    //activeMode: "map",
    
    init: function() {
        console.log("initted");    
    },
    
    setMode: function(mode) {
        //The modes will only ever be ON TOP of the map; we don't have to worry about setting the map, because it is always "underneath"
        // I think we want the map to clide up and down on top of the guys
        if (this.activeMode == mode) {
            console.log("already in the mode of", mode);
        }
        else {
            switch(mode) {
                case "room":
                    console.log("Switching to", mode, "mode with id", "#" + mode);
                    console.log(this);
                    $(Declination.config.mapI).slideUp("slow");
                    //$("#" + mode).slideDown("slow");
                    this.activeMode = mode;
                    console.log("Successfully switched to", mode, "mode");
                    break;
                case "map":
                    
                default: 
                    console.log("Default case for switcher with mode", mode);
            }
        }
	},
    
    clearCurrentDisplay: function() {
        //This will remove the current mode overlay, making just the map visible.
        $(Declination.config.mapId).show();
        this.activeMode = "map";
    },
    
    addToInventory: function(itemId) {
    	//This will add a picture of the item to the inventory
        console.log("bloh");
	}
};

$(document).ready(function() {
    Declination.game.init();
    Declination.ui.init();
});