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
	
	this.position = new geo.Point(0,0);
	this.zOrder = -100;
	
	this.world = world;
	this.worldUpdated = true;
	
	
	this.setBackground("#ffffff");
}


// Inherit from cocos.nodes.Layer
WorldNode.inherit(Node, {
	world: null,
	worldUpdated: null,
	worldCache: null,
	bears: new Array(),
	
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
			var perc = Const.bearGenerateBasePercent;
			perc += Const.bearGenerateResourceMultiplier * (fishCount + plantCount);
			var rand = Math.random();
			//console.log("perc: "+perc);
			if (rand <= perc)
			{
				//console.log(rand +" <= "+perc);
				//make Bear
				this.makeNewBear();
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
		newBear.position = new geo.Point(result.x * Const.worldPixSizeX / 2, result.y * Const.worldPixSizeY / 2);
		//newBear.position = new geo.Point(260, 230);
		console.log("result = ("+result.x+", "+result.y+")");
		
		//newBear.position = new geo.Point(randX * Const.worldPixSizeX, randY * Const.worldPixSizeY);
		//console.log("newBear.position = ["+randX+", "+randY+"]");
		console.log("newBear.position = ("+newBear.position.x+", "+newBear.position.y+")");
		this.bears.push(newBear);
		this.parent.addChild(newBear,1000);
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
				if (resources[i][j] == -1 || resources[i][j] == -3)
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
		
		return bestMatch;		
	},
	
	randomXToY : function(minVal,maxVal)
	{
	  return Math.floor(minVal + (1+maxVal-minVal) * Math.random());
	},
});



module.exports = WorldNode