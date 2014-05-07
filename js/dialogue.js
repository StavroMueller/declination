
// this is MY dialogue stuff - the library is in dialogueLibrary.js
//This strictly just handles the DISPLAY of the dialog. will be used in conjunction with whatever the hell library I want to use. 

function DialogDisplay(who) {
    //who will be the object passed in - either the player or an interactable
	//so...we pass in a target to be displayed on
	//it MUST then be the jquery object of that thing! The dom element
	console.log("Creating a new dialog display for", who);
    //this.who = who;
    //We need the target element and the text element for positioning purposes
    this.name = who.name;
	this.targetElement = who.domElement;
	this.textDomElement = $("<p class='dialog' />");
	this.textDomElement.text("This is default text. You shouldn't be seeing this.");
	this.defaultDisplayTime = 1500; //the time in ms we want to show the text
	console.log("the target element for", who.name, "is", this.targetElement);

	this.display = function(message, target, additionalStyle, displayTime) {
		if (additionalStyle) {
			this.textDomElement.css(additionalStyle);
		}

		if (target == "camera") {
			//Change image to face the camera
			console.log(message, ",", who.name, "said to the camera.")
		}
		else if (target = "other") {
			//Change image to standing image, facing the target probably?
			console.log(message, ",", who.name, "said to something.")
		}
		//the target is an "object"
		else {
			//we do something here
		}

		this.textDomElement.text(message)
		console.log("THE DOM ELEMENT IS ", this.targetElement, this);
		$(Declination.config.roomId).append(this.textDomElement)
        console.log(this.targetElement.position(), this.targetElement.height(), this.textDomElement.width())
		var textWidth = this.textDomElement.outerWidth();
		var topValue = (this.targetElement.position().top - this.textDomElement.height()) + "px";
		var leftValue = this.targetElement.position().left - ((textWidth / 2) - (this.targetElement.width() / 2)) + "px";
		this.textDomElement.css({
			"display" : "block",
			"top": topValue,
			"left": leftValue,
		});

		console.log("begfore the timeouts");
		setTimeout(function() { console.log("asd");}, 1000);
		displayTime ? setTimeout($.proxy(makeTextInvisible, this), displayTime) : setTimeout($.proxy(makeTextInvisible, this), this.defaultDisplayTime);

	};

	function makeTextInvisible() {
		//here will be the stuff that we want to happen to make the 
		console.log("MakingText invisible");
		console.log(this);
		this.textDomElement.css({
			"display": "none",
		});
		//p element not visible, probably just through css
	}
}


/*
Declination.dialog = {

	startDialog: function() {
	}

}
*/

/*

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
*/
//okay, this is going to be 
//OKAY - this will build a queue of the things that need to be said, up until the choice or when the thing needs to stop, that
//will then be iterated through with jquery
//I can just do a train of setTImeout functions that are cumulative with delays!
//
// setTimeout(show the dialog, 0)
// setTimeout(show the dialog, 0 + this dialog's time)
// setTimeout(show the dialog, (0+this dialog's time) + this dialog's time)
//
//
//





