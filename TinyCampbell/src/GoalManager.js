
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
GoalManager = function() {
    // You must always call the super class constructor
    GoalManager.superclass.constructor.call(this);
	
	this.currGoal = "0";
	
	var fsm = parent.StateMachine.create({
	initial: 'g1',
	events: [
	   { name: 'next',  from: 'g1',  to: 'g2' },
	   { name: 'next', from: 'g2', to: 'end'    },
	{ name: 'next', from: 'end', to: 'end' },
	],
	callbacks: {
		ong1: function(event, from, to, msg) 
		{ 
			console.log("ENTERED G1"); 
			parent.$("#currentGoal").html("<p>Create a bear.</p>");
			this.goalSuccessString = "The staple food source has been created. +1 culture.";
		},
		ong2: function(event, from, to, msg) 
		{ 
			console.log("ENTERED G2"); 
			parent.$("#currentGoal").html("<p>Sustain 2 bears for 6 seconds.</p>");
			this.goalSuccessString = "Sustainability is the key to success. +1 culture.";
		},
	
	},
	});
	
	this.lastFish = 0;
	this.lastPlant = 0;
	this.lastBear = 0;
	this.lastHunter = 0;
	
	this.fishTime = 0,
	this.plantTime = 0,
	this.bearTime = 0,
	this.hunterTime = 0,
	this.fsm = fsm;
}

//////////////
// Inherit function
/////////////
GoalManager.inherit(Object, {
	fsm: null,
	lastFish: null,
	lastPlant: null,
	lastBear: null,
	lastHunter: null,
	fishTime: null,
	plantTime: null,
	bearTime: null,
	hunterTime: null,
	
	currGoal: null,
	goalString: null,
	goalSuccessString: null,
	
	updateGoals: function(dt, fishCount, plantCount, bearCount, hunterCount)
	{
		var success = false;
		//check current goal
		//goal 1
		if (this.fsm.is("g1"))
		{
			//bear > 1
			if (bearCount >= 1)
			{
				success = true;
			}
		}
		else if(this.fsm.is("g2"))
		{
			//bear sustained > 1 for 6s
			if (bearCount >= 1)
			{
				if (this.lastBear >= 1)
				{
					console.log("2 bears!!!!!!!!!!!");
					this.bearTime += dt;
					parent.$("#currentGoal").html("<p>Sustain 2 bears for 6 seconds.<br/>Time: "+ Math.floor(this.bearTime)+"s.</p>");
					if (this.bearTime >= 6)
					{
						success = true;
					}
				}
			}
			
			this.lastBear = bearCount;
				
		}
		
		if (success)
		{
			//success! Show message
			parent.$("#messageDiv").prepend("<p>"+this.fsm.goalSuccessString+"</p>");

			//next!
			this.fsm.next();
		}
			
	}
});

module.exports = GoalManager