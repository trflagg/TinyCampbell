Tiny World Machine Inc.

This is my entry for Ludum Dare #23, based on the theme of 'Tiny World.'

You can play the game on my website:
http://hi-scor.es/tiny_world_machine/game.html

Please keep in mind that this code was all written in 48 hours. It's not the prettiest, most-efficient, or best-organized -but it's fun.


Highlights:
TinyCampbell/src/WorldLayer.js - Game initialization, event callbacks & main update loop.

TinyCampbell/src/WorldNode.js - Represents the game world. This class contains the data structures that represent the world and the logic to run it. It has multiple arrays to store the locations of resources, bears, and hunters. Every frame the resources are checked to see if fish or plants should appear, resources are counted to see if a new bear or hunter should be generated, the existing bears and hunters use a* pathfinding to get to their next meal, and the world is drawn based on the data.

TinyCampbell/src/GoalManager.js - Uses a finite state machine to keep track of the player's current progress through the game's goals.



This game uses the Cocos2dJS graphics library
http://cocos2d-javascript.org/


Enjoy!
