"use strict"  // Use strict JavaScript mode

// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points

var WorldNode = require('./WorldNode');

// Convenient access to some constructors
var Layer    = nodes.Layer
  , Scene    = nodes.Scene
  , Label    = nodes.Label
  , Director = cocos.Director

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function WorldLayer () {
    // You must always call the super class constructor
    WorldLayer.superclass.constructor.call(this)

	//add world
	var worldNode = new WorldNode();
	this.addChild(worldNode);
	this.worldNode = worldNode;
	
	this.currMouseResource = 0;
	
	this.isMouseEnabled = true;
	this.isKeyboardEnabled = true;
	
	this.running = false;
	
	this.scheduleUpdate();
}


// Inherit from cocos.nodes.Layer
WorldLayer.inherit(Layer, {
	worldNode: null,
	currMouseResource: null,
	running: null,
	
	
    update: function(dt) {
		if (this.running)
		{
			this.worldNode.checkGrowth();
			
		}

	},
	
	
	keyDown: function(evt)
	{
		//e = erase
        if(evt.keyCode == 69) {
			this.currMouseResource = 0;
        }
		//w = water
        if(evt.keyCode == 87) {
			this.currMouseResource = 1;
        }
		//m = mountain
        if(evt.keyCode == 77) {
			this.currMouseResource = 2;
        }
		//g = grass
        else if(evt.keyCode == 71) {
			this.currMouseResource = 3;
        }
		//r = toggle run
        else if(evt.keyCode == 82) {
			this.running = !this.running;
        }
	},
	
	mouseDown: function(evt)
	{
		var director = Director.sharedDirector;
		var p = director.convertEventToCanvas(evt);
		this.worldNode.setWorld(p.x,p.y, this.currMouseResource);
	},
	
	mouseDragged: function(evt)
	{
		var director = Director.sharedDirector;
		var p = director.convertEventToCanvas(evt);
		this.worldNode.setWorld(p.x,p.y, this.currMouseResource);
	}

});

module.exports = WorldLayer