
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
Hunter = function() {
    // You must always call the super class constructor
    Hunter.superclass.constructor.call(this);
	
	this.contentSize = new geo.Size(Const.worldPixSizeX,Const.worldPixSizeY);
	this.anchorPoint = new geo.Point(0,0);
	
	this.zOrder = 100;
	
	var fsm = parent.StateMachine.create({
	 	initial: 'searching',
	 events: [
	   { name: 'searchForFood',  from: 'movingToCamp',  to: 'searching' },
	   { name: 'searchForFood',  from: 'moving',  to: 'searching' },
	   { name: 'moveToFood', from: 'searching', to: 'moving'    },
	   { name: 'eat',  from: 'moving',    to: 'eating' },
		{name: 'backToCamp', from: 'eating', to: 'searchCamp' },
		{name: 'moveToCamp', from: 'searchCamp', to: 'movingToCamp' },
	],
	
	});
	this.fsm = fsm;
	
	this.dead = false;
	this.health = Const.hunterFullHealth;
}

//////////////
// Inherit function
/////////////
Hunter.inherit(cocos.nodes.Node, {
	fsm : null,
	gridPosition : null,
	currPath:null,
	currBear:null,
	health: null,
	
	draw: function(context, rect)
	{
		if (!this.dead)
		{
			//console.log("bear.position = ("+this.position.x+", "+this.position.y+")");
			context.fillStyle = "#000000";
			context.fillRect(this.position.x,this.position.y,Const.worldPixSizeX,Const.worldPixSizeY);
		}
	},
	
	setPosition: function(x, y)
	{
		this.gridPosition = new geo.Point(Math.floor(x / Const.worldPixSizeX), Math.floor(y / Const.worldPixSizeY));
		this.position = new geo.Point(x  / 2, y  / 2);
	},
	
	setPositionByGrid: function(x, y)
	{
		this.gridPosition = new geo.Point(x, y);
		this.position = new geo.Point(x * Const.worldPixSizeY / 2, y * Const.worldPixSizeY / 2);
	},
	
	eatBear: function(bear)
	{
		this.health = Const.hunterFullHealth;
	},
});

module.exports = Hunter