import { System } from "../../Library/Ecsy";
import {
  Tile,
  MapPosition,
  CurrentHover,
  CurrentSelect,
  CanvasPosition,
  TileImage,
  Image,
} from "../../Component";
import {
  cubeToPixel,
  drawHoveringTile,
  drawSelectedTile,
  drawImageTile,
  drawBoundary,
} from "../../Util";
import { TileSize } from "../../Type";

export class TileSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {
    this.drawTerritoryBoundary();
  }

  drawTerritoryBoundary() {
    this.queries.tiles.results.forEach((entity) => {
        let tile = entity.getMutableComponent(Tile);
        let region = entity.getMutableComponent(Region).region;
        let mapPos = entity.getMutableComponent(MapPosition);
        let canvasPos = entity.getMutableComponent(CanvasPosition);

        if()

        drawBoundary(this.ctx, canvasPos.x, canvasPos.y, TileSize.REGULAR, )
    });
  }

  getRegionOfTile(mapPos) {
    this.queries.tiles.results.forEach((entity) => {
        let pos = entity.getMutableComponent(MapPosition);

        if(pos === mapPos) {
            
        }
    });
  }

  isDifferentNeighborRegion(mapPos){
    
  }
}

// Define a query of entities
TileSystem.queries = {
  tiles: {
    components: [Tile, MapPosition, CanvasPosition],
  }
};
