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

// Get mainCanvas from DOM
let mainCanvas = document.querySelector("#main");
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;
let ctx = mainCanvas.getContext("2d");

// let layer1Canvas = document.querySelector("#layer_1");
// layer1Canvas.width = window.innerWidth;
// layer1Canvas.height = window.innerHeight;
// let ctx1 = mainCanvas.getContext("2d");

// Display loading text
ctx.font = "50px Arial";
ctx.textAlign = "center";
ctx.fillText("Loading...", mainCanvas.width/2, mainCanvas.height/2);

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
			canvasWidth: mainCanvas.width, 
			canvasHeight: mainCanvas.height
		})
		.registerSystem(System.KeyboardListenerSystem, {
			priority: -10
		})
		.registerSystem(System.MouseListenerSystem, {
			priority: -10,
			canvasWidth: mainCanvas.width, 
			canvasHeight: mainCanvas.height
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
			canvasWidth: mainCanvas.width, 
			canvasHeight: mainCanvas.height
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
			priority: 10, 
			ctx: ctx,
			canvasWidth: mainCanvas.width, 
			canvasHeight: mainCanvas.height
		})
		.registerSystem(System.UnitRenderSystem, {
			priority: 11,
			ctx: ctx,
			canvasWidth: mainCanvas.width, 
			canvasHeight: mainCanvas.height
		})
		.registerSystem(System.RenderSystem, {
			priority: 12, 
			ctx: ctx, 
			canvasWidth: mainCanvas.width, 
			canvasHeight: mainCanvas.height
		})
		.registerSystem(System.GameHudSystem, {
			priority: 13, 
			ctx: ctx, 
			canvasWidth: mainCanvas.width, 
			canvasHeight: mainCanvas.height
		})
		.registerSystem(System.HudSystem, {
			priority: 20, 
			ctx: ctx,
			canvasWidth: mainCanvas.width, 
			canvasHeight: mainCanvas.height,
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
	.addComponent(Component.ScreenFocusStatus);
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
mapGenerator.generateTiles();

// Adding Units
unitGenerator.generateUnit(0, 5, 0);
unitGenerator.generateUnit(1, 5, 1);
unitGenerator.generateUnit(2, 5, 2);
unitGenerator.generateUnit(3, 5, 3);
unitGenerator.generateUnit(4, 5, 4);
unitGenerator.generateUnit(5, 5, 5);
unitGenerator.generateUnit(6, 5, 6);
unitGenerator.generateUnit(7, 5, 7);
unitGenerator.generateUnit(8, 5, 8);
unitGenerator.generateUnit(9, 5, 9);
unitGenerator.generateUnit(10, 5, 10);
unitGenerator.generateUnit(11, 5, 11);
unitGenerator.generateUnit(12, 5, 12);

unitGenerator.generateUnit(13, 6, 0);
unitGenerator.generateUnit(14, 6, 1);
unitGenerator.generateUnit(15, 6, 2);
unitGenerator.generateUnit(16, 6, 3);
unitGenerator.generateUnit(17, 6, 4);
unitGenerator.generateUnit(18, 6, 5);
unitGenerator.generateUnit(64, 6, 6);
unitGenerator.generateUnit(65, 6, 7);
unitGenerator.generateUnit(66, 6, 8);
unitGenerator.generateUnit(67, 6, 9);
unitGenerator.generateUnit(68, 6, 10);
unitGenerator.generateUnit(69, 6, 11);
unitGenerator.generateUnit(70, 6, 12);

export { world };