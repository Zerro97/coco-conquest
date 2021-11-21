import "regenerator-runtime/runtime";

// ECS
import { World } from "./Library/Ecsy";
import * as Component from "./Component";
import * as System from "./System";

// Type
import { BuildingType, UnitType } from "./Type";

// Map
import tileMap from "./Assets/Map/Tile/map_1.json";

// Loader & Generator
import { ImageLoader } from "./Util/ImageLoader";
import { MapGenerator, UnitGenerator } from "./Assemblage";
import { BuildingGenerator } from "./Assemblage/BuildingGenerator";

// Initialize the world
let world = new World({ entityPoolSize: 10000 });

// Get mainCanvas from DOM
let mainCanvas = document.querySelector("#main");
mainCanvas.width = window.innerWidth;
mainCanvas.height = window.innerHeight;
let ctx = mainCanvas.getContext("2d");

// Display loading text
ctx.font = "50px Arial";
ctx.textAlign = "center";
ctx.fillText("Loading...", mainCanvas.width / 2, mainCanvas.height / 2);

// Load all images
let imageLoader = new ImageLoader(world);

let tileImages = await imageLoader.loadTileImages();
let unitImages = await imageLoader.loadUnitImages();
let buildingImages = await imageLoader.loadBuildingImages();
let iconImages = await imageLoader.loadIconImages();
let backgroundImages = await imageLoader.loadBackgroundImages();

// Map Size
const MAP_SIZE = 15;

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

      mapWidth: MAP_SIZE,
      mapHeight: MAP_SIZE,
      canvasWidth: mainCanvas.width,
      canvasHeight: mainCanvas.height,
    })
    .registerSystem(System.KeyboardListenerSystem, {
      priority: -10,
    })
    .registerSystem(System.MouseListenerSystem, {
      priority: -10,
      canvasWidth: mainCanvas.width,
      canvasHeight: mainCanvas.height,
    })
    .registerSystem(System.KeyboardHandlerSystem, {
      priority: 0,
    })
    .registerSystem(System.MouseHandlerSystem, {
      priority: 0,
    })
    .registerSystem(System.GlobalGameSystem, {
      priority: 5
    })
    .registerSystem(System.ScreenSystem, {
      priority: 5,
      ctx: ctx,
      canvasWidth: mainCanvas.width,
      canvasHeight: mainCanvas.height,
    })
    .registerSystem(System.MovementSystem, {
      priority: 5,
    })
    .registerSystem(System.ActionSystem, {
      priority: 5,
    })
    .registerSystem(System.UnitSystem, {
      priority: 5,
    })
    .registerSystem(System.HudSystem, {
      priority: 6,
    })
    .registerSystem(System.TileSystem, {
      priority: 10,
      ctx: ctx,
      canvasWidth: mainCanvas.width,
      canvasHeight: mainCanvas.height,
    })
    .registerSystem(System.RegionSystem, {
      priority: 11,
      ctx: ctx,
      canvasWidth: mainCanvas.width,
      canvasHeight: mainCanvas.height,
    })
    .registerSystem(System.BuildingRenderSystem, {
      priority: 12,
      ctx: ctx,
      canvasWidth: mainCanvas.width,
      canvasHeight: mainCanvas.height,
    })
    .registerSystem(System.UnitRenderSystem, {
      priority: 13,
      ctx: ctx,
      canvasWidth: mainCanvas.width,
      canvasHeight: mainCanvas.height,
    })
    .registerSystem(System.RenderSystem, {
      priority: 14,
      ctx: ctx,
      canvasWidth: mainCanvas.width,
      canvasHeight: mainCanvas.height,
    })
    .registerSystem(System.GameHudSystem, {
      priority: 15,
      ctx: ctx,
      canvasWidth: mainCanvas.width,
      canvasHeight: mainCanvas.height,
    })
    .registerSystem(System.HudRenderSystem, {
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
world
  .createEntity()
  .addComponent(Component.WeightMap, { value: {} });
world
  .createEntity()
  .addComponent(Component.PreviousSelect);
world
  .createEntity()
  .addComponent(Component.GlobalStatus, { teamCount: 4 });
world
  .createEntity()
  .addComponent(Component.Turn, { currentTurn: 0, maxTurn: 300 });


// Store image objects as entity
imageLoader.generateTileImage();
imageLoader.generateIconImage();
imageLoader.generateUnitImage();
imageLoader.generateBuildingImage();
imageLoader.generateBackgroundImage();

// Generators
const unitGenerator = new UnitGenerator(world);
const buildingGenerator = new BuildingGenerator(world);
const mapGenerator = new MapGenerator(world, MAP_SIZE);

// Create Map
//mapGenerator.registerMap(tileMap);
//mapGenerator.generateTiles();
mapGenerator.generateBiomeRegion();
mapGenerator.generateMap();

// Adding Units
unitGenerator.generateUnit(UnitType.ARCHER , 5, 10, 0);
unitGenerator.generateUnit(UnitType.WARRIOR , 5, 9, 0);
unitGenerator.generateUnit(UnitType.SKELETON , 7, 10, 1);
unitGenerator.generateUnit(UnitType.WEREWOLF , 7, 9, 1);

// Adding Buildings
buildingGenerator.generateBuilding(BuildingType.CASTLE, 6, 9, 0);

export { world };
