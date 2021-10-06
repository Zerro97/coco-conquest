import { Tile } from '../Component';

/**
 * Used for registering tile entity to the world
 * Uses map (2d array) as input to register tiles
 */
export class TileGenerator {
	constructor(world, map = []) {
		this.world = world;
		this.map = map;
	}

	registerMap(map) {
		if(map.isArray && map[0].isArray) {
			this.map = map;
		} else {
			console.error('Map has to be 2d array');
		}
	}

	/**
     * Generate all the tiles 
     */
	generateTiles() {
		for(let row=0; row<this.map.length; row++) {
			for(let col=0; col<this.map[0].length; col++) {
				this.world
					.createEntity()
					.addComponent(Tile, {
						type: 'plain', // map[row][col]
						variation: 0,
						status: 'seen',
						x: col,
						y: row,
						size: 50
					});
			}
		}
	}     
}