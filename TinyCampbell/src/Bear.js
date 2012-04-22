
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

var Const = require('./Const');

//////////////
// Constructor
//////////////
Bear = function() {
    // You must always call the super class constructor
    Bear.superclass.constructor.call(this);
	
	this.contentSize = new geo.Size(Const.worldPixSizeX,Const.worldPixSizeY);
	this.anchorPoint = new geo.Point(0,0);
	
	this.zOrder = 100;
}

//////////////
// Inherit function
/////////////
Bear.inherit(cocos.nodes.Node, {
	
	draw: function(context, rect)
	{
		//console.log("bear.position = ("+this.position.x+", "+this.position.y+")");
		context.fillStyle = "#9c7249";
		context.fillRect(this.position.x,this.position.y,Const.worldPixSizeX,Const.worldPixSizeY);
	}
});

module.exports = Bear