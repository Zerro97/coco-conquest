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
import { ImageLoader } from "./Util/Boot/ImageLoader";
import { MapGenerator, UnitGenerator } from "./Assemblage";
import { BuildingGenerator } from "./Assemblage/BuildingGenerator";
import { BootManager } from "./Util";

// Initialize the world
let world = new World({ entityPoolSize: 10000 });

// Get mainCanvas from DOM
let canvas = document.querySelector("#main");

// Display loading text
// ctx.font = "50px Arial";
// ctx.textAlign = "center";
// ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2);

let bootManager = new BootManager(world, canvas, 15);
bootManager.boot();

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
  .addComponent(Component.GlobalStatus, { teamCount: 4, myTeamId: 0 })
  .addComponent(Component.GameStatus);
world
  .createEntity()
  .addComponent(Component.Turn, { currentTurn: 0, maxTurn: 300 });

// Store image objects as entity
// imageLoader.generateTileImage();
// imageLoader.generateIconImage();
// imageLoader.generateUnitImage();
// imageLoader.generateBuildingImage();
// imageLoader.generateBackgroundImage();

// Generators
const unitGenerator = new UnitGenerator(world);
const buildingGenerator = new BuildingGenerator(world);
const mapGenerator = new MapGenerator(world, 15);

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
