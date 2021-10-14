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
let ctx = canvas.getContext('2d');

// Display loading text
ctx.font = '50px Arial';
ctx.textAlign = 'center';
ctx.fillText('Loading...', canvas.width/2, canvas.height/2);

// Load all images
let imageLoader = new ImageLoader(world);
let unitImages = await imageLoader.loadUnitImages();
let buildingImages = await imageLoader.loadBuildingImages();
let iconImages = await imageLoader.loadIconImages();

let dirtImages = await imageLoader.loadDirtTerrainImages();
let grassImages = await imageLoader.loadGrassTerrainImages();
let marsImages = await imageLoader.loadMarsTerrainImages();
let sandImages = await imageLoader.loadSandTerrainImages();
let stoneImages = await imageLoader.loadStoneTerrainImages();

let backgroundImages = await imageLoader.loadBackgroundImages();

// Register components and systems
world
	.registerComponent(Component.Acceleration)
	.registerComponent(Component.Velocity)
	.registerComponent(Component.CanvasPosition)
	.registerComponent(Component.MapPosition)
	.registerComponent(Component.MovePosition)
	.registerComponent(Component.AttackPosition)
	.registerComponent(Component.SelectPosition)
	.registerComponent(Component.Timer)
	.registerComponent(Component.Block)
	.registerComponent(Component.Tile)
	.registerComponent(Component.Hud)
	.registerComponent(Component.Unit)
	.registerComponent(Component.Building)
	.registerComponent(Component.Object)
	.registerComponent(Component.Health)
	.registerComponent(Component.Damage)
	.registerComponent(Component.Sight)
	.registerComponent(Component.Range)
	.registerComponent(Component.Speed)
	.registerComponent(Component.Image)
	.registerComponent(Component.UnitImage)
	.registerComponent(Component.BuildingImage)
	.registerComponent(Component.DirtImage)
	.registerComponent(Component.GrassImage)
	.registerComponent(Component.MarsImage)
	.registerComponent(Component.SandImage)
	.registerComponent(Component.StoneImage)
	.registerComponent(Component.IconImage)
	.registerComponent(Component.BackgroundImage)
	.registerComponent(Component.SelectedTile)
	.registerComponent(Component.SelectedUnit)
	.registerComponent(Component.SelectedBuilding)
	.registerComponent(Component.DamagePopup)
	.registerComponent(Component.ScreenStatus)
	.registerComponent(Component.ActionStatus)
	.registerComponent(Component.MouseStatus)
	.registerComponent(Component.KeyboardStatus)
	.registerComponent(Component.GameStatus)
	.registerSystem(System.KeyboardListenerSystem)
	.registerSystem(System.MouseListenerSystem)
	.registerSystem(System.MovementSystem)
	.registerSystem(System.ActionSystem)
	.registerSystem(System.RenderSystem, {
		priority: 10, 
		ctx: ctx, 
		canvasWidth: canvas.width, 
		canvasHeight: canvas.height
	})
	.registerSystem(System.LoaderSystem, {
		priority: -10, 

		iconImages: iconImages, 
		unitImages: unitImages,
		buildingImages: buildingImages, 
		dirtImages: dirtImages,
		grassImages: grassImages,
		marsImages: marsImages,
		sandImages: sandImages,
		stoneImages: stoneImages,
		backgroundImages: backgroundImages,

		mapWidth: tileMap.length, 
		mapHeight: tileMap[0].length, 
		canvasWidth: canvas.width, 
		canvasHeight: canvas.height
	})
	.registerSystem(System.TileSystem)
	.registerSystem(System.UnitSystem);

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
imageLoader.generateIconImage();
imageLoader.generateUnitImage();
imageLoader.generateBuildingImage();

imageLoader.generateDirtTerrainImage();
imageLoader.generateGrassTerrainImage();
imageLoader.generateMarsTerrainImage();
imageLoader.generateSandTerrainImage();
imageLoader.generateStoneTerrainImage();

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