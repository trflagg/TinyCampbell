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
function WorldNode () {
    // You must always call the super class constructor
    WorldNode.superclass.constructor.call(this)

	//setup world
	world = new Array();
	
	for (var i=0; i< Const.worldSizeX; i++)
	{
		world[i] = new Array();
		
		for (var j=0; j< Const.worldSizeY; j++)
		{
			world[i][j] = 0;
		}
	}
	
	this.world = world;
	this.worldUpdated = true;
	
	this.setBackground("#000000");
}


// Inherit from cocos.nodes.Layer
WorldNode.inherit(Node, {
	world: null,
	worldUpdated: null,
	worldCache: null,
	
	//setBackground
	setBackground: function(bgColor)
	{
		worldBg = bgColor;
	},
	
	//draw
	draw: function(context, rect) 
	{
			//only draw if updated flag is set
		if (this.worldUpdated)
		{
			var cache = this.renderToCanvas(rect.size.width, rect.size.height, this.drawWorld);
			this.worldCache = cache
			//unset flag
			this.worldUpdated = false;
		}
		
		
		context.drawImage(this.worldCache, 0, 0);
	},
	
	//drawWorld
	drawWorld: function(context)
	{
		//console.log("rect.origin: ("+ rect.origin.x+ ","+rect.origin.y+")");
		
		//console.log("rect.size: ("+ rect.size.width+ ","+rect.size.height+")");
		console.log("drawWorld");
		
		//draw background
		context.fillStyle = worldBg;
		context.fillRect(0,0, Const.canvasSizeX, Const.canvasSizeY);
		
		//draw world array
		for (var i=0; i< Const.worldSizeX; i++)
		{
			for (var j=0; j< Const.worldSizeY; j++)
			{
				if (world[i][j] != undefined && world[i][j] == 0)
				{
					//0 == do nothing and let the background show through
					
					//context.fillStyle = "#ff00ff";
					//context.fillRect(i*5,j*5,5,5);
					continue;
				}
				else if (world[i][j] != undefined && world[i][j] == 1)
				{
					//1 == water, Helen, Waaateeer
					
					context.fillStyle = "#0000ff";
				}
				else if (world[i][j] != undefined && world[i][j] == 2)
				{
					//2 == mountains, glorious mountains
					
					context.fillStyle = "#967656";
				}
				else if (world[i][j] != undefined && world[i][j] == 3)
				{
					//3 == grass, as far as the eye can see
					
					context.fillStyle = "#1B9638";
				}
				
				console.log("fillRect("+i* Const.worldPixSizeX +","+j*Const.worldPixSizeY+",5,5)");
				context.fillRect(i*Const.worldPixSizeX,j*Const.worldPixSizeY,Const.worldPixSizeX,Const.worldPixSizeY);
			}
		}
	},
	
	renderToCanvas: function (width, height, renderFunction) 
	{
		var buffer = document.createElement('canvas');
		buffer.width = width;
		buffer.height = height;
		renderFunction(buffer.getContext('2d'));
		return buffer;
	},
	
	setWorld: function (x, y, value)
	{
		if (x < Const.canvasSizeX && y < Const.canvasSizeX )
		{
			x = Math.round(x/Const.worldPixSizeX);
			y = Math.round(y/Const.worldPixSizeY);
			
			console.log("Setting world["+x+"]["+y+"] = "+value);
			world[x][y] = value;
		}
		this.worldUpdated = true;
	}
});



module.exports = WorldNode