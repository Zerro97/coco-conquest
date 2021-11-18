import { Tile, MapPosition, GameObject, Hoverable, Selectable, CanvasPosition, Region, TileMap } from "../Component";
import { cubeToPixel, evenrToCube } from "../Util";
import { GameObjectType, Shape, TileSize } from "../Type";

export class MapGenerator {
	constructor(world, size = 20) {
		this.world = world;
		this.map = [];
    // SMALL: 15, REGULAR: 20, BIG: 30, HUGE: 40
    this.size = size; 
    this.biomeMap = [];

    for(let i=0; i<size; i++) {
      this.biomeMap.push([]);
      for(let j=0; j<size; j++) {
        let type = 30;
        if(Math.random() < 0.2) {
          type = 28;
        }
        if(Math.random() < 0.2) {
          type = 29;
        }
        this.biomeMap[i].push(type);
      }
    }
	}

	/**
	 * 
	 * @param {Array} map 2d array
	 */
	registerMap(map) {
		if(Array.isArray(map) && Array.isArray(map[0])) {
			this.tileMap = map;
		} else {
			console.error("Map has to be 2d array");
		}
	}

  generateBiomeRegion() {
    let centers = [];

    // Create a random mapping array from 0 - 15
    const randMapping = [];
    for(let i=0; i<16; i++) {
      randMapping.push(i);
    }

    let curIndex = 16;
    while(curIndex != 0) {
      let randomIndex = Math.floor(Math.random() * curIndex);
      curIndex--;

      [randMapping[curIndex], randMapping[randomIndex]] = [randMapping[randomIndex], randMapping[curIndex]];
    }

    // Create random center points
    const avgCount = 4;
    const avgWidth = this.size / avgCount;
    const avgHeight = this.size / avgCount;

		for(let i=0; i<avgCount; i++) {
      for(let j=0; j<avgCount; j++) {
        centers.push({x: Math.random() * avgWidth + avgWidth * i, y: Math.random() * avgHeight + avgHeight * j});
      }
		}

    // Assign tiles a biome region
    for(let row=1; row<this.size-1; row++) {
      for(let col=1; col<this.size-1; col++) {
        let minDist = 99999;
        let index = -1;

        for(let k=0; k<centers.length; k++) {
          const dx = centers[k].x - col;
          const dy = centers[k].y - row;
          const distance = Math.hypot(dx, dy);
    
          if(distance < minDist) {
            minDist = distance;
            index = k;
          }
        }
        this.biomeMap[row][col] = randMapping[index];
        
        // Create outer ocean
        if(row === 1 || col === 1 || row === this.size-2 || col === this.size-2 &&
           row >0 && row < this.size-1 && col > 0 && col < this.size-1) {
          if(Math.random() < 0.5) {
            this.biomeMap[row][col] = 30;
          }
        }
        if(row === 2 || col === 2 || row === this.size-3 || col === this.size-3 &&
           row > 1 && row < this.size-2 && col > 1 && col < this.size-2) {
          const neighborTypes = this.getNeighbors(this.biomeMap, row, col);
          let hasOceanNeighbor = false;
          for(let i=0; i<6; i++) {
            if(neighborTypes[i] === 30 || neighborTypes[i] === 29 || neighborTypes[i] === 28) {
              hasOceanNeighbor = true;
            }
          }

          if(Math.random() < 0.2 && hasOceanNeighbor ) {
            this.biomeMap[row][col] = 30;
          }
        }
        if((row === 3 || col === 3 || row === this.size-4 || col === this.size-4) &&
         row > 2 && row < this.size-3 && col > 2 && col < this.size-3) {
          const neighborTypes = this.getNeighbors(this.biomeMap, row, col);
          console.log(neighborTypes, this.biomeMap[row][col], row, col);
          let hasOceanNeighbor = false;
          for(let i=0; i<6; i++) {
            if(neighborTypes[i] === 30 || neighborTypes[i] === 29 || neighborTypes[i] === 28) {
              hasOceanNeighbor = true;
            }
          }

          if(Math.random() < 0.2 && hasOceanNeighbor ) {
            this.biomeMap[row][col] = 30;
          }
        }

        // Create mountains
        if(Math.random() < 0.05) {
          this.biomeMap[row][col] = 24; // 24 ~ 27
        }
        const neighborTypes = this.getNeighbors(this.biomeMap, row, col);
        let hasMountainNeighbor = false;
        for(let i=0; i<6; i++) {
          if(neighborTypes[i] === 24 || neighborTypes[i] === 25 || neighborTypes[i] === 26 || neighborTypes[i] === 27) {
            hasMountainNeighbor = true;
          }
        }
        if(Math.random() < 0.15 && hasMountainNeighbor) {
          this.biomeMap[row][col] = 24;
        }

        // Create swamp
        if(this.biomeMap[row][col] === 12) {
          this.biomeMap[row][col] = 20;
        }
      }
    }
  }

