import "regenerator-runtime/runtime";

// ECS
import { World } from "./Library/Ecsy";
import * as Component from "./Component";
import * as System from "./System";

// Map
import tileMap from "./Assets/Map/Tile/map_1.json";
import unitMap from "./Assets/Map/Unit/map_1.json";
import buildingMap from "./Assets/Map/Building/map_1.json";

// Loader & Generator
import { ImageLoader } from "./Util/ImageLoader";
import { MapGenerator, UnitGenerator } from "./Assemblage";

// Initialize the world
let world = new World({ entityPoolSize: 10000 });

// Get canvas from DOM
let canvas = document.querySelector("#main");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let ctx = canvas.getContext("2d");

// Display loading text
ctx.font = "50px Arial";
ctx.textAlign = "center";
ctx.fillText("Loading...", canvas.width/2, canvas.height/2);

// Load all images
let imageLoader = new ImageLoader(world);

let tileImages = await imageLoader.loadTileImages();
let unitImages = await imageLoader.loadUnitImages();
let buildingImages = await imageLoader.loadBuildingImages();
let iconImages = await imageLoader.loadIconImages();
let backgroundImages = await imageLoader.loadBackgroundImages();

// Register components 
function registerComponents() {
	Object.keys(Component).forEach((comp) => {
		world.registerComponent(Component[comp]);
	});
}

// Register systems 
function registerSystems() {
	world
		.registerSystem(System.LoaderSystem, {
			priority: -99, 

			tileImages: tileImages,
			iconImages: iconImages, 
			unitImages: unitImages,
			buildingImages: buildingImages, 
			backgroundImages: backgroundImages,

			mapWidth: tileMap.length, 
			mapHeight: tileMap[0].length, 
			canvasWidth: canvas.width, 
			canvasHeight: canvas.height
		})
		.registerSystem(System.KeyboardListenerSystem, {
			priority: -10
		})
		.registerSystem(System.MouseListenerSystem, {
			priority: -10,
			canvasWidth: canvas.width, 
			canvasHeight: canvas.height
		})
		.registerSystem(System.KeyboardHandlerSystem, {
			priority: 0
		})
		.registerSystem(System.MouseHandlerSystem, {
			priority: 0
		})
		.registerSystem(System.ScreenSystem, {
			priority: 5, 
			ctx: ctx, 
			canvasWidth: canvas.width, 
			canvasHeight: canvas.height
		})
		.registerSystem(System.MovementSystem, {
			priority: 5
		})
		.registerSystem(System.ActionSystem, {
			priority: 5
		})
		.registerSystem(System.UnitSystem, {
			priority: 5
		})
		.registerSystem(System.TileSystem, {
			priority: 9, 
			ctx: ctx,
			canvasWidth: canvas.width, 
			canvasHeight: canvas.height
		})
		.registerSystem(System.RenderSystem, {
			priority: 10, 
			ctx: ctx, 
			canvasWidth: canvas.width, 
			canvasHeight: canvas.height
		})
		.registerSystem(System.HudSystem, {
			priority: 11, 
			ctx: ctx, 
			canvasWidth: canvas.width, 
			canvasHeight: canvas.height
		});
}

// Register systems 
registerComponents();
registerSystems();

// Singleton entities
world
	.createEntity()
	.addComponent(Component.ScreenStatus);
world
	.createEntity()
	.addComponent(Component.ActionStatus)
	.addComponent(Component.MovePosition)
	.addComponent(Component.AttackPosition)
	.addComponent(Component.SelectPosition);
world
	.createEntity()
	.addComponent(Component.GameStatus);
world
	.createEntity()
	.addComponent(Component.MouseStatus);
world
	.createEntity()
	.addComponent(Component.KeyboardStatus);
world
	.createEntity()
	.addComponent(Component.Block)
	.addComponent(Component.Timer);

// Store image objects as entity
imageLoader.generateTileImage();
imageLoader.generateIconImage();
imageLoader.generateUnitImage();
imageLoader.generateBuildingImage();
imageLoader.generateBackgroundImage();

// Generators
const unitGenerator = new UnitGenerator(world);
const mapGenerator = new MapGenerator(world);

// Create Map
mapGenerator.registerTileMap(tileMap);
mapGenerator.registerUnitMap(unitMap);
mapGenerator.registerBuildingMap(buildingMap);
mapGenerator.generateTiles();
mapGenerator.generateUnits();

// Adding Units
// unitGenerator.generateUnit(0);
// unitGenerator.generateUnit(1);
// unitGenerator.generateUnit(2);

export { world };