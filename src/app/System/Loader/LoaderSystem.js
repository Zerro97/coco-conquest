import { System } from "../../Library/Ecsy";
import {
  Image,
  UnitImage,
  BuildingImage,
  IconImage,
  TileImage,
  BackgroundImage,
  ScreenStatus,
  Region,
  Tile,
  TileMap,
  MapPosition,
} from "../../Component";
import { cubeToEvenr, evenrToCube, evenrToPixel } from "../../Util";
import { TileSize } from "../../Type";

export class LoaderSystem extends System {
  execute(delta, time) {
    // Bring images to ECS system
    this.loadImages();

    // Initial screen position
    this.setInitialPosition();

    // Map Preparation
    this.generateTileMap();
    this.assignTileToMap();
    this.assignRegions(10);

    this.stop();
  }

  loadImages() {
    let counter = {
      icon: 0,
      tile: 0,
      unit: 0,
      building: 0,
      background: 0,
    };

    let iconKeys = Object.keys(this.iconImages);
    let tileKeys = Object.keys(this.tileImages);
    let unitKeys = Object.keys(this.unitImages);
    let buildingKeys = Object.keys(this.buildingImages);
    let backgroundKeys = Object.keys(this.backgroundImages);

    this.queries.images.results.forEach((entity) => {
      var image = entity.getMutableComponent(Image);

      if (entity.hasComponent(UnitImage)) {
        image.name = unitKeys[counter.unit];
        image.value = this.unitImages[unitKeys[counter.unit]];
        counter.unit += 1;
      } else if (entity.hasComponent(BuildingImage)) {
        image.name = buildingKeys[counter.building];
        image.value = this.buildingImages[buildingKeys[counter.building]];
        counter.building += 1;
      } else if (entity.hasComponent(TileImage)) {
        image.name = tileKeys[counter.tile];
        image.value = this.tileImages[tileKeys[counter.tile]];
        counter.tile += 1;
      } else if (entity.hasComponent(IconImage)) {
        image.name = iconKeys[counter.icon];
        image.value = this.iconImages[iconKeys[counter.icon]];
        counter.icon += 1;
      } else if (entity.hasComponent(BackgroundImage)) {
        image.name = backgroundKeys[counter.background];
        image.value = this.backgroundImages[backgroundKeys[counter.background]];
        counter.background += 1;
      }
    });
  }

  setInitialPosition() {
    let screenStatus =
      this.queries.screenStatus.results[0].getMutableComponent(ScreenStatus);
    let canvasPos = evenrToPixel(
      this.mapWidth / 2,
      this.mapHeight / 2,
      TileSize.REGULAR
    );

    screenStatus.x = canvasPos.x - this.canvasWidth / 2;
    screenStatus.y = canvasPos.y - this.canvasHeight / 2;
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

LoaderSystem.queries = {
  images: {
    components: [Image],
  },
  screenStatus: {
    components: [ScreenStatus],
  },
  tiles: {
    components: [Tile, Region],
  },
  tileMap: {
    components: [TileMap],
  },
};