  getNeighbors(map, row, col) {
    const neighbors = [-1, -1, -1, -1, -1, -1];

    if(map[row-1] && map[row-1][col]) {
      neighbors[0] = map[row-1][col];
    }
    if(map[row] && map[row][col+1]) {
      neighbors[1] = map[row][col+1];
    }
    if(map[row+1] && map[row+1][col]) {
      neighbors[2] = map[row+1][col];
    }
    if(map[row+1] && map[row+1][col-1]) {
      neighbors[3] = map[row+1][col-1];
    }
    if(map[row] &&  map[row][col-1]) {
      neighbors[4] = map[row][col-1];
    }
    if(map[row-1] && map[row-1][col-1]) {
      neighbors[5] = map[row-1][col-1];
    }

    return neighbors;
  }

	
	/**
     * Generate a 2d array of map
     * 
     * @param {*} x number of columns
     * @param {*} y number of rows
     * @param {*} type type of map
     */
	generateMap() {
    let count = 0;

    for(let row=0; row<this.size; row++) {
      for(let col=0; col<this.size; col++) {
        this.createTile(count, row, col, this.biomeMap[row][col]);

        count++;
      }
    }
	}

	/**
     * Generate all the tiles from pre-defined map json
     */
	generateTiles() {
		let count = 0;

		for(let row=0; row<this.tileMap.length; row++) {
			for(let col=0; col<this.tileMap[row].length; col++) {
				let cube = evenrToCube(row, col);
				let pixel = cubeToPixel(cube.x, cube.z, TileSize.REGULAR);

				this.world
					.createEntity()
					.addComponent(GameObject, {value: GameObjectType.TILE})
					.addComponent(MapPosition, {x: cube.x, y: cube.y, z: cube.z})
					.addComponent(CanvasPosition, {x: pixel.x, y: pixel.y}) 
					.addComponent(Hoverable, {shape: Shape.HEXAGON})
					.addComponent(Selectable, {shape: Shape.HEXAGON})
					.addComponent(Tile, {
						id: count,
						base: this.tileMap[row][col][0],
						type: this.tileMap[row][col][1],
						variation: this.tileMap[row][col][2]
					})
					.addComponent(Region);

				count++;
			}
		}
	}

  /**
   * 
   */
  createTile(id, row, col, type) {
    let cube = evenrToCube(row, col);
    let pixel = cubeToPixel(cube.x, cube.z, TileSize.REGULAR);
    let variation = type === 30 ? 0 : Math.floor(Math.random() * 10);

    this.world
      .createEntity()
      .addComponent(GameObject, {value: GameObjectType.TILE})
      .addComponent(MapPosition, {x: cube.x, y: cube.y, z: cube.z})
      .addComponent(CanvasPosition, {x: pixel.x, y: pixel.y}) 
      .addComponent(Hoverable, {shape: Shape.HEXAGON})
      .addComponent(Selectable, {shape: Shape.HEXAGON})
      .addComponent(Tile, {
        id: id,
        base: 0,
        type: type,
        variation: variation
      })
      .addComponent(Region);
  }
}