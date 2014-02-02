//This will be a library that generates rooms from json - the basic concept, I think, will be 
// an array full of these room objects. Basically, they will contain a  bunch of options with things to happen on enter, 
// the picture for the room, and various methods of interaction with that picture, and other things.
//First things first - we need a way of relating these rooms to each other, I think.
// Maybe some form of id? Or a BIGGER structure to handle the rooms as a whole - the "Game Environment"? Or RoomSet?
//should use this:
// http://stackoverflow.com/questions/2159044/getting-the-x-y-coordinates-of-a-mouse-click-on-an-image-with-jquery
//jquery can get the coords of a click - we can check if the click is within the coords of an object, and then 
//we go from there
//Here are some sample interactables
var JerryTestingford = new Interactable({
    top: 40,
    left: 30,
    //imageURL: Characters['Jerry'].imageURL,
    shortDescription: "Jerrymeister",
    description: "He was always the bell of the ball",
    activate: function(event, entity) {
        Declination.ui.showClickPopup(event, entity);
    },
    onLook: function() {
        Declination.ui.showMonologue("It's old jerry. He's the tester.")
    },
    onUse: function() {
        Declination.ui.showMonologue("I don't use people");
    },
    onTake: function() {
        Declination.ui.showMonologue("Nah");
    },
    onMouth: function(event, entity) {
        //Declination.game.startDialog(Characters['Jerry'].dialog);
    },

});

var sampleRoomConfig = {
    onEnter: "You enter the sample room. It's bland, and there's an old lady in the corner giving away toothpicks with small bits of meat on the end.",
    bgImage: "images/rooms/001.png",
    id: "999",
    interactables: [
        new Interactable({
        	left: 50,
            top: 50,
            shortDescription: "testinstuffs",
            activate: function(event, entity) {
                //This happens whenever the event is clicked - the first is the jquery event
                //Why a seperate activate function? Because maybe we don't want to show the UI every time.
                console.log("I'm the number one activator!");
                Declination.ui.showClickPopup(event,entity);
            },
            onLook: function() {
                //Declination.game.say("This object makes me feel testy.")
                console.log("I'm looking at the", this.shortDescription, "!", "For", this);
                
            },
            onUse: function() {
                //Declination.game.say("Yes, I feel like this belongs in my pocket.");
                //Declination.game.addToInventory(this);
                //Declination.game.removeFromRoom(this);
                console.log("use me");
                
            },
            onTake: function() {
            	//Declination.game.say("TAKING the TEST item!");   
                this.addToInventory();
            },
    
        }),
        new Interactable({
            left: 100,
            top: 100,
            description: "This is another object",
            shortDescription: "test2",
            activate: function() {
                console.log("meep");
            },
        }),//The defaults will take care of the dev object
        new Interactable({
            left: 300,
            top: 50,
            description: "blah",
            shortDescription: "farAway",
        }),
    ]
};

//This will take in an array, I think, of all the rooms
//This will be a two dimensional array of all the rooms, handling their relations and such 
function RoomSet(roomArray) {
    this.currentPosition = {x: 0, y: 0};
    this.rooms = roomArray;

    //This should have functions for:
    //
    //  Generating ("drawing") the current room
    //  
    //
    //
    //
    //
    //
}

//The options object will look something like this:
//{
//	roomId: 999 //The id for the room - used to locate all the resources
//  interactables: [
//		new Interactable("Door", 16, 16)
//
//
//
//
//
//
//
//
//
//

//There should be a function to only draw the entitie that haven't been picked up
function Room(options) {
    "use strict";
    
    this.interactables = options.interactables;
    this.id = options.id;
    
    this.draw = function () {
        //this is where we would make the map invisible, and then overlay the room page on top.
        //something like 
        //Game.RoomMode();
        //this function would de-activate the map and switch to the overall room thing
        // we need a function to create the room div as well as destroy it completely when we're done.
        // and just for placeholding (really we will grab it from the global variable):
        
        var roomDiv= "#room";
       	
        var roomImgElement = $("<img/>", {
            "src": "images/rooms/" + this.id + "/backgrounds/main.png",
            "id": "roomBG",
            "width": "100%",
            "height": "100%",
        }); 
        //let's see what we need first
        //roomImgElement.css({
        $(roomDiv).empty(); 
       	$(roomDiv).append(roomImgElement);
       	console.log("Created Room"); 
        _.each(this.interactables, function(entity) {
            //The idea here - each "interactable" will be a div, that just fits an image.
            //This image we will then define where it will be placed absolutely inside the "room"
            // this means, for example, if we have a ball of size 32x32, and we want to position relative to the center,
            // we will pass in 16,16 - kind of like the way you make a custom marker.
            //var html = "<img src='";
            
            //html += entity.imageName + "' id='" + entity.id + "'";
        	console.log("Creating the interactable", entity);
        	console.log(entity.activate);
            var domElement = entity.generateDOMElement();
            
        	console.log("Created the" , entity.shortDescription, "element as html:" , domElement);
            $(roomDiv).append(domElement);
            
        	/*
            if (typeof(entity.activate) != 'undefined') {
        		console.log("There was a click for the entity", entity);
                //Add a listener to the element for a click
                //the functioni is in the entity activation
                $("#" + entity.shortDescription).click(function(event) {
        			entity.activate(event, entity);
        		});
                
            }
            */
            
            
        });
        
        $(".interactable").bind('click', {interactables: this.interactables,},function(event) {
       		//so, what needs to happen here? The modal window needs to be shown at the click location, and has to be edited according to the 
        	//particular interactable.
        	//Why is this a class now instead of being on each object? Because we want one modal window generation, not multiples.
        	console.log(event.data.interactables);
        	var id = this.id;
        	console.log(id," was clicked");
        	//I really don't want to do a search through all of the interactables...
        	//But seems to me, at least when I am tired and stressed, that that's the only way to go.
        	_.each(event.data.interactables, function(entity) {
        		//(The div id is the short description)
        		console.log(entity.shortDescription, id);
        		if (entity.shortDescription == id) {
        			console.log("Calling click popup");
        			//Here is where we could put the click handlers? We need one for a:
        			//
        			// Regular click
        			// and a click in the "combination mode"
        			if (Declination.game.combinationMode) {
        				//Do the combination mode stuff here
        				console.log("Turning off combination mode");
        				Declination.game.combinationMode = false;
        				entity.combineWith(Declination.game.getCombiningItem());
        			}
        			else {
                        //if it can be picked up
                        console.log("Popping off the entity", entity)
                        event.data.interactables.pop[entity];
        				Declination.ui.showClickPopup(event, entity);
        			}
        			return;
        		}
        	});
        });
    };
    
}
