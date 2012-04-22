
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
			this.currGoal = "bearCount > 0";
			parent.$("#currentGoal").html("Create a bear.");
			this.goalSuccessString = "The staple food source has been created. +1 culture.";
		},
		ong2: function(event, from, to, msg) 
		{ 
			console.log("ENTERED G2"); 
			parent.$("#currentGoal").html("Sustain 2 bears.");
			this.currGoal = "0";
			this.goalSuccessString = "Sustainability is the key to success. +1 culture.";
		},
	
	},
	});
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
		//check current goal
		if (eval(this.fsm.currGoal))
		{
			//success! Show message
			parent.$("#messageDiv").prepend("<p>"+this.fsm.goalSuccessString+"</p>");
			
			//next!
			this.fsm.next();
		}
			
	}
});

module.exports = GoalManager