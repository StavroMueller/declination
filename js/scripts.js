var trackRoomScripts = {

	"trophy": [
		{
			message: "Hey there bub",
			displayTime: 2000,
			nextNodes: 1,
			directedTo: "camera",
			whoSaysThis: "interactable",
		},

		{
			message: "I know I'm breaking the fourth wall.",
			//This will be used for timing but most oftwn will be zero
			displayTime: 3000,
			nextNodes: 2,
			directedTo: "camera",
			whoSaysThis: "interactable",
			stoppingPoint: true,
		},

		{
			message: "Yep, you're talking to me again.",
			displayTime: 2000,
			nextNodes: null,
			directedTo: "player",
			whoSaysThis: "interactable",
		},

	],

};
	