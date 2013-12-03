//This will be a library that generates rooms from json - the basic concept, I think, will be 
// an array full of these room objects. Basically, they will contain a  bunch of options with things to happen on enter, 
// the picture for the room, and various methods of interaction with that picture, and other things.
//First things first - we need a way of relating these rooms to each other, I think.
// Maybe some form of id? Or a BIGGER structure to handle the rooms as a whole - the "Game Environment"? Or RoomSet?
//should use this:
// http://stackoverflow.com/questions/2159044/getting-the-x-y-coordinates-of-a-mouse-click-on-an-image-with-jquery
//jquery can get the coords of a click - we can check if the click is within the coords of an object, and then 
//we go from there
var sampleRoomConfig = {
    onEnter: "You enter the sample room. It's bland, and there's an old lady in the corner giving away toothpicks with small bits of meat on the end.",
    bgImage: "images/rooms/001.png",
    id: "999",
    interactables: [
        new Interactable({
        	left: 50,
            top: 50,
            activate: function() {
                console.log("I'm the number one activator!");
            },
        }),
        new Interactable({
            left: 100,
            top: 100,
            description: "This is another object",
            shortDescription: "test2"
        }),//The defaults will take care of the dev object
    ]
};

//This will take in an array, I think, of all the rooms
function RoomSet(rooms) {
    "use strict";
 
    
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
            
            if (typeof(entity.activate) != 'undefined') {
        		console.log("There was a click for the entity", entity);
                //Add a listener to the element for a click
                //the functioni is in the entity activation
                $("#" + entity.shortDescription).click(entity.activate);
                
            }
            
            
        });
    };
}
