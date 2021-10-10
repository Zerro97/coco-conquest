import 'regenerator-runtime/runtime';

// ECS
import { World } from './Library/Ecsy';
import * as Component from './Component';
import * as System from './System';

// Map
import tileMap from './Assets/Map/Tile/map_1.json';
import unitMap from './Assets/Map/Unit/map_1.json';
import buildingMap from './Assets/Map/Building/map_1.json';

// Loader & Generator
import { ImageLoader } from './Util/ImageLoader';
import { MapGenerator, UnitGenerator } from './Assemblage';

// Initialize the world
let world = new World({ entityPoolSize: 10000 });

// Get canvas from DOM
let canvas = document.querySelector('#main');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Load all images
let imageLoader = new ImageLoader(world);
let unitImages = await imageLoader.loadUnitImages();
let buildingImages = await imageLoader.loadBuildingImages();
let iconImages = await imageLoader.loadIconImages();

// Register components and systems
world
	.registerComponent(Component.Acceleration)
	.registerComponent(Component.Velocity)
	.registerComponent(Component.CanvasPosition)
	.registerComponent(Component.MapPosition)
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
	.registerComponent(Component.UnitImage)
	.registerComponent(Component.BuildingImage)
	.registerComponent(Component.IconImage)
	.registerComponent(Component.ScreenStatus)
	.registerComponent(Component.ActionStatus)
	.registerComponent(Component.GameStatus)
	.registerSystem(System.KeyboardListenerSystem)
	.registerSystem(System.MouseListenerSystem)
	.registerSystem(System.MovementSystem)
	.registerSystem(System.RenderSystem, {
		priority: 10, 
		ctx: canvas.getContext('2d'), 
		canvasWidth: canvas.width, 
		canvasHeight: canvas.height
	})
	.registerSystem(System.LoaderSystem, {
		priority: -10, 
		iconImages: iconImages, 
		unitImages: unitImages, 
		buildingImages: buildingImages, 
		mapWidth: tileMap.length, 
		mapHeight: tileMap[0].length, 
		canvasWidth: canvas.width, 
		canvasHeight: canvas.height
	})
	.registerSystem(System.TileSystem)
	.registerSystem(System.UnitSystem);

// Singleton components
world
	.createEntity()
	.addComponent(Component.ScreenStatus);
world
	.createEntity()
	.addComponent(Component.ActionStatus);
world
	.createEntity()
	.addComponent(Component.GameStatus);


// Store image objects as entity
imageLoader.generateIconImage();
imageLoader.generateUnitImage();
imageLoader.generateBuildingImage();

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