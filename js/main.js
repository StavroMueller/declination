var Declination = {
	config: {
        mapId: "#map",
        roomId: "#room",
        uiPopup: {
            id: "popup",
            talkId: "#talkto",
            lookId: "#lookat",
            pickupId: "#pickup",
        },
    }
};

// This will handle strictly game mechanic stuff - 
// Randomness, chances, that sort of thing
Declination.game = {

	init: function () {
		console.log("game init");
        
        //I guess we can hold the inventory here
        this.inventory = {
            
            addItem: function(item) {
                //This will just accept the interactable object.
                //Will take in an item obejct? Should these be bare objects or translated from something else?
                //Maybe an interactable can have a .geItemVersion? Actually that would be A case, but not THE case.
                //This should take in an obect by default. 
                //All we need is a description and an image - and something that it combines with? need to think more about how this will work with everything else
                //What it will look like:
                //
                //{
               	//  id: 999,
                //  inventoryImage: "someurl/to/this/item",
                //}
                
            },
            
        };
        
        this.interactableClicked = function(interactable) {
            console.log("The interactable", interactable.shortDescription, "has been clicked.");
            Declination.ui.showClickPopup(interactable);
        };
	}
};

// This will do anything that manipulates the DOM for ui stuff.
Declination.ui = {
    
    //activeMode: "map",
    
    init: function() {
        console.log("initted");    
    },
    
    showClickPopup: function(interactable) {
        $(Declination.config.uiPopupId).fadeIn(500, function() {
            
    	});
    }
    
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
                    console.log("map case in mode");
                    break;
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