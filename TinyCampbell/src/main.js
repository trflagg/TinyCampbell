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
	director.displayFPS = false;
	
	
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
