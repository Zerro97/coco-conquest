import 'regenerator-runtime/runtime';

import map from './Assets/Map/map_1.json';
import { ImageLoader } from './Util/ImageLoader';

import { World } from './Library/Ecsy';
import * as Component from './Component';
import * as System from './System';
import { TileGenerator, UnitGenerator } from './Assemblage';

// Get canvas from DOM
var canvas = document.querySelector('#main');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load all images
let imageLoader = new ImageLoader();
let images = await imageLoader.loadUnitImages();

// Create world and register the components and systems on it
var world = new World({ entityPoolSize: 10000 });
world
	.registerComponent(Component.Acceleration)
	.registerComponent(Component.Velocity)
	.registerComponent(Component.CanvasPosition)
	.registerComponent(Component.MapPosition)
	.registerComponent(Component.Renderable)
	.registerComponent(Component.Shape)
	.registerComponent(Component.Tile)
	.registerComponent(Component.Hud)
	.registerComponent(Component.Unit)
	.registerComponent(Component.Building)
	.registerComponent(Component.Health)
	.registerComponent(Component.Damage)
	.registerComponent(Component.Sight)
	.registerComponent(Component.Range)
	.registerComponent(Component.Speed)
	.registerComponent(Component.Image)
	.registerComponent(Component.ScreenStatus)
	.registerSystem(System.KeyboardListenerSystem)
	.registerSystem(System.MouseListenerSystem)
	.registerSystem(System.MovementSystem)
	.registerSystem(System.RenderSystem, {priority: 10, ctx: canvas.getContext('2d'), canvasWidth: canvas.width, canvasHeight: canvas.height})
	.registerSystem(System.LoaderSystem, {priority: -10, images: images})
	.registerSystem(System.TileSystem)
	.registerSystem(System.UnitSystem);

// Singleton components
world
	.createEntity()
	.addComponent(Component.ScreenStatus);


// Store image objects as entity
for(const key in images) {
	world
		.createEntity()
		.addComponent(Component.Image);
}

// Generators
const unitGenerator = new UnitGenerator(world);
const tileGenerator = new TileGenerator(world);

// Create Map
tileGenerator.registerMap(map);
tileGenerator.generateTiles();

// Adding Units
unitGenerator.generateUnit(0);
unitGenerator.generateUnit(1);
unitGenerator.generateUnit(2);

export { world };