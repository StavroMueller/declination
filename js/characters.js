//TODO: Think of a better name for this
//What sort of functions do we need to have here?
function Character() {
    this.currentRoom = 999;
    
    this.say = function(text) {
    	//This function will display the "said" text over the character
    }
}


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

function DialogBlock(text) {


}

var Testingford = new Interactable({
	left: 500,
	top: 100,

})


var Characters  {
	Jerry: {
		name: "Jerry Testingford",
		something: 3,
		firstTime: true,
		//Okay, so here goes the first implementation of the dialog engine.
		//Something like this: http://stackoverflow.com/questions/1840154/rpg-dialogue-engine-structure
		//I think the dialog will be kept in a big array, and each element will be an object with the dialog and responses.
		currentDialog: 0,
		dialog:[{

		},
		{

		}


		]
			//Here goes a big ol dialog thing for jerry
	}
}
