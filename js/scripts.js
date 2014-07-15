//The nextNodes property will be for choices later on - there will be more than one, showing a choice. We then go 
//into the choice mode. 
var trackRoomScripts = {

	"trophy": [
		{
			message: "Hey there bub",
			displayTime: 0,
			timeOnScreen: 1300,
			nextNodes: 1,
			directedTo: "camera",
			whoSaysThis: "interactable",
		},
		{
			message: "Holy crap! A talking trophy! What are you for?",
			displayTime: 2000,
			timeOnScreen: 3000,
			nextNodes: 2,
			directedTo: "camera",
			whoSaysThis: "player",
		},
		{
			message: "I know I'm breaking the fourth wall.",
			//This will be used for timing but most oftwn will be zero
			displayTime: 5000,
			timeOnScreen: 2000,
			nextNodes: 3,
			directedTo: "camera",
			whoSaysThis: "interactable",
			stoppingPoint: true,
		},

		{
			message: "Yep, you're talking to me again.",
			displayTime: 0,
			nextNodes: null,
			directedTo: "player",
			whoSaysThis: "interactable",
		},

	],

};
	