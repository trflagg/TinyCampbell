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
	
	draw: function(context, rect)
	{
		//console.log("bear.position = ("+this.position.x+", "+this.position.y+")");
		context.fillStyle = "#9c7249";
		context.fillRect(this.position.x,this.position.y,Const.worldPixSizeX,Const.worldPixSizeY);
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
	},
});

module.exports = Bear
}, mimetype: "application/javascript", remote: false}; // END: /Bear.js


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
	
	'bearTimerStart': 300,
	
	'bearMinFish': 3,
	'bearMinPlants': 3,
	'bearGenerateBasePercent': .001,
	'bearGenerateResourceMultiplier': .0005,
	
	'bearGraphWeights': {
		0 : 0,
		1: 5,
		2: 1,
		3: 5,
	},
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
			this.worldNode.tickCreatures();
			this.worldNode.checkResources(dt);
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
		console.log("mouseDown.position = ("+p.x+", "+p.y+")");
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
var Bear = require('./Bear');

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
	
	
	this.setBackground("#ffffff");
}


// Inherit from cocos.nodes.Layer
WorldNode.inherit(Node, {
	world: null,
	worldUpdated: null,
	worldCache: null,
	bears: new Array(),
	bearTimer: null,
	
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
			var bearsPath = this.findPath(bear.gridPosition, nextResource);
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
	
	findPath: function(start, end)
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
			var bearsPath = this.findPath(bear.gridPosition, bear.currResource);
			console.log("*** Collision! Recalculating bearsPath: "+bearsPath);
			bear.currPath = bearsPath;
		}
			
	},
		
	bearClaimsResource: function(bear, result)
	{
		resourceClaims[result.x][result.y] = 1;
		bear.currResource = result;
	},
	
	bearEatsResource: function(bear, i, j)
	{
		bear.eatResource(resources[i][j]);
		resourceClaims[i][j] = 0;
		resources[i][j] = Const.eatenResourceWaitTime;
		this.worldUpdated = true;
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
		
	randomXToY : function(minVal,maxVal)
	{
	  return Math.floor(minVal + (1+maxVal-minVal) * Math.random());
	},
});



module.exports = WorldNode
}, mimetype: "application/javascript", remote: false}; // END: /WorldNode.js


})();