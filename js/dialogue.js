// this is MY dialogue stuff - the library is in dialogueLibrary.js
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
