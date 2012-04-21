//"use strict"  // Use strict JavaScript mode

// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points

var Const = require('./Const');

// Convenient access to some constructors
var Layer    = nodes.Layer
  , Scene    = nodes.Scene
  , Label    = nodes.Label
  , Director = cocos.Director
  , Node 	 = nodes.Node

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function FishNode () {
    // You must always call the super class constructor
    FishNode.superclass.constructor.call(this);

	
	var sprite = new cocos.nodes.Sprite({
			file: '/images/fish.png',
			rect: new geo.Rect(0, 0, 10, 10)
	});
	
	this.addChild({child: sprite});
		
	this.contentSize = sprite.contentSize;
	sprite.anchorPoint = new geo.Point(0,0);
}


// Inherit from cocos.nodes.Layer
FishNode.inherit(Node, {
	sprite: null,
	
	
});



module.exports = FishNode