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