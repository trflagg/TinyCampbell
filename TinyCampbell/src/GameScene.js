
// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points

// Convenient access to some constructors
var Layer    = nodes.Layer
  , Scene    = nodes.Scene
  , Label    = nodes.Label
  , Director = cocos.Director

var WorldLayer = require('./WorldLayer');

//////////////
// Constructor
//////////////
GameScene = function() {
    // You must always call the super class constructor
    GameScene.superclass.constructor.call(this);

	// Add WorldLayer to the scene
 	var wl = new WorldLayer(this);
	wl.visible = true;
	wl.scene = this;
	this.worldLayer = wl;
   	this.addChild({child: wl});
}

//////////////
// Inherit function
/////////////
GameScene.inherit(cocos.nodes.Scene, {
	worldLayer: null,

});

module.exports = GameScene