//this will be a file that determines all interractables - that is, the things that can be interacted with! (duh)
// this will be doors, items, people, all other things. We can have special cases for npoc, doors, keys and stuff.
// for now, let's keep things simple and assume everything's spot will be defined by a rectangle

//should coordinates be an obejct as well?


//let's write the code for a door to begin with - just to be simple.
function Interactable(options, coordinates) {
    if (options.type = "door") {
        //leads to something
        this.leadsTo = options.leadsTo;
    }
    if (options.type = "item") {
        
    
}