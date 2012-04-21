// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp 

function Images () {
	
    if (Images._instance) {
        throw new Error('Images instance already exists')
    }

    // You must always call the super class constructor
    Images.superclass.constructor.call(this);

	var fish = new Image();
	fish.src = "/images/fish.png";
	
	this.fish = fish;
	
	
}

Images.inherit(Object);

Object.defineProperty(Images, 'sharedImages', {
    /**
     * A shared singleton instance of cocos.Director
     *
     * @memberOf cocos.Director
     * @getter {cocos.Director} sharedDirector
     */
    get: function () {
        if (!Images._instance) {
            Images._instance = new this()
        }

        return Images._instance
    }

  , enumerable: true
})
	
module.exports = Images