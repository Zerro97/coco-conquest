import { Tile } from '../Component';

export class MapGenerator {
	constructor(world) {
		this.world = world;
		this.map = [];
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

	registerMap() {
		for(let row=0; row<this.map.length; row++) {
			for(let col=0; col<this.map[0].length; col++) {
				this.world
					.createEntity()
					.addComponent(Tile, {
						type: this.map[row][col],
						variation: 0,
						status: 'seen',
						x: col,
						y: row,
						size: 50
					});
			}
		}
	}
    
	outputFile() {

	}
}