var Declination = {
	config: {
        mapId: "#map",
        roomId: "#room",
        inventoryId: "#inventory",
        choiceBoxId: "#choices",
        selfId: "#self",
        uiPopup: {
            id: "#clickMenu",
            itemNameId: "#itemName",
            uiImageClass: ".uiImage",
            talkId: "#talkIcon",
            lookId: "#lookIcon",
            useId: "#useIcon",
           	takeId: "#takeIcon", 
        },
        //non html stuff
        currentRoom: "trackRoom",
    },
};

Declination.player = new Player();

// This will handle strictly game mechanic stuff - 
// Randomness, chances, that sort of thing
Declination.game = {
    
    combinationMode: false,

    player: new Player(),

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
            console.log("The interactable", interactable.name, "has been clicked.");
            Declination.ui.showClickPopup(interactable);
        };
	},

    changeRoom: function(roomId) {
        Declination.rooms[roomId].draw();

    }
};

// This will do anything that manipulates the DOM for ui stuff.
Declination.ui = {
    
    //activeMode: "map",
    
    popupActive: false,
    
    init: function() {
        //I think all the permanent listeners should be here  - the one to close the clck dialog in specific
        $("#closeText").click(function() {
            $(Declination.config.uiPopup.id).removeClass("md-show");
        });
        console.log("Drawing current room", Declination.config.currentRoom);
        var firstRoom = new Room(Declination.rooms[Declination.config.currentRoom]);
        firstRoom.draw();
        console.log("initted");    
    },
    
    repositionAndRedesignate: function(event, interactable, visible) {
        //First, we need to move the popup.
        console.log("Showing ye olde popup with for event", event, "on interactable", interactable); 
        console.log("Adding top style", event.currentTarget.style.top.match(/\d+/g), "type", typeof(event.currentTarget.style.top), "to offsetX", event.offsetX, "type", typeof(event.offsetX), "a total of", (parseInt(event.currentTarget.style.top.match(/\d+/g)[0]) + event.offsetX) + "px");
        if (visible) {
           $(Declination.config.uiPopup.id).animate({
           		"top": (parseInt(event.currentTarget.style.top.match(/\d+/g)[0]) + event.offsetY) + "px",
                "left": (parseInt(event.currentTarget.style.left.match(/\d+/g)[0]) + event.offsetX) + "px",
           });
        }
        else {
            $(Declination.config.uiPopup.id).css({
               //There might could be a global parameter instead of px - that way can change to percent easily for scaling
               //There's gotta be a better way to do this
               "top": (parseInt(event.currentTarget.style.top.match(/\d+/g)[0]) + event.offsetY) + "px",
               "left": (parseInt(event.currentTarget.style.left.match(/\d+/g)[0]) + event.offsetX) + "px",
            });
        }
        $(Declination.config.uiPopup.itemNameId).text(interactable.name);
        
        //Then, we make new listeners. First we have to remove the old ones. (From all of the ui images)
        $(Declination.config.uiPopup.uiImageClass).off();
        $(Declination.config.uiPopup.lookId).click(function() {
            $(Declination.config.uiPopup.id).removeClass("md-show");
            interactable.onLook();
        });
        $(Declination.config.uiPopup.takeId).click(function() {
            $(Declination.config.uiPopup.id).removeClass("md-show");
            console.log("Taking", interactable);
            interactable.onTake();
        });
        
    },
    
    showClickPopup: function(event, interactable) {
        console.log("=====================clickpupup===============");
        //If there is no modal open: fade in and show.
        //If there is a modal open but on the wrong interactable, fade it out and then in at the right spot.
        //Otherwise, close the modal. (maybe done with a listener on the room itself)
        //
        //What needs to happen?
        //-The div needs to disappear
        //-Everything else happens
        //-The div appears
        //We want to avoid any UI weirdness for the user - the UI moving and then disappearing, etc.
        //So - we need an if at the beginning
        //These steps below happen regardless of the visibility of the popup
        //Now we decide how to show the popup
        //TODO: I think the .on is stacking, making multiple listeners. FIX THIS - UNACCEPTABLE
        //New plan - just translate the damn thing to the new position.
        //Transitions are taken care of in the css
        
        if ($(Declination.config.uiPopup.id).css("visibility") == "visible") {
            console.log("it's visible");
            Declination.ui.repositionAndRedesignate(event, interactable, true);
        } else {
            //This means the dialog is not visible
            console.log("It isn't visible.");
            this.repositionAndRedesignate(event, interactable, false);
            $(Declination.config.uiPopup.id).addClass("md-show");
        }
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
	},

    displayConversationText: function(text, interactable) {
        console.log("Display text '", text, "' on", interactable);
    }
};

$(document).ready(function() {
    Declination.game.init();
    Declination.ui.init();
});