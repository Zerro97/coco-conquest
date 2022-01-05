import { System } from "../../Library/Ecsy";
import {
  Region,
  Tile,
  TileMap,
  MapPosition,
  SceneStatus
} from "../../Component";
import { MapGenerator, UnitGenerator, BuildingGenerator } from "../../Assemblage";
import { cubeToEvenr } from "../../Util";
import { UnitType, BuildingType, SceneType } from "../../Type";
import { SceneSystem } from "../../System";

export class GameLoaderSystem extends System {
  execute(delta, time) {
    // Map & Unit Generation
    this.generateInitialMap();
    this.generateInitialBuilding();
    this.generateInitialUnit();

    // Map Preparation
    this.generateTileMap();
    this.assignTileToMap();
    this.assignRegions(10);

    // After Loading Change current scene from LOADING_GAME to GAME
    const scene = this.queries.sceneStatus.results[0].getMutableComponent(SceneStatus);
    scene.currentScene = SceneType.GAME;

    // Play stopped Scene System to allow switching scene
    this.world.getSystem(SceneSystem).play();

    // Stop loader from executing after finish loading
    this.stop();
  }

  generateInitialMap() {
    const mapGenerator = new MapGenerator(this.world, 15);

    // Create Map
    mapGenerator.generateBiomeRegion();
    mapGenerator.generateMap();
  }

  generateInitialUnit() {
    const unitGenerator = new UnitGenerator(this.world);
    
    // Adding Units
    unitGenerator.generateUnit(UnitType.ARCHER , 5, 10, 0);
    unitGenerator.generateUnit(UnitType.WARRIOR , 5, 9, 0);
    unitGenerator.generateUnit(UnitType.SKELETON , 7, 10, 1);
    unitGenerator.generateUnit(UnitType.WEREWOLF , 7, 9, 1);
  }

  generateInitialBuilding() {
    const buildingGenerator = new BuildingGenerator(this.world);
        
    // Adding Buildings
    buildingGenerator.generateBuilding(BuildingType.CASTLE, 6, 9, 0);
  }

  generateTileMap() {
    const tileMap = this.queries.tileMap.results;

    if (tileMap.length === 0) {
      const map = {};

      this.queries.tiles.results.forEach((tile) => {
        const mapPos = tile.getMutableComponent(MapPosition);
        const x = Math.sign(mapPos.x) == "-0" ? 0 : mapPos.x;
        const y = Math.sign(mapPos.y) == "-0" ? 0 : mapPos.y;
        const z = Math.sign(mapPos.z) == "-0" ? 0 : mapPos.z;

        if (!map[x]) {
          map[x] = {};
        }
        if (!map[x][y]) {
          map[x][y] = {};
        }
        if (!map[x][y][z]) {
          map[x][y][z] = {};
        }
      });

      this.world.createEntity().addComponent(TileMap, { value: map });
    }
  }

  assignTileToMap() {
    const tileMap =
      this.queries.tileMap.results[0].getMutableComponent(TileMap).value;

    this.queries.tiles.results.forEach((tile) => {
      const mapPos = tile.getMutableComponent(MapPosition);
      tileMap[mapPos.x][mapPos.y][mapPos.z] = tile;
    });
  }

  /**
   *
   * @param {*} num
   */
  assignRegions(num) {
    let centers = [];

    // Depending on map size, create different number of biomes
    let avgCount = -1;

    if (this.mapWidth <= 15) {
      avgCount = 3;
    } else if (this.mapWidth <= 20) {
      avgCount = 4;
    } else if (this.mapWidth <= 25) {
      avgCount = 5;
    } else if (this.mapWidth <= 40) {
      avgCount = 6;
    } else if (this.mapWidth <= 50) {
      avgCount = 8;
    }

    const avgWidth = this.mapWidth / avgCount;
    const avgHeight = this.mapHeight / avgCount;

    for (let i = 0; i < avgCount; i++) {
      for (let j = 0; j < avgCount; j++) {
        centers.push({
          x: Math.random() * avgWidth + avgWidth * i,
          y: Math.random() * avgHeight + avgHeight * j,
        });
      }
    }

    this.queries.tiles.results.forEach((tile) => {
      let region = tile.getMutableComponent(Region);
      let mapPos = tile.getComponent(MapPosition);
      let evenRPos = cubeToEvenr(mapPos.x, mapPos.z);

      let minDist = 99999;
      let index = -1;

      for (let k = 0; k < centers.length; k++) {
        const dx = centers[k].x - evenRPos.x;
        const dy = centers[k].y - evenRPos.y;
        const distance = Math.hypot(dx, dy);

        if (distance < minDist) {
          minDist = distance;
          index = k;
        }
      }

      region.region = index;
    });
  }
}

GameLoaderSystem.queries = {
  tiles: {
    components: [Tile, Region],
  },
  tileMap: {
    components: [TileMap],
  },
  sceneStatus: {
    components: [SceneStatus]
  }
};
