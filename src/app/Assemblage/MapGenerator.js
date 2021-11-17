import { Tile, MapPosition, GameObject, Hoverable, Selectable, CanvasPosition, Region, TileMap } from "../Component";
import { cubeToPixel, evenrToCube } from "../Util";
import { GameObjectType, Shape, TileSize } from "../Type";

export class MapGenerator {
	constructor(world) {
		this.world = world;
		this.map = [];
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

	
	/**
     * Generate a 2d array of map
     * 
     * @param {*} x number of columns
     * @param {*} y number of rows
     * @param {*} type type of map
     */
	generateMap(x, y, type) {
        
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
}