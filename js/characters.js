//This is the file that contains classes and other stuff for characters  - mostly now the player
//TODO: Think of a better name for this
//What sort of functions do we need to have here?
/*
function Character() {
    this.currentRoom = 999;
    
    this.say = function(text) {
    	//This function will display the "said" text over the character
    }
}
*/


//can eventually be configured; not right now.
//need to come up with a standardized image size for the character
//or maybe a caling constant
	//Hm - I could have a function that removes the dialog box. this could be removed after a certain time
	//do I need a new class?
	//seems like that would be a good thing to do - these will need more functions
	//draft:

function Player() {
	this.name = "Vick Nandine";
	this.id = "player";
	this.height = 100; //The purpose of this is to not have to deal with using the "px" terms if retrieving from css - but jquery already has somethign for that d'oh
	this.width = 100;
	this.height = 215;
	this.images =  {
		walking: "images/player/walking.png",
		//talking: null,
		standing: "images/player/standing.png",
		toCamera: "images/plater/toCamera.png",
	};



	var domElement = $("<img/>", {
		"src": this.images.standing,
		"id": this.id,
	});

	domElement.css({
		"position": "absolute",
		"pointer-events": "none",
		"height" : this.height + "px"
	})

	this.domElement = domElement;

	console.log("creating new dialog display for player with this", this);
    this.dialogDisplay = new DialogDisplay(this);
	/*
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

	this.changeMode = function(mode) {
		switch(mode) {
			case "standing":
				this.domElement.
		}
	};

	*/
	this.drawInRoom = function(room) {
		//This will draw the guy on the track.
		//We will NOT have a function that REMOVES the player here - that will be done in the 
		//functions that draw a new room / get rid of the old one
		console.log("drawing PLAYER in the room");
		var playerHeight = this.height;
		var trackPosition = room.trackPosition;

		var feetYCoordinate = trackPosition - playerHeight //Because feet are usually at the bottom. Of the character image.

		console.log("ASDJWEBWERBWEJRBNWEJRW", this.domElement, this.id, room, trackPosition, playerHeight, feetYCoordinate);
		this.domElement.css({
			"top": feetYCoordinate + "px",
			"left": room.xStart + "px",
		});

		//now have to append the image element to the room 

		$(Declination.config.roomId).append(this.domElement);

		this.currentX = room.xStart;


	}





	// (replaced by the dialogdisplay class) this.say = function(message, target, additionalStyle) {

	this.translateTo = function(xCoord, callback) {
		//AH! We could also use this for cinematics!
		//maybe it could take in an entity instead?
		var distance = xCoord - this.currentX;
		if (distance < 0) {
			console.log("reversin", this);
			Declination.game.player.domElement.addClass(".reversed");
			Declination.game.player.domElement.css({"-webkit-transform": "scaleX(-1);"})
		}
		this.domElement.attr("src", this.images.walking);
		//and then we need stuff to happen on the complete
		//will have to do more research to see which transition appears more natural
		console.log(calculateWalkingTime(distance, 500), distance);
		//We need to flip the image if he is going to the left.
		this.domElement.transition({x: xCoord + "px"}, calculateWalkingTime(Math.abs(distance), 150), "linear", function(){
			Declination.game.player.domElement.removeClass(".reversed");
			Declination.game.player.domElement.attr("src", Declination.game.player.images.standing);
			Declination.game.player.currentX = xCoord;
			console.log("Callback completed. [this, x coord]", this, xCoord);
			callback ? callback() : console.log("No callback for translateTo");
		});


	}


	//Need to have a function here to calculate the time given a velocity
	//d=vt
	//t = d/v
	//I guess it should be in pixels / sec
	//distance in pixels
	function calculateWalkingTime(distance, walkSpeed) {
		return (distance / walkSpeed) * 1000;
	}
	/*
	heelo
	my name is super awesome girl
	I am an alien
	And I want to kiss people everywhere
	I am a hugger TOo 
	that is super awesome
	muahahahahahaha
	kakakakakaka
	I am next to my boyfriend who is super tired and has to do his homework
	He is reading a book about something economics that I have no idea about!
	It's not that I am stupid.
	It is that I hate economics
	Therefore, I dont want to care what the fuck he is reading about
	He is yawning now
	He hasn't brushed his teeth
	Ewwww
	Ok...
	"Go brush your teeth", I said
	"Or I will not kiss you"
	And he obediently got out of bed to go brush his teeth
	Adorkable!
	I am in the room alone now because he is in the bathroom brushing his teeth
	I should go finish that dumb lab report that I was bullshitting on earlier.
	Just want to say to my boyfriend who will get back from brushing his teeth and will read this:

	Babe, I love you.
	I know I say it a lot! I know I nag a lot! I know I am bossy, too!
	But I love you with all of my heart!

	AAAAaAAAAAAA
	This is sooooooooooo cheesy that I cant stand it anymore
	Gotta go!
	Bye babe!
	I will be back to kiss you
	*/

}


//impormptu brainstorm
//
// to get a constant rat ethe moveing animation function should be stepped out as so:
//		get distance to point
//		at the given rate, calculate time in ms to get there and plug that in to the jquery translate
//


//Here is a dialog thing, is this needed?
//What does this need to do? It needs to handle one "Block" of text and 
//tell the calling function where to go "next"
//once the nextDialog thing is null, we can have a default leave message
//Maybe it can be like a linked list? while the next dialog isn't null, 
//
// -Display the text given
// -Display the response choices given
// -Have a listener on the response choice <p> tags and that listener will be a function that just
//	sets the nextDialog parameter to the number that we want to go to
// -By which mechanism will the dialog move forward? here is the action chain:
// 		-The user clicks on the guy
//		-This calls the action popup, the mouth is selected
//		-This starts the dialog function. The function will:
//			-Take in Jerry's character entry
//			-Enter a sort of "locked" dialog mode - nothing else can be clicked when in this mode, only the dialog options
//			-Display the 0th array element - the introduction
//
//
//
//

/*
function DialogBlock(text) {


}

var Testingford = new Interactable({
	left: 500,
	top: 100,

})
*/
/*
var Characters = {
	Jerry: {
		name: "Jerry Testingford",
		//Okay, so here goes the first implementation of the dialog engine.
		//Something like this: http://stackoverflow.com/questions/1840154/rpg-dialogue-engine-structure
		//I think the dialog will be kept in a big array, and each element will be an object with the dialog and responses.
		dialog: dialog.load("jerry", "../dialog/testingford/testDialog.txt")
	}
}
*/
