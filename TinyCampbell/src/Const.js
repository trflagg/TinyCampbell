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