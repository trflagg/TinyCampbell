
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
	   { name: 'next', from: 'g2', to: 'g3'    },
	   { name: 'next', from: 'g3', to: 'g4'    },
	   { name: 'next', from: 'g4', to: 'g5'    },
	   { name: 'next', from: 'g5', to: 'end'    },
	{ name: 'next', from: 'end', to: 'end' },
	],
	callbacks: {
		ong1: function(event, from, to, msg) 
		{ 
			console.log("ENTERED G1"); 
			parent.$("#currentGoal").html("<p>Create a bear.</p>");
			this.goalSuccessString = "Staple food created.";
		},
		ong2: function(event, from, to, msg) 
		{ 
			console.log("ENTERED G2"); 
			parent.$("#currentGoal").html("<p>Sustain 2 bears for 10 seconds.</p>");
			this.goalSuccessString = "Sustainability is the key to success.";
		},
		ong3: function(event, from, to, msg) 
		{ 
			console.log("ENTERED G3"); 
			parent.$("#currentGoal").html("<p>Sustain 4 bears for 10 seconds.</p>");
			this.goalSuccessString = "A strong herd is necessary for survival.";
		},
		ong4: function(event, from, to, msg) 
		{ 
			console.log("ENTERED G4"); 
			parent.$("#currentGoal").html("<p>Create a hunter.</p>");
			this.goalSuccessString = "Long, long ago there was only one of us.";
		},
		ong5: function(event, from, to, msg) 
		{ 
			console.log("ENTERED G4"); 
			parent.$("#currentGoal").html("<p>Sustain 2 hunters for 10 seconds.</p>");
			this.goalSuccessString = "Communication flourishes when there are 2.";
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
	
	owner: null,
	
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
			if (bearCount >= 2)
			{
				if (this.lastBear >= 2)
				{
					this.bearTime += dt;
					parent.$("#currentGoal").html("<p>Sustain 2 bears for 10 seconds.<br/>Best time: "+ Math.floor(this.bearTime)+"s.</p>");
					if (this.bearTime >= 10)
					{
						//reset!
						this.bearTime = 0;
						success = true;
					}
				}
			}
			else
			{
				//reset
				this.bearTime = 0;
			}
			
			this.lastBear = bearCount;
				
		}
		else if(this.fsm.is("g3"))
		{
			//bear sustained > 4 for 10s
			if (bearCount >= 4)
			{
				if (this.lastBear >= 4)
				{
					this.bearTime += dt;
					parent.$("#currentGoal").html("<p>Sustain 4 bears for 10 seconds.<br/>Best time: "+ Math.floor(this.bearTime)+"s.</p>");
					if (this.bearTime >= 10)
					{
						this.bearTime = 0;
						success = true;
					}
				}
			}
			else
			{
				//reset
				this.bearTime = 0;
			}
			
			this.lastBear = bearCount;
				
		}
		else if(this.fsm.is("g4"))
		{
			//create a hunter
			if (hunterCount >= 1)
			{
				success = true;
			}
				
		}
		else if(this.fsm.is("g5"))
		{
			//bear sustained > 4 for 10s
			if (hunterCount >= 2)
			{
				if (this.lastHunter >= 2)
				{
					this.hunterTime += dt;
					parent.$("#currentGoal").html("<p>Sustain 2 hunters for 10 seconds.<br/>Best time: "+ Math.floor(this.hunterTime)+"s.</p>");
					if (this.hunterTime >= 10)
					{
						this.hunterTime = 0;
						success = true;
					}
				}
			}
			else
			{
				//reset
				this.hunterTime = 0;
			}
			
			this.lastHunter = hunterCount;
				
		}
		
		if (success)
		{
			//success! Show message
			parent.$("#messageDiv").prepend("<p class='goalAchieved'>GOAL COMPLETED!!!! "+this.fsm.goalSuccessString+" +1 CULTURE!</p>");
			this.owner.addCulture(this.fsm.goalSuccessString);
			//next!
			this.fsm.next();
		}
			
	}
});

module.exports = GoalManager