function DialogSet(who, script) {
	//eventually we can have this read from a file, if we want. 
	console.log("heybibble", script);
	this.script = script;
	console.log("biee", this.script);
	this.currentNode = 0;
	this.continue = true;
    this.name = who.name;
	this.targetElement = who.domElement;
	this.textDomElement = $("<p class='dialog' />");
	this.textDomElement.text("This is default text. You shouldn't be seeing this.");
	this.defaultDisplayTime = 1500; //the time in ms we want to show the text

	this.getDialog = function() {

		//this will return to the dialog thing the current dialog step
		//it will also handle formatting of responses in the future
		var currentScriptMessage = this.script[this.currentNode];
		console.log("current dialog message", currentScriptMessage, this, this.currentNode);
		this.currentNode = this.script[this.currentNode].nextNodes;
		return currentScriptMessage;


	};
    
    this.engageDialog = function() {
        
        //this will be some pretty heavy UI stuff
       	var startTime = new Date();
        
        //the interval at which we want the ticker to ...tick.
        //in milliseconds
        var interval = 500;
        
        //Get the current message
        console.log(this);
        console.log(this.script);
        var currentMessage = this.script.shift();
        var currentTime = startTime;
        
        //start the interval
        var dialogInterval = setInterval($.proxy(dialogTick, this), interval);
        
        function dialogTick() {
            //First, we update the time to the current ticker time
            console.log("intervalthing!");
            
            //First, we set the current time 
            currentTime = new Date(currentTime.getTime() + interval);
            console.log("current time", currentTime);
            console.log("current time - start time", currentTime - startTime);
            console.log("scriptTme", currentMessage.displayTime);
            console.log(typeof currentMessage, currentMessage);
            console.log("THE STATEMENT", currentMessage.displayTime < currentTime - startTime);
            console.log(this);
            
            //need to check if the length is just one - that way the people always have one thing to say.
            if (!(typeof currentMessage === undefined) && (currentMessage.displayTime < currentTime - startTime)) {
                //Display the message
                if (currentMessage.whoSaysThis == "player") {
                    setTimeout(Declination.game.player.dialog.display(currentMessage.message), currentMessage.displayTime);
                }
                else if (currentMessage.whoSaysThis == "interactable") {
                    setTimeout(this.display(currentMessage.message), currentMessage.displayTime);
                }
                else {
                    console.log("uh oh! whosaysthis is wrong!");
                };
                console.log(currentMessage.message);
                if (currentMessage.stoppingPoint) {
                    console.log("it's done");
                    clearInterval(dialogInterval);
                }
                console.log("Shifting to the next message, which is:");
                currentMessage = this.script.shift();
                console.log(currentMessage);
            }
            
        }
        
        
    };

	this.isStoppingPoint = function() {
		if (this.script[this.currentNode].stoppingPoint == true) {
			return true;
		}
		else {
			return false;
		}
	};
    
    //this.display = function(message, target, additionalStyle, displayTime) {
    //WHAT does this.display do? this only DISPLAYS the current message. It also makes the text element invisible.
    //So, this should be called whenever we cant to display something over an object. 
    this.display = function(message, options) {

    	if (!options) {
    		var options = {};
    	}

    	_.defaults(options, {
    		displayTime: 1000,
    		target: "camera",
    	});

		if (options.additionalStyle) {
			this.textDomElement.css(additionalStyle);
		}

		if (options.target == "camera") {
			//Change image to face the camera
			console.log(message, ",", who.name, "said to the camera.")
		}
		else if (options.target = "other") {
			//Change image to standing image, facing the target probably?
			console.log(message, ",", who.name, "said to something.")
		}
		//the target is an "object"
		else {
			//we do something here
		}

		this.textDomElement.text(message)
		console.log("THE DOM ELEMENT IS ", this.targetElement, this);

		//First we add the element to the room
		$(Declination.config.roomId).append(this.textDomElement)
        console.log(this.targetElement.position(), this.targetElement.height(), this.textDomElement.width())

        //Just calculating where it needs to go
		var textWidth = this.textDomElement.outerWidth();
		var topValue = (this.targetElement.position().top - this.textDomElement.height()) + "px";
		var leftValue = this.targetElement.position().left - ((textWidth / 2) - (this.targetElement.width() / 2)) + "px";
		this.textDomElement.css({
			"display" : "block",
			"top": topValue,
			"left": leftValue,
		});

		console.log("begfore the timeouts");
		//Then we call the methods to get rid of the display.
		setTimeout($.proxy(makeTextInvisible, this), options.displayTime);

	};

	function makeTextInvisible() {
		//here will be the stuff that we want to happen to make the 
		console.log("MakingText invisible");
		console.log(this);
		this.textDomElement.css({
			"display": "none",
		});
		//p element not visible, probably just through css
	}
    
}
