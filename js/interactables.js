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
        shortDescription: "test",
        //We should be able to at leas make a square and a circle so you have to actually click on the object
        generalShape: "rectangle",
        //Why is this called activate? This is the on-click function, but we want a more generic term, I think - for tablets and such.
        //This is the topmost - this is what absolutely happens when the elemnt is clicked. We can choose to show the UI, or do something completely different.
        activate: function() {
            //The default here doesn't work - it's the this
            Declination.game.interactableClicked(this);
        },
        actions: {
            onLook: function() {
                Declination.game.characterSay(mainGuy, "I can't look at this.");
        	},
        	onTalk: function() {
            	Declination.game.characterSay(mainGuy, "I don't want to talk to this.");
        	},
            onUse: function() {
                Declination.game.characterSay(mainGuy, "I can't use that.");
            },
        },
    });
    console.log("Creating entity with options", options);
    //The doors and items and npc can be derived from this. 
    
    //This should really be done in a loop
    this.top = options.top;
    this.left = options.left;
    this.description = options.description;
    this.activate = options.activate;
    this.actions = options.actions;
    this.shortDescription = options.shortDescription;
    this.imageURL = options.imageURL;
    this.width = options.width;
    this.height = options.height;
    this.xCenter = options.xCenter;
    this.yCenter = options.yCenter;
    
    this.generateDOMElement = function() {
        //Generates a DOME element! ....
        //This will return the dom element of the interactable - this is because the traits will be different 
        //based on which type of interactable we are. (People have animations and text, etc.)
        console.log("Creating the interactable", this);
            
        var itemElement = $("<img/>", {
            "src": this.imageURL,
            "id": this.shortDescription,
        });
        
        itemElement.css({
            "top": this.top + "px",
            "left": this.left + "px",
            "width": this.width + "px",
            "height": this.height + "px",
            "position": "absolute",
        }).addClass("interactable");;
        
        return itemElement;
        
    };
}