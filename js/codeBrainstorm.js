//Brainstorming the dialog structure
//THERE DOES EXIST a dialogue library - dialogue js, but I want to try my hand at it first. 
//Re-inventing the wheel is good, right?

var dialog = [
	{msg: "Here is my intro text"},
	{
		msg: "It goes line by line, just like adenture games.",
		response: "Well, isn't that just great."
	},
	{question: "What's the redness of a diabolic squeeze?" answers: [
		{}
	]}
]

var dialog = [{
	msg:["Hey there", "This is a multi stage comment"]


	}
]

while dialogStep < dialog.length {
	n
}

Something.oncliuc = function() {
	pricessDialog(dialogForThisCharacter);
}

var dialog = [
	{messages: ["Here is my intro text", "There are small pauses"]},
	
		msg: "It goes line by line, just like adenture games.",
		response: "Well, isn't that just great."
	},
	{question: "What's the redness of a diabolic squeeze?" answers: [
		{}
	]}
]

//setTimeout(showNextDualogPiece, 5000)
//So it's pasically a linked list? like a path! with costs...
function Dialoge

rapport: [{
	id: 0,
	msg: "Hi there",
	time: 4000,
	//or camera
	to: "other",
},
{
	id: 1,
	msg: "I'm a test dialogrue",
	time: 1000,
	to: "other",
}

//Here are some HARD AND FAST rules that I will be assuming when programming this dialog:
// An exchange between two people will be contained in ONE rapport object
// Might as well stick to the same naming convention - player for us, and "interactable" for the thing
// saying the stuff. How's that for specific?
//
//
//
//
//


rapport = {
	0: {
		message: "Hey there bub",
		displayTime: 5000,
		nextNode: 1,
		directedTo: "camera",
		whoSaysThis: "Interactable",
	},

	1: {
		message: "I know I'm breaking the fourth wall."
		displayTime: 5000,
		nextNode: 2,
		directedTo: "camera",
		whoSaysThis: "Interactable",
	}


};

//there should also be a blank thing too for comedic timing

rapport = {
	0: {
		message: "Hey there bub",
		displayTime: 5000,
		nextNode: [1],
		directedTo: "camera",
		whoSaysThis: "interactable",
	},

	1: {
		message: "I know I'm breaking the fourth wall."
		displayTime: 5000,
		nextNodes: [2],
		directedTo: "camera",
		whoSaysThis: "interactable",
	}

	2: {
		message: "So, what do you want?"
		displayTime: 4000,
		nextNodes:[3,4],
		directedTo: "player",
		whoSaysThis: "interactable",
	}


};



//THIS will take in all of the dialog - just json text I think - and make it into a functional thing
function DialogTree(dialog) {
	this.currentDialog = dialog.currentDialog;

}

//There really should be built in conditions
//Because I was confusing things - how to STORE dialog, and how to excecute the stuff that goes on in it.

var dialog = {
	//For future expansion - could include a main menu of sorts to avoid repetition.
	//We can generate the html for all the trees already here?
	//Or should we not pollute the content data structure with processing functions?
	showBaseChoices: function(){
		_.each(this.baseChoices, function(choice){

		});
	}
	currentDialog: "intro",
	baseChoices: //This is the TOP LEVEL choice stuff


	"intro": {
		condition: null; //so that we acn check for things?
		messages: [{
				toward: "This is the player talking to an npc. I'm the player."

			}, 
			{ 
				//Each of these is one line said by one character
				away: "Here is my intro text bub",
				//Because "Away" and "Toward" make the most sense to me at this point in time.
				action: function() {
					//this is so we can do things, like plan animations and such
				}
			},
			{
				away: "It is split up all nicely.",
				action: function() {
					//again...to do stuff
				}
			}],
		choice: {
			away: "So, what'll it be?"
			nextC//This needs to be special things that when chosen (on click) does something
					//Maybe a function that waits for a response then returns a value?


		}
		// I can have this return a value! So it takes care of everything! Theoretically...
		nextChoice: Declination.game.dialog.choice({
			msg: "Why are you here?"
			takesYouTo: "1"
		},
		{
			msg: "Bye."
			takesYouTo: "exit"
		}),
	},
	//When entering new conversation, but already spoke the first time.
	"0": {
		condition: null,
		messages: [{
			away: "Fancy seeing you again!"
		}]

		//Display current "menu" here
		//This should be some sort of data structure that I can just pop trees off as they 
		//are "completed"

		choices: 

	},
	"1": {
		condition: null,
		messages: [{
			away: "Why am I here? Because some dude wanted to test dialog. It sucks!",
			toward: "I'm glad I'm not you."
		},
		{
			away: "It's not that bad."

		}]
		nextChoice: null,
	}

	"exit": {
		condition: null,
		away: "Seeya.",
		action: this.nextDialog = null,

	}
}

Declination.game.dialog.choice = function(choices) {
	_.each(choices, function(choice){
		Declination.ui.addChoice(choice)
	})

}

Declination.ui.addChoice = function(choice) {
	$(Declination.config.choiceBoxId)
		.append("<p class='dialogChoice'>" + choice.msg + "</p>")
		.click()

}

Declination.game.startDialog = function(, npx)

Declination.game.startDialog = function(characterDialog, character){
	//CharacterDialog - the dialog object
	//character - the interactable - used for positioning and linking the
	//text to actual people
	//Mostly - this will deactivate stuff, I think.
	var speakingNPC = character;
	Declination.game.dialogMode()
	var nextDialog = character.dialog.nextDialog;
	while (nextDialog != null) {
		var currentDialog = character.dialog[character.dialog.currentDialog] //This gets the current "step" in the conversation
		_.each(currentDialog.messages, function(interaction){
			//Here is where we will have to wait, or something
			//Character.playTalkingAnimation
			//The text is going "toward" the npc
			if (toward) {
				Declination.ui.displayConversationText(interaction.away, Declination.config.selfId) //This is a string and the character
			}
			else if (away) {
				Declination.ui.displayConversationText(interaction.away, speakingNPC) //This is a string and the character
			}
			if (interaction.action) interaction.action(); //Run the action if it exists
		})
	}
}

//Here's another way of doing it - the dialog object has stuff like:
//
//{
//  id: "intro"
//}
//{
//  id: "1"
//}
//
//
//
//
//
//


function ProcessDialog(dialog) { 
	_.each(dialog, function(dialogPiece){
		//Step through the array
		//Where should the condictionals go?
		_.each(dialog.msg, function(message) {

		})
	})

	while (currentDialog.next != null) {
		//something here with the indexing; we need where to tell it to go next
	}

}

//What do I *want*? There needs to be conditionals and dynamic
//We could avoid the exit problem by popping off each dialog thing, and then we would only be left with 

var dialog = [{
	condition: null;
	message: ["Hey there", "Here is my introduction"],
	response: ["Well that's just great"],

}]