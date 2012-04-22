
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
Camp = function() {
    // You must always call the super class constructor
    Camp.superclass.constructor.call(this);
	
	this.contentSize = new geo.Size(2*Const.worldPixSizeX,2*Const.worldPixSizeY);
	this.anchorPoint = new geo.Point(0,0);
	
	this.zOrder = 100;
	this.placing = true;
	this.opacity = Const.campPlacingOpacity;
	
}

//////////////
// Inherit function
/////////////
Camp.inherit(cocos.nodes.Node, {
	gridPosition : null,
	currPath:null,
	placing: null,
	
	draw: function(context, rect)
	{
		//console.log("bear.position = ("+this.position.x+", "+this.position.y+")");
		context.fillStyle = "#000000";
		context.fillRect(this.position.x,this.position.y,Const.worldPixSizeX*2,Const.worldPixSizeY*2);
	},
	
	setPosition: function(x, y)
	{
		console.log("("+x+", "+y+")");
		
		this.gridPosition = new geo.Point(Math.floor(x / Const.worldPixSizeX), Math.floor(y / Const.worldPixSizeY));
		this.position = new geo.Point(this.gridPosition.x * Const.worldPixSizeX  / 2, this.gridPosition.y * Const.worldPixSizeY  / 2);
		console.log("("+this.position.x+", "+this.position.y+")");
	},
	
	setPositionByGrid: function(x, y)
	{
		this.gridPosition = new geo.Point(x, y);
		this.position = new geo.Point(x * Const.worldPixSizeX / 2, y * Const.worldPixSizeY / 2);
	},
	
	place: function()
	{
		this.placing = false;
		this.opacity = 255;
	},
	
	pickup: function()
	{
		this.placing = true;
		this.opacity = Const.campPlacingOpacity;
	}
	
});

module.exports = Camp