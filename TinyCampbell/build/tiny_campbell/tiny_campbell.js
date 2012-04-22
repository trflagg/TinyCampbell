(function(){
__jah__.resources["/Bear.js"] = {data: function (exports, require, module, __filename, __dirname) {

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
	this.dead = false;
	this.health = Const.bearFullHealth;
	
	var fsm = parent.StateMachine.create({
	 	initial: 'searching',
	 events: [
	   { name: 'searchForFood',  from: 'eating',  to: 'searching' },
	   { name: 'moveToFood', from: 'searching', to: 'moving'    },
	   { name: 'eat',  from: 'moving',    to: 'eating' },
	],
	
	});
	this.fsm = fsm;
	
}

//////////////
// Inherit function
/////////////
Bear.inherit(cocos.nodes.Node, {
	fsm : null,
	gridPosition : null,
	currPath:null,
	currResource:null,
	dead: null,
	health: null,
	
	draw: function(context, rect)
	{
		if (!this.dead)
		{
			//console.log("bear.position = ("+this.position.x+", "+this.position.y+")");
			context.fillStyle = "#9c7249";
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
	
	eatResource: function(resource)
	{
		this.health = Const.bearFullHealth;
	},
});

module.exports = Bear
}, mimetype: "application/javascript", remote: false}; // END: /Bear.js


__jah__.resources["/Camp.js"] = {data: function (exports, require, module, __filename, __dirname) {

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
}, mimetype: "application/javascript", remote: false}; // END: /Camp.js


__jah__.resources["/Const.js"] = {data: function (exports, require, module, __filename, __dirname) {
// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp 

var Const = {
	'canvasSizeX' : 320,
	'canvasSizeY' : 320,
	'worldSizeX' : 32,
	'worldSizeY' : 32,
	'worldPixSizeX' : 10,
	'worldPixSizeY' : 10,
	
	'fishGenerateBasePercent': .10,
	'fishSurroundedMultiplier': .10,
	
	'newResourceWaitTime': 0,
	'eatenResourceWaitTime': 100,
	
	'bearTimerStart': 10,
	
	'bearMinFish': 3,
	'bearMinPlants': 3,
	'bearGenerateBasePercent': .005,
	'bearGenerateResourceMultiplier': .0005,
	
	'bearGraphWeights': {
		0 : 0,
		1: 5,
		2: 1,
		3: 5,
	},
	
	'bearFullHealth': 30,
	'bearHealthDecPerTick': 1,
	
	
	'hunterGraphWeights': {
		0 : 0,
		1: 5,
		2: 1,
		3: 5,
	},
	
	'campPlacingOpacity': 128,
	
	'hunterMinBearCount': 1,
	'hunterGenerateBasePercent': .001,
	'hunterGenerateResourceMultiplier': .005,
	'hunterTimerStart': 75,
	
	'hunterFullHealth': 100,
	'hunterHealthDecPerTick': 1,
};

module.exports = Const
}, mimetype: "application/javascript", remote: false}; // END: /Const.js


__jah__.resources["/GameScene.js"] = {data: function (exports, require, module, __filename, __dirname) {

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
}, mimetype: "application/javascript", remote: false}; // END: /GameScene.js


__jah__.resources["/Hunter.js"] = {data: function (exports, require, module, __filename, __dirname) {

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
}, mimetype: "application/javascript", remote: false}; // END: /Hunter.js


__jah__.resources["/Images.js"] = {data: function (exports, require, module, __filename, __dirname) {
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
}, mimetype: "application/javascript", remote: false}; // END: /Images.js


__jah__.resources["/main.js"] = {data: function (exports, require, module, __filename, __dirname) {
"use strict"  // Use strict JavaScript mode

// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points

var GameScene = require('./GameScene');

// Convenient access to some constructors
var Layer    = nodes.Layer
  , Scene    = nodes.Scene
  , Label    = nodes.Label
  , Director = cocos.Director

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function TinyCampbell () {
    // You must always call the super class constructor
    TinyCampbell.superclass.constructor.call(this)

	var director = Director.sharedDirector
	director.displayFPS = true;
	
	
	//setup world
	var world = new Array();
	
	for (i=0; i<64; i++)
	{
		for (j=0; j< 64; j++)
		{
			world[i][j] = 0;
		}
	}
}


// Inherit from cocos.nodes.Layer
TinyCampbell.inherit(Layer)

/**
 * Entry point for the application
 */
function main () {
    // Initialise application

    // Get director singleton
    var director = Director.sharedDirector
	director.displayFPS = true;

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
        
		// Create a scene
        var scene = new GameScene()


        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main

}, mimetype: "application/javascript", remote: false}; // END: /main.js


__jah__.resources["/resources/images/fish.png"] = {data: __jah__.assetURL + "/resources/images/fish.png", mimetype: "image/png", remote: true};
__jah__.resources["/WorldLayer.js"] = {data: function (exports, require, module, __filename, __dirname) {
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
}, mimetype: "application/javascript", remote: false}; // END: /WorldLayer.js


__jah__.resources["/WorldNode.js"] = {data: function (exports, require, module, __filename, __dirname) {
//"use strict"  // Use strict JavaScript mode

// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points

var Const = require('./Const');
var Bear = require('./Bear');
var Camp = require('./Camp');
var Hunter = require('./Hunter');

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
	resources = new Array();
	creatures = new Array();
	resourceClaims = new Array();
	
	for (var i=0; i< Const.worldSizeX; i++)
	{
		world[i] = new Array();
		resources[i] = new Array();
		creatures[i] = new Array();
		resourceClaims[i] = new Array();
		
		for (var j=0; j< Const.worldSizeY; j++)
		{
			world[i][j] = 0;
			resources[i][j] = 0;
			creatures[i][j] = 0;
			resourceClaims[i][j] = 0;
		}
	}
	
	this.position = new geo.Point(0,0);
	this.zOrder = -100;
	
	this.world = world;
	this.worldUpdated = true;
	
	this.bearTimer = 0;
	this.hunterTimer = 0;
	
	this.placingCamp = false;
	
	
	this.setBackground("#ffffff");
}


// Inherit from cocos.nodes.Layer
WorldNode.inherit(Node, {
	world: null,
	worldUpdated: null,
	worldCache: null,
	bears: new Array(),
	bearTimer: null,
	camp: null,
	hunters: new Array(),
	hunterTimer: null,
	placingCamp: null,
	
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
					
					context.fillStyle = "#94dfff";
				}
				else if (world[i][j] != undefined && world[i][j] == 2)
				{
					//2 == mountains, glorious mountains
					
					context.fillStyle = "#dbb27d";
				}
				else if (world[i][j] != undefined && world[i][j] == 3)
				{
					//3 == grass, as far as the eye can see
					
					context.fillStyle = "#9bd474";
				}
				
				//console.log("fillRect("+i* Const.worldPixSizeX +","+j*Const.worldPixSizeY+",5,5)");
				context.fillRect(i*Const.worldPixSizeX,j*Const.worldPixSizeY,Const.worldPixSizeX,Const.worldPixSizeY);
				
				//draw any resources
				if (resources[i][j] == -1)
				{
					//fish
					context.save();
					context.fillStyle = "#0000ff";
					context.strokeStyle = "#94dfff"
					//context.lineWidth = 4
					//context.lineCap = "round"
					//context.scale(0.75, 1);
					context.beginPath();
					context.fillRect(i*Const.worldPixSizeX, j*Const.worldPixSizeY, Const.worldPixSizeX - 4, Const.worldPixSizeY - 6);
					context.stroke();
					context.closePath();
					context.restore();	
				}
				if (resources[i][j] == -3)
				{
					//plants	
					context.save();
					context.fillStyle = "#059c00";
					context.strokeStyle = "#9bd474"
					//context.lineWidth = 4
					//context.lineCap = "round"
					//context.scale(0.75, 1);
					context.beginPath();
					context.fillRect(i*Const.worldPixSizeX, j*Const.worldPixSizeY, Const.worldPixSizeX - 7, Const.worldPixSizeY - 2);
					context.stroke();
					context.closePath();
					context.restore();
				}
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
			x = Math.floor(x/Const.worldPixSizeX);
			y = Math.floor(y/Const.worldPixSizeY);
			
			if (x < Const.worldSizeX && y < Const.worldSizeY && x >= 0 && y >= 0)
			{
				console.log("Setting world["+x+"]["+y+"] = "+value);
				world[x][y] = value;
				this.worldUpdated = true;
				
				//update resources counter
				resources[x][y] = Const.newResourceWaitTime;
			}
		}
	},
	
	checkGrowth: function()
	{
		for (var i=0; i< Const.worldSizeX; i++)
		{
			for (var j=0; j< Const.worldSizeY; j++)
			{
				//water
				if (world[i][j] == 1 && resources[i][j] == 0)
				{
					//only generate if surrounding are all water
					if (this.checkSurroundings(i,j,1))
					{
						//set water generation percentage
						var perc = Const.fishGenerateBasePercent;
						
						//multiply based on const and number of surrounding fishes
						//perc += Const.fishSurroundedMultiplier * (1 + this.getSurroundingFishCount(i, j))
						
						var num = Math.random()
						if (num <= perc)
						{
							//generate fish!
							this.makeNewFish(i, j);
						}
					}
				}
				//grass
				else if (world[i][j] == 3 && resources[i][j] == 0)
				{
					//only generate if surrounding are all grass
					if (this.checkSurroundings(i,j,3))
					{
						//set grass generation percentage
						var perc = Const.fishGenerateBasePercent;
						
						//multiply based on const and number of surrounding plants
						//perc += Const.fishSurroundedMultiplier * (1 + this.getSurroundingFishCount(i, j))
						
						var num = Math.random()
						if (num <= perc)
						{
							//generate plant!
							this.makeNewPlant(i, j);
						}
					}
				}
				//decay
				else if (resources[i][j] > 0)
				{
					resources[i][j] = resources[i][j] - 1;
				}
			}
		}
	},
	
	checkSurroundings: function(i, j, value)
	{
		var surrounded = true;
		
		//top
		if (j < (Const.worldSizeY - 1) && world[i][j+1] != value)
		{
			surrounded = false;
		}
		//bottom
		else if (j > 0 && world[i][j-1] != value)
		{
			surrounded = false;
		}
		//right
		else if (i < (Const.worldSizeX - 1) && world[i+1][j] != value)
		{
			surrounded = false;
		}
		//left
		else if (i > 0 && world[i-1][j] != value)
		{
			surrounded = false;
		}
		
		return surrounded;
	},
	
	makeNewFish: function(x, y)
	{
		// -1= fish
		resources[x][y] = -1;
		this.worldUpdated = true;
		console.log("new fish at ("+x+","+y+")");
		
	},
	
	makeNewPlant: function(x, y)
	{
		// -3 = plant
		resources[x][y] = -3;
		this.worldUpdated = true;
		console.log("new plant at ("+x+","+y+")");
		
	},
	
	checkResources: function()
	{
		//count 'em all
		var fishCount = 0;
		var plantCount = 0;
		
		//console.log("checkResources");
		for (var i=0; i< Const.worldSizeX; i++)
		{
			for (var j=0; j< Const.worldSizeY; j++)
			{
				// -1 = fish
				if (resources[i][j] == -1)
				{
					fishCount++;
					//console.log("pl:"+plantCount+" fi:"+fishCount+"");
				}
				
				// -3 = plant
				else if (resources[i][j] == -3)
				{
					plantCount++;
					//console.log("pl:"+plantCount+" fi:"+fishCount+"");
				}
			}
		}
		//console.log("pl:"+plantCount+" fi:"+fishCount+"");
		//check for minimum plant count
		if (plantCount > Const.bearMinPlants && (fishCount > Const.bearMinFish))
		{
			//check timer
			if (this.bearTimer > 0) 
			{
				this.bearTimer--;
			}
			else
			{
				var perc = Const.bearGenerateBasePercent;
				perc += Const.bearGenerateResourceMultiplier * (fishCount + plantCount);
				var rand = Math.random();
				//console.log("perc: "+perc);
				if (rand <= perc)
				{
					//console.log(rand +" <= "+perc);
					//make Bear
					this.makeNewBear();
					this.bearTimer = Const.bearTimerStart;
					console.log("reset bearTimer");
				}
			}
		}
	},
	
	makeNewBear: function()
	{
		var newBear = new Bear();
		console.log("new bear created!");
		
		//position bear
		//pick random spot & find closest resource
		var randX = this.randomXToY(0,32);
		var randY = this.randomXToY(0,32);
		//start in grass -- remove(??)
		
		var result = this.getClosestResource(randX, randY);
		if (result == null)
		{
			console.log("*******makeNewBear got null closest resource!!!");
			//no bear for you!
			return;
		}
		this.bearClaimsResource(newBear, result);
		creatures[result.x][result.y] = 1;
		newBear.setPositionByGrid(result.x , result.y);
		this.bearEatsResource(newBear, result.x, result.y);
		
		console.log("result = ("+result.x+", "+result.y+")");
		
		console.log("newBear.position = ("+newBear.position.x+", "+newBear.position.y+")");
		this.bears.push(newBear);
		this.parent.addChild(newBear,1000);
	},
	
	
	tickCreatures: function(dt)
	{
		//go through all bears
		for (var i=0, arrLength = this.bears.length; i < arrLength; i++)
		{
			var currBear = this.bears[i];
			this.bearTick(dt, currBear);
		}
		
		//go through all hunters
		for (var i=0, arrLength = this.hunters.length; i < arrLength; i++)
		{
			var currHunter = this.hunters[i];
			this.hunterTick(dt, currHunter);
		}
	},
	
	getClosestResource: function(x, y)
	{
		var bestMatch = null;
		var bestDist = 100000;
		console.log("getClosest("+x+", "+y+")");
		for (var i=0; i< Const.worldSizeX; i++)
		{
			for (var j=0; j< Const.worldSizeY; j++)
			{
				//check resources
				if (resources[i][j] == -1 || resources[i][j] == -3)
				{
					//check it isn't claimed and nothing else is there
					if (resourceClaims[i][j] == 0 && creatures[i][j] == 0)
					{
						//match
						var dist = Math.sqrt( (Math.pow((x - i),2)) + (Math.pow((y - j), 2)) );
						
						if (dist < bestDist)
						{
							bestMatch = new geo.Point(i, j);
							bestDist = dist;
							console.log("getClosest newMatch dist:"+bestDist+" ("+i+", "+j+")");
						}
					}
				}
			}
		}
		
		return bestMatch;		
	},
	
	
	bearTick: function(dt, bear) 
	{
		if (bear == undefined)
		{
			return 
		}
		
		bear.health -= Const.bearHealthDecPerTick;
		
		//set opacity by health
		var hPerc = bear.health / Const.bearFullHealth;
		if (hPerc < .5)
		{
			bear.opacity = hPerc * 255;
		}
		else
		{
			bear.opacity = 255;
		}
		
		if (bear.health <= 0)
		{
			console.log("Bear dies of hunger.");
			this.bearKilled(bear);
			return;
		}
		
		//check state
		if (bear.fsm.is('searching'))
		{
			//searching
			//find closest resource
			var nextResource = this.getClosestResource(bear.gridPosition.x, bear.gridPosition.y);
			if (nextResource == null)
			{
				//haha! nothing for you!
				console.log("**** bear can't find resource!");
				return;
			}
			this.bearClaimsResource(bear, nextResource);
			
			//get path
			var bearsPath = this.findPathBear(bear.gridPosition, nextResource);
			console.log("bearsPath: "+bearsPath);
			bear.currPath = bearsPath;
			
			//start moving
			bear.fsm.moveToFood();
		}
		else if(bear.fsm.is('moving'))
		{
			//move bear along path
			var nextMove = bear.currPath.shift();
			this.moveBear(bear, nextMove.x, nextMove.y);
			
			//did we make it?
			if (bear.currResource.x == bear.gridPosition.x && bear.currResource.y == bear.gridPosition.y)
			{
				//yeah! found the food!
				//eat the food
				bear.fsm.eat();
			}
		}
		else if(bear.fsm.is('eating'))
		{
				console.log("bear found its food at ("+bear.gridPosition.x+", "+bear.gridPosition.y+")");
				this.bearEatsResource(bear, bear.gridPosition.x, bear.gridPosition.y);
				//look for more!
				bear.fsm.searchForFood();
		}
	},
	
	findPathBear: function(start, end)
	{
		//make graph from world
		var graph = Array();
		
		for (var i=0; i< Const.worldSizeX; i++)
		{
			graph[i] = Array();
			for (var j=0; j< Const.worldSizeY; j++)
			{
				graph[i][j] = Const.bearGraphWeights[world[i][j]];
			}
		}
		
		var starGraph = new parent.Graph(graph);
		var start = starGraph.nodes[start.x][start.y];
		var end = starGraph.nodes[end.x][end.y];
		var path = parent.astar.search(starGraph.nodes, start, end);
		
		return path;
	},
	
	
	findPathHunter: function(start, end)
	{
		//make graph from world
		var graph = Array();
		
		for (var i=0; i< Const.worldSizeX; i++)
		{
			graph[i] = Array();
			for (var j=0; j< Const.worldSizeY; j++)
			{
				graph[i][j] = Const.hunterGraphWeights[world[i][j]];
			}
		}
		
		var starGraph = new parent.Graph(graph);
		var start = starGraph.nodes[start.x][start.y];
		var end = starGraph.nodes[end.x][end.y];
		var path = parent.astar.search(starGraph.nodes, start, end);
		
		return path;
	},
	moveBear: function(bear, x, y)
	{
		//if not moving, don't bother
		if (bear.gridPosition.x == x && bear.gridPosition.y == y)
			return;
		
		//check creature isn't already there
		if (creatures[x][y] == 0)
		{
			//modify creatures
			creatures[bear.gridPosition.x][bear.gridPosition.y] = 0;
			creatures[x][y] = 1;
			bear.setPositionByGrid(x, y);
		}
		else
		{
			//oh no! somethings already there.
			//move (if possible) and recalculate
			var nextPos = this.getOpenPosition(x, y);
			this.moveBear(bear, nextPos.x, nextPos.y);
			var bearsPath = this.findPathBear(bear.gridPosition, bear.currResource);
			console.log("*** Collision! Recalculating bearsPath: "+bearsPath);
			bear.currPath = bearsPath;
		}
			
	},
		
	bearClaimsResource: function(bear, result)
	{
		resourceClaims[result.x][result.y] = 1;
		bear.currResource = result;
	},	
	
	bearUnclaimsResource: function(bear, result)
	{
		resourceClaims[result.x][result.y] = 0;
		bear.currResource = null;
	},
	
	bearEatsResource: function(bear, i, j)
	{
		bear.eatResource(resources[i][j]);
		resourceClaims[i][j] = 0;
		resources[i][j] = Const.eatenResourceWaitTime;
		this.worldUpdated = true;
	},
	
	bearKilled: function(bear)
	{
		console.log("bear killed!");
		bear.dead = true;
		//remove bear
		this.removeChild(bear);
		
		//remove from array
		for (var i=0; i < this.bears.length; i++)
		{
			//base on position
//			if (bears[i].gridPosition.x == bear.gridPosition.x &&
//				bears[i].gridPosition.y == bear.gridPosition.y)
			if (this.bears[i] == bear)
			{
				this.bears.splice(i,1);
				break;
			}
		}
		if (bear.currResource != null)
			this.bearUnclaimsResource(bear, bear.currResource);
		
		creatures[bear.gridPosition.x][bear.gridPosition.y] = 0;
	},
	
	getOpenPosition: function(x, y)
	{
		//up?
		if (y < Const.worldSizeY && creatures[x][y+1] == 0)
			return new geo.Point(x, y+1);
		//right?
		if (x < Const.worldSizeY && creatures[x+1][y] == 0)
			return new geo.Point(x+1, y);
		//left?
		if (x < Const.worldSizeY && creatures[x-1][y] == 0)
			return new geo.Point(x-1, y);
		//down?
		if (y < Const.worldSizeY && creatures[x][y-1] == 0)
			return new geo.Point(x, y-1);
			
		//no luck, return same position
		return new geo.Point(x, y);
	},
	
	makeCamp: function()
	{
		var newCamp = new Camp();
		console.log("new camp created!");
		this.camp = newCamp;
		this.parent.addChild(newCamp,1000);
		this.placingCamp = true;
	},
	
	setCampPosition: function(x,y)
	{
		this.camp.setPosition(x,y);
		
		if (this.canPlaceCamp())
		{
			this.camp.opacity = 255;
		}
		else
		{
			this.camp.opacity = Const.campPlacingOpacity;
		}
	},
	
	canPlaceCamp: function()
	{
		var pos = this.camp.gridPosition;
		//must be on empty land 
		if (world[pos.x][pos.y] == 0)
		{
			//with water neighbooring
			if (world[pos.x+1][pos.y] == 1 ||
				world[pos.x][pos.y+1] == 1 ||
				world[pos.x+1][pos.y-1] == 1 ||
				world[pos.x-1][pos.y] == 1)
			{
				return true;
			}
			
		}
		
		return false;
	},
	
	placeCamp: function()
	{
		this.camp.place();
		this.placingCamp = false;
	},
	
	hitCamp: function(p)
	{
		var x = p.x;
		var y = p.y;
		
		if (this.camp == null)
			return false;
			
		if (x < Const.canvasSizeX && y < Const.canvasSizeX )
		{
			x = Math.floor(x/Const.worldPixSizeX);
			y = Math.floor(y/Const.worldPixSizeY);
			
			if (x < Const.worldSizeX && y < Const.worldSizeY && x >= 0 && y >= 0)
			{
				if (this.camp.gridPosition.x == x && this.camp.gridPosition.y == y)
				{
					return true;
				}
			}
		}
		return false;
	},
		
	pickupCamp: function()
	{
		this.camp.pickup();
		this.placingCamp = true;
	},
	
	checkBears: function()
	{
		//must have a camp
		if (this.camp != null && !this.placingCamp)
		{
			//must have a certain # of bears to make a hunter
			if (this.bears.length >= Const.hunterMinBearCount)
			{
				//check timer
				if (this.hunterTimer > 0) 
				{
					this.hunterTimer--;
				}
				else
				{
					var perc = Const.hunterGenerateBasePercent;
					perc += Const.hunterGenerateResourceMultiplier * (this.hunters.length);
					var rand = Math.random();
					//console.log("perc: "+perc);
					if (rand <= perc)
					{
						//console.log(rand +" <= "+perc);
						//make Hunter
						this.makeNewHunter();
						this.hunterTimer = Const.hunterTimerStart;
					}
				}
			}
		}
	},
	
	makeNewHunter: function()
	{
		var newHunter = new Hunter();
		console.log("new hunter created!");
		
		//position hunter at camp
		newHunter.setPositionByGrid(this.camp.gridPosition.x, this.camp.gridPosition.y);
		
		this.hunters.push(newHunter);
		this.parent.addChild(newHunter,1000);
		
	},
	
	hunterTick: function(dt, hunter)
	{
		if (hunter == undefined)
		{
			return 
		}
		
		hunter.health -= Const.hunterHealthDecPerTick;
		
		//set opacity by health
		var hPerc = hunter.health / Const.hunterFullHealth;
		if (hPerc < .5)
		{
			hunter.opacity = hPerc * 255;
		}
		else
		{
			hunter.opacity = 255;
		}
		
		if (hunter.health <= 0)
		{
			console.log("Hunter dies of hunger.");
			this.hunterKilled(hunter);
			return;
		}
		//check state
		if (hunter.fsm.is('searching'))
		{
			//searching
			//find closest bear
			var nextBear = this.getClosestBear(hunter.gridPosition.x, hunter.gridPosition.y);
			if (nextBear == null)
			{
				//haha! nothing for you!
				console.log("**** hunter can't find bear!");
				return;
			}
			this.hunterClaimsBear(hunter, nextBear);
			
			//get path
			var huntersPath = this.findPathHunter(hunter.gridPosition, nextBear.gridPosition);
			console.log("huntersPath: "+huntersPath);
			hunter.currPath = huntersPath;
			
			//start moving
			hunter.fsm.moveToFood();
		}
		if(hunter.fsm.is('movingToCamp'))
		{
			//move hunter along path
			var nextMove = hunter.currPath.shift();
			if (nextMove != null)
			{
				this.moveHunter(hunter, nextMove.x, nextMove.y);
				
				//did we make it?
				if (hunter.gridPosition.x == this.camp.gridPosition.x && hunter.gridPosition.y == this.camp.gridPosition.y)
				{
					//found camp
					console.log("hunterBackAtCamp");
					hunter.fsm.searchForFood();
				}
			}
			else
			{
				console.log("****** null Hunter Move!");
				//search!
				hunter.fsm.searchForFood();
			}
		}
		if(hunter.fsm.is('moving'))
		{
			//move hunter along path
			var nextMove = hunter.currPath.shift();
			if (nextMove != null)
			{
				this.moveHunter(hunter, nextMove.x, nextMove.y);
				
				//did we make it?
				if (hunter.gridPosition.x == hunter.currBear.gridPosition.x && hunter.gridPosition.y == hunter.currBear.gridPosition.y)
				{
					//yeah! found the food!
					//eat the food
					hunter.fsm.eat();
				}
			}
			else
			{
				console.log("****** null Hunter Move!");
				//search!
				hunter.fsm.searchForFood();
			}
		}
		if(hunter.fsm.is('eating'))
		{
				console.log("hunter found its food at ("+hunter.gridPosition.x+", "+hunter.gridPosition.y+")");
				this.hunterEatsBear(hunter, hunter.currBear);
				//back to camp
				hunter.fsm.backToCamp();
		}
		if(hunter.fsm.is('searchCamp'))
		{
			console.log("hunter heading back to camp")//get path
			var huntersPath = this.findPathHunter(hunter.gridPosition, this.camp.gridPosition);
			console.log("huntersPath: "+huntersPath);
			hunter.currPath = huntersPath;
			
			//start moving
			hunter.fsm.moveToCamp();
		}
	},
	
	getClosestBear: function(x, y)
	{
		var bestMatch = null;
		var bestDist = 100000;
		console.log("getClosest("+x+", "+y+")");
		
		//loop through bears
		for (var i=0, arrLength = this.bears.length; i < arrLength; i++)
		{
			var x2 = this.bears[i].gridPosition.x;
			var y2 = this.bears[i].gridPosition.y;
			
			var dist = Math.sqrt( (Math.pow((x - x2),2)) + (Math.pow((y -y2), 2)) );
						
			if (dist < bestDist)
			{
				bestMatch = this.bears[i]
				bestDist = dist;
				console.log("getClosest newMatch dist:"+bestDist+" ("+x2+", "+y2+")");
			}
		}
		
		return bestMatch;
		
	},
	
	hunterClaimsBear: function(hunter, bear)
	{
		hunter.currBear = bear;
	},
	
	moveHunter: function(hunter, x, y)
	{
		//if not moving, don't bother
		if (hunter.gridPosition.x == x && hunter.gridPosition.y == y)
			return;
		
		//check creature isn't already there
//		if (creatures[x][y] == 0)
//		{
			//modify creatures
			creatures[hunter.gridPosition.x][hunter.gridPosition.y] = 0;
			creatures[x][y] = 1;
			hunter.setPositionByGrid(x, y);
//		}
//	else
//	{
//		//oh no! somethings already there.
//		//move (if possible) and recalculate
//		var nextPos = this.getOpenPosition(x, y);
//		this.moveBear(bear, nextPos.x, nextPos.y);
//		var bearsPath = this.findPath(bear.gridPosition, bear.currResource);
//		console.log("*** Collision! Recalculating bearsPath: "+bearsPath);
//		bear.currPath = bearsPath;
//	}
			
	},
	
	hunterKilled: function(hunter)
	{
		console.log("hunter killed!");
		hunter.dead = true;
		//remove bear
		this.removeChild(hunter);
		
		//remove from array
		for (var i=0; i < this.hunters.length; i++)
		{
			//base on position
//			if (bears[i].gridPosition.x == bear.gridPosition.x &&
//				bears[i].gridPosition.y == bear.gridPosition.y)
			if (this.hunters[i] == hunter)
			{
				this.hunters.splice(i,1);
				break;
			}
		}
	},
	
	
	
	hunterEatsBear: function(hunter, bear)
	{
		hunter.eatBear(bear);
		this.bearEaten(bear);
	},
	
	bearEaten: function(bear)
	{
		this.bearKilled(bear);
	},
	
	randomXToY : function(minVal,maxVal)
	{
	  return Math.floor(minVal + (1+maxVal-minVal) * Math.random());
	},
});



module.exports = WorldNode
}, mimetype: "application/javascript", remote: false}; // END: /WorldNode.js


})();