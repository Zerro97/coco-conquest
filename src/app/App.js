import { readFileSync } from 'fs';

import { World } from './Library/Ecsy';
import * as Component from './Component';
import * as System from './System';
import { TileGenerator } from './Assemblage';

// Get canvas from DOM
var canvas = document.querySelector('#main');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Create world and register the components and systems on it
var world = new World();
world
	.registerComponent(Component.Acceleration)
	.registerComponent(Component.Velocity)
	.registerComponent(Component.Position)
	.registerComponent(Component.Renderable)
	.registerComponent(Component.Shape)
	.registerComponent(Component.Tile)
	.registerComponent(Component.Hud)
	.registerComponent(Component.Unit)
	.registerComponent(Component.Building)
	.registerComponent(Component.ScreenStatus)
	.registerSystem(System.KeyboardListenerSystem)
	.registerSystem(System.MouseListenerSystem)
	.registerSystem(System.MovementSystem)
	.registerSystem(System.RenderSystem, {canvas: canvas})
	.registerSystem(System.TileSystem);

// Singleton components
world
	.createEntity()
	.addComponent(Component.ScreenStatus);


// Generators
const tileGenerator = new TileGenerator();

// Create Map
let mapFile = readFileSync('./Assets/Map/map_1.json');
let map = JSON.parse(mapFile);

tileGenerator.registerMap(map);
tileGenerator.generateTiles();

export { world };