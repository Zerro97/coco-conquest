import { Tile, Unit, Health, Damage, Sight, Range, Speed, MapPosition } from '../Component';

export class MapGenerator {
	constructor(world) {
		this.world = world;
		this.tileMap = [];
		this.unitMap = [];
		this.buildingMap = [];
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
	 * 
	 * @param {Array} map 2d array
	 */
	registerTileMap(map) {
		if(Array.isArray(map) && Array.isArray(map[0])) {
			this.tileMap = map;
		} else {
			console.error('Map has to be 2d array');
		}
	}

	registerUnitMap(map) {
		if(Array.isArray(map) && Array.isArray(map[0])) {
			this.unitMap = map;
		} else {
			console.error('Map has to be 2d array');
		}
	}

	registerBuildingMap(map) {
		if(Array.isArray(map) && Array.isArray(map[0])) {
			this.buildingMap = map;
		} else {
			console.error('Map has to be 2d array');
		}
	}

	/**
     * Generate all the tiles 
     */
	generateTiles() {
		for(let row=0; row<this.tileMap.length; row++) {
			for(let col=0; col<this.tileMap[0].length; col++) {
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

	/**
	 * Generate all the units
	 */
	generateUnits() {
		for(let row=0; row<this.unitMap.length; row++) {
			for(let col=0; col<this.unitMap[0].length; col++) {
				if(this.unitMap[row][col] !== -1) {
					this.world
						.createEntity()
						.addComponent(Unit, {value: this.unitMap[row][col]})
						.addComponent(MapPosition, {x: col, y: row})
						.addComponent(Health)
						.addComponent(Damage)
						.addComponent(Sight)
						.addComponent(Range)
						.addComponent(Speed);
				}
			}
		}
	}

	generateBuildings() {
		for(let row=0; row<this.unitMap.length; row++) {
			for(let col=0; col<this.unitMap[0].length; col++) {
				if(this.unitMap[row][col] !== -1) {
					console.log('in');
				}
			}
		}
	}
}