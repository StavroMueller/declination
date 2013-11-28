//this will be a file that determines all interractables - that is, the things that can be interacted with! (duh)
// this will be doors, items, people, all other things. We can have special cases for npoc, doors, keys and stuff.
// for now, let's keep things simple and assume everything's spot will be defined by a rectangle

//should coordinates be an obejct as well?


//let's write the code for a door to begin with - just to be simple.
function Interactable(options) {
    //Should these have urls or associated rooms? Actually they can jsut be passed in 
    _.defaults(options, {
        width: 32,
        height: 32,
        left: 0,
        top: 0,
        imageURL: "images/rooms/999/interactables/999.png",
        description: "This is the default description",
        shortDescription: "test",
        type: "test",
    });
    if (options.type = "door") {
        //leads to something
        this.leadsTo = options.leadsTo;
    }
    if (options.type = "item") {
        console.log("blah");
    }
    this.top = options.top;
    this.left = options.left;
    this.description = options.description;
    this.shortDescription = options.shortDescription;
    this.imageURL = options.imageURL;
    this.width = options.width;
    this.height = options.height;
    this.xCenter = options.xCenter;
    this.yCenter = options.yCenter;
}