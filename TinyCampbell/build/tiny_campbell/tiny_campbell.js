(function(){
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
	
	'newResourceWaitTime': 500,
};

module.exports = Const
}, mimetype: "application/javascript", remote: false}; // END: /Const.js


__jah__.resources["/FishNode.js"] = {data: function (exports, require, module, __filename, __dirname) {
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
}, mimetype: "application/javascript", remote: false}; // END: /FishNode.js


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
var FishNode = require('./FishNode');

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
	
	for (var i=0; i< Const.worldSizeX; i++)
	{
		world[i] = new Array();
		resources[i] = new Array();
		
		for (var j=0; j< Const.worldSizeY; j++)
		{
			world[i][j] = 0;
			resources[i][j] = 0;
		}
	}
	
	this.world = world;
	this.worldUpdated = true;
	
	this.setBackground("#ffffff");
}


// Inherit from cocos.nodes.Layer
WorldNode.inherit(Node, {
	world: null,
	worldUpdated: null,
	worldCache: null,
	fish: new Array(),
	
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
					context.lineWidth = 4
					context.lineCap = "round"
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
					context.lineWidth = 4
					context.lineCap = "round"
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
		// 1= fish
		resources[x][y] = -1;
		this.worldUpdated = true;
		console.log("new fish at ("+x+","+y+")");
		
	},
	
	makeNewPlant: function(x, y)
	{
		// 1= fish
		resources[x][y] = -3;
		this.worldUpdated = true;
		console.log("new plant at ("+x+","+y+")");
		
	}
	
});



module.exports = WorldNode
}, mimetype: "application/javascript", remote: false}; // END: /WorldNode.js


})();