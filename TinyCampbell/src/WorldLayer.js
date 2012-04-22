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
	this.placingCamp = false;
	
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
	placingCamp: null,
	
	
    update: function(dt) {
		if (this.running)
		{
			this.worldNode.checkGrowth();
			this.worldNode.tickCreatures();
			this.worldNode.checkResources(dt);
			this.worldNode.checkBears();
		}

	},
	
	
	keyDown: function(evt)
	{
		//e = erase
        if(evt.keyCode == 69) {
			this.currMouseResource = 0;
			parent.$("#messageDiv").prepend("<p>Tiny World Machine switched to erase mode.</p>");
        }
		//w = water
        if(evt.keyCode == 87) {
			this.currMouseResource = 1;
			parent.$("#messageDiv").prepend("<p>Tiny World Machine switched to water mode.</p>");
        }
		//m = mountain
        if(evt.keyCode == 77) {
			this.currMouseResource = 2;
			parent.$("#messageDiv").prepend("<p>Tiny World Machine switched to mountain mode.</p>");
        }
		//g = grass
        else if(evt.keyCode == 71) {
			this.currMouseResource = 3;
			parent.$("#messageDiv").prepend("<p>Tiny World Machine switched to grass mode.</p>");
        }
		//r = toggle run
        else if(evt.keyCode == 82) {
			if(this.running)
			{
				this.running = false;
				parent.$("#messageDiv").prepend("<p>Tiny World Machine stopped.</p>");
			}
			else
			{
				this.running = true;
				parent.$("#messageDiv").prepend("<p>Tiny World Machine started.</p>");
			}
        }
		//h = hunter camp
		else if(evt.keyCode == 72) {
			this.startPlacingCamp();
		}
	},
	
	startPlacingCamp: function()
	{
		this.placingCamp = true;
		this.worldNode.makeCamp();
	},
	
	placeCamp: function()
	{
		this.worldNode.placeCamp();
		this.placingCamp = false;
	},
	
	mouseDown: function(evt)
	{
		if (!this.placingCamp)
		{
			var director = Director.sharedDirector;
			var p = director.convertEventToCanvas(evt);
			console.log("mouseDown.position = ("+p.x+", "+p.y+")");
			
			//check if it's on a camp
			if (this.worldNode.hitCamp(p))
			{
				this.placingCamp = true;
				this.worldNode.pickupCamp();
			}
			else
			{
				//or paint something
				this.worldNode.setWorld(p.x,p.y, this.currMouseResource);
			}
		}
		else
		{
			if (this.worldNode.canPlaceCamp())
			{
				this.placeCamp();
			}
		}
	},
	
	mouseDragged: function(evt)
	{
		if (!this.placingCamp)
		{
			var director = Director.sharedDirector;
			var p = director.convertEventToCanvas(evt);
			this.worldNode.setWorld(p.x,p.y, this.currMouseResource);
		}
	},
	
	
    mouseMoved: function (evt) 
	{
		if (this.placingCamp)
		{
			var director = Director.sharedDirector;
			var p = director.convertEventToCanvas(evt);
			
			this.worldNode.setCampPosition(p.x, p.y);
			
		}
	},

});

module.exports = WorldLayer