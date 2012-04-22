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
var GoalManager = require('./GoalManager');

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
	
	this.goalManager = new GoalManager();
	
	this.setBackground("#ffffff");
	
	parent.$("#messageDiv").prepend("<p>Tiny World Machine (&copy;2012, TWM Inc.) booting up...</p>");
	parent.$("#messageDiv").prepend("<p>Machine is stopped. Press r to begin running machine.</p>");
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
	goalManager: null,
	
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
				//more bears = more bears made!
				perc += Const.bearGenerateBearMultiplier * this.bears.length;
				
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
		parent.$("#messageDiv").prepend("<p>New bear born.</p>");
		
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
		
		//count all resources
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
		parent.$("#bearCount").html("bears: "+this.bears.length);
		parent.$("#hunterCount").html("hunters: "+this.hunters.length);
		parent.$("#fishCount").html("fish: "+fishCount);
		parent.$("#plantCount").html("plants: "+plantCount);
		
		//update goals
		this.goalManager.updateGoals(dt, fishCount, plantCount, this.bears.length, this.hunters.length);
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
			parent.$("#messageDiv").prepend("<p>A bear has died of hunger.</p>");
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
		if (x < Const.worldSizeX && creatures[x+1][y] == 0)
			return new geo.Point(x+1, y);
		//left?
		if (x > 0 && creatures[x-1][y] == 0)
			return new geo.Point(x-1, y);
		//down?
		if (y > 0 && creatures[x][y-1] == 0)
			return new geo.Point(x, y-1);
			
		//no luck, return same position
		return new geo.Point(x, y);
	},
	
	makeCamp: function()
	{
		var newCamp = new Camp();
		console.log("new camp created!");
		parent.$("#messageDiv").prepend("<p>You can now place a hunter camp. <span class='important'>Hunter camps must be placed near a shore between water and empty space.</span></p>");
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
		parent.$("#messageDiv").prepend("<p>Hunter camp placed.</p>");
		
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
		if (!this.placingCamp)
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
		//do we have a camp? can't make a hunter without a camp!
		if (this.camp == null)
		{
			this.parent.startPlacingCamp();
		}
		else 
		{
			var newHunter = new Hunter();
			console.log("new hunter created!");
			parent.$("#messageDiv").prepend("<p>New hunter born.</p>");
			
			//position hunter at camp
			newHunter.setPositionByGrid(this.camp.gridPosition.x, this.camp.gridPosition.y);
			
			this.hunters.push(newHunter);
			this.parent.addChild(newHunter,1000);
		}
		
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
		parent.$("#messageDiv").prepend("<p>A hunter has died of hunger.</p>");
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
		parent.$("#messageDiv").prepend("<p>A hunter has eaten a bear.</p>");
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