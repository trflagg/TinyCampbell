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
	
	'fishGenerateBasePercent': .005,
	'fishSurroundedMultiplier': .001,
	
	'newResourceWaitTime': 50,
	'eatenResourceWaitTime': 500,
	
	'bearTimerStart': 40,
	
	'bearMinFish': 4,
	'bearMinPlants': 4,
	'bearGenerateBasePercent': .004,
	'bearGenerateResourceMultiplier': .00005,
	'bearGenerateBearMultiplier': .0001,
	
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
	
	'hunterMinBearCount': 4,
	'hunterGenerateBasePercent': .005,
	'hunterGenerateResourceMultiplier': .001,
	'hunterGenerateHunterMultiplier': .001,
	'hunterTimerStart': 0,
	
	'hunterFullHealth': 70,
	'hunterHealthDecPerTick': 1,
};

module.exports = Const