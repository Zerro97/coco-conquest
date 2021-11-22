import { System } from "../../../Library/Ecsy";
import {
  Tile,
  MapPosition,
  CanvasPosition,
  Region,
  TileMap,
} from "../../../Component";
import {
  drawBoundary,
} from "../../../Util";
import { TileSize } from "../../../Type";

export class RegionSystem extends System {
  // This method will get called on every frame by default
  execute(delta, time) {
    this.drawTerritoryBoundary();
  }

  drawTerritoryBoundary() {
    const tileMap = this.queries.tileMap.results[0].getMutableComponent(TileMap).value;

    for(const x in tileMap) {
      for(const y in tileMap[x]) {
        for(const z in tileMap[x][y]) {
          const posX = Number(x);
          const posY = Number(y);
          const posZ = Number(z);
          const curRegion = tileMap[x][y][z].getMutableComponent(Region);
          const canvasPos = tileMap[x][y][z].getMutableComponent(CanvasPosition);

          const edges = this.getEdges(tileMap, curRegion.region, posX, posY, posZ);
          
          drawBoundary(this.ctx, canvasPos.x, canvasPos.y, TileSize.REGULAR, edges);

        }
      }
    }
  }

  getEdges(tileMap, curRegion, posX, posY, posZ) {
    let edges = [false, false, false, false, false, false];

    if(tileMap[posX-1] &&
      tileMap[posX-1][posY] &&
      tileMap[posX-1][posY][posZ+1]?.getMutableComponent(Region).region !== curRegion) {
      edges[0] = true;
    } 
    if(tileMap[posX] && 
      tileMap[posX][posY-1] &&
      tileMap[posX][posY-1][posZ+1]?.getMutableComponent(Region).region !== curRegion) {
      edges[1] = true;
    } 
    if(tileMap[posX+1] && 
      tileMap[posX+1][posY-1] &&
      tileMap[posX+1][posY-1][posZ]?.getMutableComponent(Region).region !== curRegion) {
      edges[2] = true;
    } 
    if(tileMap[posX+1] && 
      tileMap[posX+1][posY] &&
      tileMap[posX+1][posY][posZ-1]?.getMutableComponent(Region).region !== curRegion) {
      edges[3] = true;
    } 
    if(tileMap[posX] && 
      tileMap[posX][posY+1] &&
      tileMap[posX][posY+1][posZ-1]?.getMutableComponent(Region).region !== curRegion) {
      edges[4] = true;
    } 
    
    if(tileMap[posX-1] && 
      tileMap[posX-1][posY+1] &&
      tileMap[posX-1][posY+1][posZ]?.getMutableComponent(Region).region !== curRegion) {
      edges[5] = true;
    }

    return edges;
  }
}

// Define a query of entities
RegionSystem.queries = {
  tileMap: {
    components: [TileMap]
  },
  tiles: {
    components: [Tile, MapPosition, CanvasPosition],
  }
};
