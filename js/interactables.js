//this will be a file that determines all interractables - that is, the things that can be interacted with! (duh)
// this will be doors, items, people, all other things. We can have special cases for npoc, doors, keys and stuff.
// for now, let's keep things simple and assume everything's spot will be defined by a rectangle

//should coordinates be an obejct as well?


//let's write the code for an item to begin with - just to be simple.
function Interactable(options) {
    //Should these have urls or associated rooms? Actually they can jsut be passed in 
    _.defaults(options, {
        width: 32,
        height: 32,
        left: 0,
        top: 0,
        imageURL: "images/rooms/999/interactables/999.png",
        description: "This is the default description",
        name: "test",
        acceptsItems: ["someItem", "test"],
        //Why is this called activate? This is the on-click function, but we want a more generic term, I think - for tablets and such.
        //This is the topmost - this is what absolutely happens when the elemnt is clicked. We can choose to show the UI, or do something completely different.
        activate: function() {
            //The default here doesn't work - it's the this
            Declination.game.interactableClicked(this);
        },
        onLook: function() {
            //mainGuy, "I can't look at this.");
            console.log("Default on look");
        },
        onTalk: function() {
            //Declination.game.characterSay(mainGuy, "I don't want to talk to this.");
            console.log("Default on talk");
        },
        onUse: function() {
            //Declination.game.characterSay(mainGuy, "I can't use that.");
            console.log("Default on use");
        },
        onTake: function() {
            console.log("I can't take this");
        },
    });

    console.log("Creating entity with options", options);
    //The doors and items and npc can be derived from this. 
    
    //This should really be done in a loop
    this.top = options.top;
    this.left = options.left;
    this.description = options.description;
    this.activate = options.activate;
    this.onLook = options.onLook;
    this.onTalk = options.onTalk;
    this.onUse = options.onUse;
    this.name = options.name;
    this.imageURL = options.imageURL;
    this.width = options.width;
    this.height = options.height;
    this.xCenter = options.xCenter;
    this.yCenter = options.yCenter;
    this.onTake = options.onTake;
    this.combinesWith = options.combinesWith;

    //this.inventoryElement = Here will be a jquery element that we create on init, for them to add to the inventory. It
    this.inventoryElement = $("<img/>", {
        "src": this.imageURL,
        "id": this.name + "inv",
        "class": "inventoryImage", //This should be less magic
    }).css({
        //here will go some css stuff...I think mostly for positioning and class
    });

    this.domElement = $("<img/>", {
            "src": this.imageURL,
            "id": this.name,
    }).css({
            "top": this.top + "px",
            "left": this.left + "px",
            "width": this.width + "px",
            "height": this.height + "px",
            "position": "absolute",
    }).addClass("interactable");;

    if (options.script) {
        //Create a new dialog set
        this.dialog = new DialogSet(this, options.script);
    }
    
    /*
    this.generateDomElement = function() {
        //Generates a DOME element! ....
        //This will return the dom element of the interactable - this is because the traits will be different 
        //based on which type of interactable we are. (People have animations and text, etc.)
        //Actually...it might be worth it to move ALL of the interactable stuff to this instead of main.
        //Not now though. "Eventually"! (Which...in programming...means this will stay permanent!)
        console.log("Creating the interactable", this);
            
        var itemElement = $("<img/>", {
            "src": this.imageURL,
            "id": this.name,
        });
        
        itemElement.css({
            "top": this.top + "px",
            "left": this.left + "px",
            "width": this.width + "px",
            "height": this.height + "px",
            "position": "absolute",
        }).addClass("interactable");;
        
        this.domElement = itemElement;
        return itemElement;
        
    };
    */
    
    //Private
    this.addToInventory = function() {
        //What is best - generate this on init, or not? I guess not - that way we only get it for pickupable items
        // Ok, what's the best way to handle which item is "active" - that is, following the mouse?
        // There could be a global mode tat looks - or we could just have a click event on each item for the CORRECT one - 
       	// In other words - 
        //
        // combinesWith: [{
        // 		name: item description
        //		action: function() {
        //			this is the stuff that happens when it is clicked on with the correct item
        //
        // That way we could have the items we want specialized responses for to be on there, and then we could leave the rest up to a default.
        // we could have a "mode" thatholds which item is selected and whether it is on or not
    	var inventoryElement = $("<img/>", {
        	"src": this.imageURL,
        	"id": this.name+ "inv",
        	"class": "inventoryImage", //This should be less magic
            "style": "z-index: 20",
    	}).click(function() {
        	//The clicky stuff should happen here    
            //This is what happens when you clikc the item in the inventory
            //This can't be the best way to do this
            Declination.game.combinationMode = true;
            $(inventoryElement).css({
                "position": "absolute",
            });
            $("#playArea").mousemove(function(e) {
              //Here we need to check what the active div is to make sure that we position 
              //the element correctly
              $(inventoryElement).css({
                  "top": e.offsetX,
                  "left": e.offsetY,
              });
            });
            
        });
        //TODO: This should be animated! Not going to worry about that now though.
        $("#inventory").append(inventoryElement);
        
        //Then we need to remove the item from the playing field
        this.DomElement.remove();
    };
    
    this.combineWith = function(incomingEntity) {
       //should this be public or private? 
       if ($.inArray(incomingEntity.name, this.acceptsItems)) {
           
       }
    };
}