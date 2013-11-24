//This will be a library that generates rooms from json - the basic concept, I think, will be 
// an array full of these room objects. Basically, they will contain a  bunch of options with things to happen on enter, 
// the picture for the room, and various methods of interaction with that picture, and other things.
//First things first - we need a way of relating these rooms to each other, I think.
// Maybe some form of id? Or a BIGGER structure to handle the rooms as a whole - the "Game Environment"? Or RoomSet?
//should use this:
// http://stackoverflow.com/questions/2159044/getting-the-x-y-coordinates-of-a-mouse-click-on-an-image-with-jquery
//jquery can get the coords of a click - we can check if the click is within the coords of an object, and then 
//we go from there
var sampleRoom = {
    onEnter: "You enter the sample room. It's bland, and there's an old lady in the corner giving away toothpicks with small bits of meat on the end.",
    roomImage: "images/rooms/001.png",
    items: [
        new Interactable("something"),
        new Interactable("something else")
    ]
};

//This will take in an array, I think, of all the rooms
function RoomSet(rooms) {
    "use strict";
 
    
}

function Room(options) {
    "use strict";
    
    this.createRoom = function (options) {
        //this is where we would make the map invisible, and then overlay the room page on top.
        //something like 
        //Game.RoomMode();
        //this function would de-activate the map and switch to the overall room thing
        // we need a function to create the room div as well as destroy it completely when we're done.
        // and just for placeholding (really we will grab it from the global variable):
        
        var roomElement = "#room";
        _.each(options.interactables, function(entity) {
            //var html = "<img src='";
            
            //html += entity.imageName + "' id='" + entity.id + "'";
            
            var itemElement = $("<img/>", {
                "src": entity.imageName,
                "id": entity.id,
            });
            
            itemElement.css({
                "top": entity.topCoord,
                "left": entity.leftCoord,
                "position": absolute,
            });
            
            $(roomElement).append(itemElement);
            
            if (entity.activate) {
                //Add a listener to the element for a click
                //the functioni is in the entity activation
                $("#" + entity.id).click(entity.activate);
                
            }
            
            
        });
    };
}
